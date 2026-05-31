import ButtonBase from '@/components/atoms/ButtonBase'
import { type PressableProps } from '@/components/atoms/Pressable'
import Typography from '@/components/atoms/Typography'
import { buttonSizes, buttonVariants, type ButtonSize, type ButtonVariant } from '@/constants/theme'
import { useTheme } from '@/hooks/use-theme'
import { memo, useCallback, useRef } from 'react'
import type { GestureResponderEvent } from 'react-native'
import { ActivityIndicator } from 'react-native'

interface ButtonProps extends Omit<PressableProps, 'children'> {
  label: string
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

const Button = memo(
  ({ label, variant = 'primary', size = 'md', loading, style, onPress, ...rest }: ButtonProps) => {
    const pressLockRef = useRef(false)
    const theme = useTheme()
    const {
      container,
      label: labelColor,
      indicator: indicatorColor,
    } = buttonVariants(theme)[variant]
    const { paddingVertical, paddingHorizontal, minHeight, borderRadius, typographyVariant } =
      buttonSizes[size]

    const handlePress = useCallback(
      (event: GestureResponderEvent) => {
        if (pressLockRef.current || loading) {
          return
        }

        pressLockRef.current = true
        onPress?.(event)

        // Prevent accidental rapid double taps from firing actions twice.
        setTimeout(() => {
          pressLockRef.current = false
        }, 500)
      },
      [loading, onPress],
    )

    return (
      <ButtonBase
        loading={loading}
        onPress={handlePress}
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
export { ButtonSize, ButtonVariant }
export type { ButtonProps }
