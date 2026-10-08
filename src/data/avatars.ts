// Premium Indian Avatar Collection for Matters
import male1 from '../assets/images/avatar_indian_male_1_1791439051399.jpg';
import male2 from '../assets/images/avatar_indian_male_2_1791439074089.jpg';
import male3 from '../assets/images/avatar_indian_male_3_1791439085548.jpg';
import male4 from '../assets/images/avatar_indian_male_4_1791439095926.jpg';
import male5 from '../assets/images/avatar_indian_male_5_1791439107700.jpg';
import male6 from '../assets/images/avatar_indian_male_6_1791439118450.jpg';
import male7 from '../assets/images/avatar_indian_male_7_1791439130844.jpg';
import male8 from '../assets/images/avatar_indian_male_8_1791439141004.jpg';

import female1 from '../assets/images/avatar_indian_female_1_1791439152574.jpg';
import female2 from '../assets/images/avatar_indian_female_2_1791439162877.jpg';
import female3 from '../assets/images/avatar_indian_female_3_1791439173763.jpg';
import female4 from '../assets/images/avatar_indian_female_4_1791439183740.jpg';
import female5 from '../assets/images/avatar_indian_female_5_1791439194390.jpg';
import female6 from '../assets/images/avatar_indian_female_6_1791439205218.jpg';
import female7 from '../assets/images/avatar_indian_female_7_1791439217823.jpg';
import female8 from '../assets/images/avatar_indian_female_8_1791439229228.jpg';

export interface AvatarOption {
  id: string;
  gender: 'male' | 'female';
  name: string;
  image: string;
}

export const INDIAN_MALE_AVATARS: AvatarOption[] = [
  { id: 'in-male-1', gender: 'male', name: 'Arjun', image: male1 },
  { id: 'in-male-2', gender: 'male', name: 'Kabir', image: male2 },
  { id: 'in-male-3', gender: 'male', name: 'Rohan', image: male3 },
  { id: 'in-male-4', gender: 'male', name: 'Dev', image: male4 },
  { id: 'in-male-5', gender: 'male', name: 'Vikram', image: male5 },
  { id: 'in-male-6', gender: 'male', name: 'Aarav', image: male6 },
  { id: 'in-male-7', gender: 'male', name: 'Aditya', image: male7 },
  { id: 'in-male-8', gender: 'male', name: 'Sameer', image: male8 },
];

export const INDIAN_FEMALE_AVATARS: AvatarOption[] = [
  { id: 'in-female-1', gender: 'female', name: 'Ananya', image: female1 },
  { id: 'in-female-2', gender: 'female', name: 'Rhea', image: female2 },
  { id: 'in-female-3', gender: 'female', name: 'Diya', image: female3 },
  { id: 'in-female-4', gender: 'female', name: 'Meera', image: female4 },
  { id: 'in-female-5', gender: 'female', name: 'Tara', image: female5 },
  { id: 'in-female-6', gender: 'female', name: 'Neha', image: female6 },
  { id: 'in-female-7', gender: 'female', name: 'Pooja', image: female7 },
  { id: 'in-female-8', gender: 'female', name: 'Kavya', image: female8 },
];

export const ALL_AVATARS = [...INDIAN_MALE_AVATARS, ...INDIAN_FEMALE_AVATARS];

export const USER_AVATAR_STORAGE_KEY = 'matters_user_avatar_v1';

export function getStoredUserAvatar(): string | null {
  try {
    return localStorage.getItem(USER_AVATAR_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredUserAvatar(avatarUrl: string): void {
  try {
    localStorage.setItem(USER_AVATAR_STORAGE_KEY, avatarUrl);
  } catch (err) {
    console.error('Failed to save avatar to localStorage:', err);
  }
}
