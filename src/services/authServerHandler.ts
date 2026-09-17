import { createClient, SupabaseClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// In-memory rate-limiter & concurrency guards for abuse protection
interface RateLimitEntry {
  count: number;
  resetAt: number;
}
const ipRateLimits = new Map<string, RateLimitEntry>();
const activeUsernamesInFlight = new Set<string>();

// Rate limit settings: max 10 signups per 60s window per IP
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_SIGNUPS_PER_WINDOW = 10;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRateLimits.get(ip);
  if (!entry || now > entry.resetAt) {
    ipRateLimits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_SIGNUPS_PER_WINDOW) {
    return false;
  }
  entry.count += 1;
  return true;
}

export function normalizeUsername(input: string): string {
  return (input || '').trim().toLowerCase();
}

export function isValidUsername(username: string): boolean {
  return /^[a-z0-9_]{3,24}$/.test(username);
}

export function getSyntheticEmail(username: string): string {
  return `${normalizeUsername(username)}@tia.local`;
}

export interface SignupRequestBody {
  fullName?: string;
  full_name?: string;
  name?: string;
  username?: string;
  password?: string;
}

export interface SignupResponseData {
  ok: boolean;
  user?: {
    id: string;
    full_name: string;
    name: string;
    username: string;
    created_at: string;
  };
  error?: string;
  mode?: 'supabase_admin' | 'server_managed';
}

interface StoredServerUser {
  id: string;
  fullName: string;
  username: string;
  passwordHash: string;
  createdAt: string;
}

// In-memory / server-persisted registry for unique usernames when service-role is not present
const serverUserRegistry = new Map<string, StoredServerUser>();

const REGISTRY_FILE = path.join(process.cwd(), '.server_users.json');

function loadRegistryFromFile() {
  try {
    if (fs.existsSync(REGISTRY_FILE)) {
      const data = JSON.parse(fs.readFileSync(REGISTRY_FILE, 'utf-8'));
      Object.entries(data).forEach(([key, val]) => {
        serverUserRegistry.set(key, val as StoredServerUser);
      });
    }
  } catch (err) {
    console.warn('[Auth Server] Warning reading user registry file:', err);
  }
}

function saveRegistryToFile() {
  try {
    const obj: Record<string, StoredServerUser> = {};
    serverUserRegistry.forEach((val, key) => {
      obj[key] = val;
    });
    fs.writeFileSync(REGISTRY_FILE, JSON.stringify(obj, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[Auth Server] Warning saving user registry file:', err);
  }
}

// Initialize registry
loadRegistryFromFile();

// Pre-seed demo user in server registry if not exists
if (!serverUserRegistry.has('anurag')) {
  serverUserRegistry.set('anurag', {
    id: 'demo-user-101',
    fullName: 'Anurag Sharma',
    username: 'anurag',
    passwordHash: Buffer.from('password123').toString('base64'),
    createdAt: new Date('2025-01-01').toISOString(),
  });
  saveRegistryToFile();
}

function getSupabaseAdminClient(): SupabaseClient | null {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

  if (supabaseUrl && serviceRoleKey) {
    try {
      return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });
    } catch (err) {
      console.error('[Auth Server] Failed to initialize Supabase Admin client:', err);
      return null;
    }
  }
  return null;
}

function getSupabasePublicClient(): SupabaseClient | null {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (supabaseUrl && anonKey) {
    try {
      return createClient(supabaseUrl, anonKey, {
        auth: {
          persistSession: false,
        },
      });
    } catch {
      return null;
    }
  }
  return null;
}

export async function processSignup(
  body: SignupRequestBody,
  clientIp = '127.0.0.1'
): Promise<{ status: number; data: SignupResponseData }> {
  // 1. Abuse & rate-limit check
  if (!checkRateLimit(clientIp)) {
    console.warn(`[Auth Server] Rate limit exceeded for IP: ${clientIp}`);
    return {
      status: 429,
      data: {
        ok: false,
        error: 'Abhi bahut attempts ho gaye hain 😅. Thodi der baad dobara try karo.',
      },
    };
  }

  const rawFullName = body.fullName || body.full_name || body.name;
  const rawUsername = body.username;
  const password = body.password;

  // 2. Validate Full Name
  if (!rawFullName || typeof rawFullName !== 'string' || rawFullName.trim().length < 2) {
    return {
      status: 400,
      data: {
        ok: false,
        error: 'Please enter your full name.',
      },
    };
  }
  const fullName = rawFullName.trim().slice(0, 80);

  // 3. Validate & Normalize Username
  if (!rawUsername || typeof rawUsername !== 'string') {
    return {
      status: 400,
      data: {
        ok: false,
        error: 'Username me sirf letters, numbers aur underscore use karo.',
      },
    };
  }
  const normalizedUsername = normalizeUsername(rawUsername);

  if (!isValidUsername(normalizedUsername)) {
    return {
      status: 400,
      data: {
        ok: false,
        error: 'Username me sirf letters, numbers aur underscore use karo.',
      },
    };
  }

  // 4. Validate Password
  if (!password || typeof password !== 'string' || password.length < 6) {
    return {
      status: 400,
      data: {
        ok: false,
        error: 'Password thoda strong rakho.',
      },
    };
  }

  // 5. Check in-flight concurrent submission
  if (activeUsernamesInFlight.has(normalizedUsername)) {
    return {
      status: 409,
      data: {
        ok: false,
        error: 'Ye username already taken hai.',
      },
    };
  }
  activeUsernamesInFlight.add(normalizedUsername);

  try {
    const syntheticEmail = getSyntheticEmail(normalizedUsername);
    const supabaseAdmin = getSupabaseAdminClient();
    const supabasePublic = getSupabasePublicClient();

    // 6. Check whether username already exists in profiles table
    const checkerClient = supabaseAdmin || supabasePublic;
    if (checkerClient) {
      try {
        const { data: existingProfile, error: profileErr } = await checkerClient
          .from('profiles')
          .select('id, username')
          .ilike('username', normalizedUsername)
          .maybeSingle();

        if (!profileErr && existingProfile) {
          console.log(`[Auth Server] Username '${normalizedUsername}' found in Supabase profiles`);
          return {
            status: 409,
            data: {
              ok: false,
              error: 'Ye username already taken hai.',
            },
          };
        }
      } catch (err) {
        console.warn('[Auth Server] Warning checking username uniqueness via Supabase:', err);
      }
    }

    // Also check server-side in-memory registry
    if (serverUserRegistry.has(normalizedUsername)) {
      console.log(`[Auth Server] Username '${normalizedUsername}' found in serverUserRegistry`);
      return {
        status: 409,
        data: {
          ok: false,
          error: 'Ye username already taken hai.',
        },
      };
    }

    const nowIso = new Date().toISOString();

    // 7. If Supabase Service-Role Admin is available, create the Supabase Auth user server-side
    if (supabaseAdmin) {
      console.log(`[Auth Server] Creating Supabase user via admin.createUser for '${normalizedUsername}'`);
      const { data: createdAuth, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: syntheticEmail,
        password: password,
        email_confirm: true, // Crucial: email confirmation is completely disabled/bypassed!
        user_metadata: {
          name: fullName,
          full_name: fullName,
          username: normalizedUsername,
        },
      });

      if (createError) {
        console.error('[Auth Server] admin.createUser error:', createError.message);
        const errMsg = createError.message.toLowerCase();
        if (
          errMsg.includes('already') ||
          errMsg.includes('exists') ||
          errMsg.includes('registered') ||
          (createError as any).status === 422
        ) {
          return {
            status: 409,
            data: {
              ok: false,
              error: 'Ye username already taken hai.',
            },
          };
        }
        if (errMsg.includes('password') || errMsg.includes('weak') || errMsg.includes('short')) {
          return {
            status: 400,
            data: {
              ok: false,
              error: 'Password thoda strong rakho.',
            },
          };
        }
        return {
          status: 500,
          data: {
            ok: false,
            error: 'Oops, kuch technical problem aa gayi. Dobara try karo.',
          },
        };
      }

      const userId = createdAuth.user.id;

      // 8. Save profile in Supabase profiles table
      try {
        await supabaseAdmin.from('profiles').upsert({
          id: userId,
          full_name: fullName,
          name: fullName,
          username: normalizedUsername,
          email: syntheticEmail,
          created_at: nowIso,
        });
      } catch (upsertErr) {
        console.warn('[Auth Server] Profile upsert warning (non-fatal):', upsertErr);
      }

      // Keep server cache updated as well
      serverUserRegistry.set(normalizedUsername, {
        id: userId,
        fullName,
        username: normalizedUsername,
        passwordHash: Buffer.from(password).toString('base64'),
        createdAt: nowIso,
      });
      saveRegistryToFile();

      // 9. Return safe response (no password, no service-role secrets)
      return {
        status: 200,
        data: {
          ok: true,
          mode: 'supabase_admin',
          user: {
            id: userId,
            full_name: fullName,
            name: fullName,
            username: normalizedUsername,
            created_at: nowIso,
          },
        },
      };
    }

    // Resilient server-side account creation when SUPABASE_SERVICE_ROLE_KEY is not yet in env
    console.log(`[Auth Server] SUPABASE_SERVICE_ROLE_KEY not configured. Creating server-managed account for '${normalizedUsername}'`);
    const generatedUserId = 'usr_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);

    serverUserRegistry.set(normalizedUsername, {
      id: generatedUserId,
      fullName,
      username: normalizedUsername,
      passwordHash: Buffer.from(password).toString('base64'),
      createdAt: nowIso,
    });
    saveRegistryToFile();

    // If public client is available, try inserting into profiles table if permissions allow
    if (supabasePublic) {
      try {
        await supabasePublic.from('profiles').upsert({
          id: generatedUserId,
          full_name: fullName,
          name: fullName,
          username: normalizedUsername,
          email: syntheticEmail,
          created_at: nowIso,
        });
      } catch {
        // Ignored in resilient fallback mode
      }
    }

    return {
      status: 200,
      data: {
        ok: true,
        mode: 'server_managed',
        user: {
          id: generatedUserId,
          full_name: fullName,
          name: fullName,
          username: normalizedUsername,
          created_at: nowIso,
        },
      },
    };
  } finally {
    activeUsernamesInFlight.delete(normalizedUsername);
  }
}
