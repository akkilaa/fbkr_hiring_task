/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css'

import { Platform } from 'react-native'

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
    brand: '#2185c5',
    rating: '#F5A623',
    danger: '#D93025',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
    brand: '#2185c5',
    rating: '#F5A623',
    danger: '#FF6B6B',
  },
} as const

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
})

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0
export const MaxContentWidth = 800

export type ButtonSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs'

export const buttonSizes: Record<
  ButtonSize,
  {
    paddingVertical: number
    paddingHorizontal: number
    minHeight: number
    borderRadius: number
    typographyVariant: 'title3' | 'callout' | 'body' | 'label' | 'caption'
  }
> = {
  xl: {
    paddingVertical: 18,
    paddingHorizontal: 28,
    minHeight: 60,
    borderRadius: 12,
    typographyVariant: 'title3',
  },
  lg: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 54,
    borderRadius: 10,
    typographyVariant: 'callout',
  },
  md: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    minHeight: 48,
    borderRadius: 8,
    typographyVariant: 'callout',
  },
  sm: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    minHeight: 38,
    borderRadius: 6,
    typographyVariant: 'label',
  },
  xs: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    minHeight: 30,
    borderRadius: 4,
    typographyVariant: 'caption',
  },
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'

export type IconButtonVariant = 'filled' | 'outlined' | 'ghost'

export const iconButtonVariants = (theme: Record<ThemeColor, string>) =>
  ({
    filled: { container: { backgroundColor: '#ffffff' } },
    outlined: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: theme.backgroundSelected,
      },
    },
    ghost: { container: { backgroundColor: 'transparent' } },
  }) as const

export const buttonVariants = (theme: Record<ThemeColor, string>) =>
  ({
    primary: {
      container: { backgroundColor: theme.brand },
      label: '#ffffff',
      indicator: '#ffffff',
    },
    secondary: {
      container: { backgroundColor: theme.backgroundElement },
      label: theme.text,
      indicator: theme.brand,
    },
    outline: {
      container: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: theme.brand },
      label: theme.brand,
      indicator: theme.brand,
    },
    ghost: {
      container: { backgroundColor: 'transparent' },
      label: theme.brand,
      indicator: theme.brand,
    },
  }) as const

export const Typography = {
  size: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    '2xl': 28,
    '3xl': 34,
  },
  lineHeight: {
    xs: 16,
    sm: 18,
    base: 22,
    md: 24,
    lg: 28,
    xl: 32,
    '2xl': 36,
    '3xl': 42,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  variants: {
    caption: { fontSize: 11, lineHeight: 16, fontWeight: '400' as const },
    label: { fontSize: 13, lineHeight: 18, fontWeight: '500' as const },
    body: { fontSize: 15, lineHeight: 22, fontWeight: '400' as const },
    bodyMedium: { fontSize: 15, lineHeight: 22, fontWeight: '500' as const },
    callout: { fontSize: 17, lineHeight: 24, fontWeight: '400' as const },
    title3: { fontSize: 20, lineHeight: 28, fontWeight: '600' as const },
    title2: { fontSize: 24, lineHeight: 32, fontWeight: '600' as const },
    title1: { fontSize: 28, lineHeight: 36, fontWeight: '700' as const },
    largeTitle: { fontSize: 34, lineHeight: 42, fontWeight: '700' as const },
  },
} as const
