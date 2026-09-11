import React, { useState } from 'react';
import { X, Copy, Check, Database, Shield, Key, Terminal } from 'lucide-react';
import { SUPABASE_SCHEMA_SQL } from '../../lib/schemaSql';
import { isSupabaseConfigured } from '../../lib/supabase';

interface SchemaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SchemaModal: React.FC<SchemaModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(SUPABASE_SCHEMA_SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-[32px] border border-black/5 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-black/5 flex items-center justify-between bg-[#FDFCFB]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#E6F4EA] text-emerald-800 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-serif italic text-[#1A1A1A]">
                Supabase Schema & Security Setup
              </h2>
              <p className="text-[11px] text-gray-500 font-light">
                PostgreSQL tables, Row Level Security (RLS) policies, & indices
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-gray-500 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-gray-600 flex-1">
          {/* Status Alert */}
          <div
            className={`p-4 rounded-2xl border flex items-start gap-3 ${
              isSupabaseConfigured
                ? 'bg-[#E6F4EA] border-emerald-200 text-emerald-950'
                : 'bg-[#F5F5F0] border-black/5 text-[#1A1A1A]'
            }`}
          >
            <Shield className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">
                {isSupabaseConfigured
                  ? 'Supabase Connection Active'
                  : 'Plug-and-Play Supabase Backend Ready'}
              </span>
              <p className="text-[11px] mt-0.5 leading-relaxed font-light">
                {isSupabaseConfigured
                  ? 'The app is actively reading and writing to your Supabase PostgreSQL instance.'
                  : 'To link your personal Supabase project, simply add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.'}
              </p>
            </div>
          </div>

          {/* Quick Setup Instructions */}
          <div className="space-y-2">
            <h3 className="font-bold text-[#1A1A1A] text-[10px] uppercase tracking-widest flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" /> Quick Supabase Steps:
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-xs text-gray-600 font-light">
              <li>Open your Supabase Dashboard → <strong>SQL Editor</strong>.</li>
              <li>Click <strong>New Query</strong> and paste the schema below.</li>
              <li>Click <strong>Run</strong> — all 7 tables, relations, and RLS policies are created.</li>
              <li>Enable Email Auth in <strong>Authentication → Providers</strong>.</li>
            </ol>
          </div>

          {/* Code Box with Copy */}
          <div className="relative rounded-2xl bg-[#1A1A1A] text-gray-200 p-4 font-mono text-[11px] overflow-x-auto max-h-72 border border-black/10">
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-sans text-xs flex items-center gap-1 transition-all border border-white/10"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied SQL</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy SQL</span>
                </>
              )}
            </button>
            <pre className="whitespace-pre">{SUPABASE_SCHEMA_SQL}</pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-black/5 bg-[#FDFCFB] flex items-center justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-6 rounded-full font-bold text-xs uppercase tracking-widest bg-[#1A1A1A] hover:bg-black text-white transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
