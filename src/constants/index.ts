import { PlatformDetails } from '../types';
import { Instagram, Twitter, Linkedin, Facebook, Youtube } from 'lucide-react';

export const PLATFORMS: Record<string, PlatformDetails> = {
  Instagram: {
    name: 'Instagram',
    icon: 'instagram',
    color: '#E1306C',
    maxLength: 2200,
    description: 'Visual platform for photos and short videos'
  },
  Twitter: {
    name: 'Twitter',
    icon: 'twitter',
    color: '#1DA1F2',
    maxLength: 280,
    description: 'Short-form text platform for quick updates'
  },
  LinkedIn: {
    name: 'LinkedIn',
    icon: 'linkedin',
    color: '#0077B5',
    maxLength: 3000,
    description: 'Professional networking platform'
  },
  Facebook: {
    name: 'Facebook',
    icon: 'facebook',
    color: '#1877F2',
    maxLength: 63206,
    description: 'Social networking platform for friends and family'
  },
  YouTube: {
    name: 'YouTube',
    icon: 'youtube',
    color: '#FF0000',
    maxLength: 5000,
    description: 'Video sharing platform'
  }
};

export const PLATFORM_ICONS = {
  Instagram,
  Twitter,
  LinkedIn: Linkedin,
  Facebook,
  YouTube: Youtube
};

export const DEFAULT_PLATFORM = 'Instagram';

export const LOADING_DELAY = 1000; // 1 second delay for loading state