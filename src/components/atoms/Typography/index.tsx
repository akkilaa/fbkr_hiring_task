import { Typography as TypographyConfig } from '@/constants/theme'
import { memo } from 'react'
import { Text, type TextProps } from 'react-native'

type Variant = keyof typeof TypographyConfig.variants

interface TypographyProps extends TextProps {
  variant?: Variant
}

const Typography = memo(({ variant = 'body', style, ...props }: TypographyProps) => (
  <Text style={[TypographyConfig.variants[variant], style]} {...props} />
))

export default Typography
