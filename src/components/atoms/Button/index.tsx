import ButtonBase from '@/components/atoms/ButtonBase'
import { type PressableProps } from '@/components/atoms/Pressable'
import Typography from '@/components/atoms/Typography'
import { buttonVariants, type ButtonVariant } from '@/constants/theme'
import { useTheme } from '@/hooks/use-theme'
import { memo } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'

interface ButtonProps extends Omit<PressableProps, 'children'> {
  label: string
  variant?: ButtonVariant
  loading?: boolean
}

const Button = memo(({ label, variant = 'primary', loading, style, ...rest }: ButtonProps) => {
  const theme = useTheme()
  const { container, label: labelColor, indicator: indicatorColor } = buttonVariants(theme)[variant]

  return (
    <ButtonBase
      loading={loading}
      style={[styles.base, container, typeof style !== 'function' ? style : undefined]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={indicatorColor} />
      ) : (
        <Typography variant="callout" style={{ color: labelColor, fontWeight: '600' }}>
          {label}
        </Typography>
      )}
    </ButtonBase>
  )
})

const styles = StyleSheet.create({
  base: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    minHeight: 48,
  },
})

export default Button
export type { ButtonProps }
export { ButtonVariant }
