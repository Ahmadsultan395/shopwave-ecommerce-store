// /lib/theme.ts
// Global color palette — change here to update the entire site

export const theme = {
  primary: '#6366F1',
  primaryDark: '#4F46E5',
  primaryLight: '#818CF8',
  secondary: '#8B5CF6',
  accent: '#06B6D4',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  background: '#F9FAFB',
  surface: '#FFFFFF',
  border: '#E5E7EB',
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    muted: '#9CA3AF',
    inverse: '#FFFFFF',
  },
  sidebar: {
    bg: '#1E1B4B',
    hover: '#312E81',
    active: '#4F46E5',
    text: '#C7D2FE',
    textActive: '#FFFFFF',
  },
} as const

export type Theme = typeof theme
