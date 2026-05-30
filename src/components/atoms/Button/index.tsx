import ButtonBase from '@/components/atoms/ButtonBase'
import { type PressableProps } from '@/components/atoms/Pressable'
import Typography from '@/components/atoms/Typography'
import { buttonSizes, buttonVariants, type ButtonSize, type ButtonVariant } from '@/constants/theme'
import { useTheme } from '@/hooks/use-theme'
import { memo } from 'react'
import { ActivityIndicator } from 'react-native'

interface ButtonProps extends Omit<PressableProps, 'children'> {
  label: string
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

const Button = memo(
  ({ label, variant = 'primary', size = 'md', loading, style, ...rest }: ButtonProps) => {
    const theme = useTheme()
    const {
      container,
      label: labelColor,
      indicator: indicatorColor,
    } = buttonVariants(theme)[variant]
    const { paddingVertical, paddingHorizontal, minHeight, borderRadius, typographyVariant } =
      buttonSizes[size]

    return (
      <ButtonBase
        loading={loading}
        style={[
          {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical,
            paddingHorizontal,
            borderRadius,
            minHeight,
          },
          container,
          typeof style !== 'function' ? style : undefined,
        ]}
        {...rest}
      >
        {loading ? (
          <ActivityIndicator color={indicatorColor} />
        ) : (
          <Typography variant={typographyVariant} style={{ color: labelColor, fontWeight: '600' }}>
            {label}
          </Typography>
        )}
      </ButtonBase>
    )
  },
)

export default Button
export type { ButtonProps }
export { ButtonVariant, ButtonSize }
