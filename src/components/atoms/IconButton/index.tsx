import ButtonBase from '@/components/atoms/ButtonBase'
import { type PressableProps } from '@/components/atoms/Pressable'
import { iconButtonVariants, type IconButtonVariant } from '@/constants/theme'
import { useTheme } from '@/hooks/use-theme'
import { memo } from 'react'
import { StyleSheet } from 'react-native'

type Shape = 'circle' | 'rounded'

interface IconButtonProps extends Omit<PressableProps, 'children'> {
  icon: React.ReactNode
  accessibilityLabel: string
  variant?: IconButtonVariant
  shape?: Shape
  size?: number
  loading?: boolean
}

const IconButton = memo(
  ({
    icon,
    accessibilityLabel,
    variant = 'ghost',
    shape = 'circle',
    size = 40,
    style,
    ...rest
  }: IconButtonProps) => {
    const theme = useTheme()
    return (
      <ButtonBase
        accessibilityLabel={accessibilityLabel}
        hitSlop={8}
        style={[
          styles.base,
          iconButtonVariants(theme)[variant].container,
          { width: size, height: size, borderRadius: shape === 'circle' ? size / 2 : 8 },
          typeof style !== 'function' ? style : undefined,
        ]}
        {...rest}
      >
        {icon}
      </ButtonBase>
    )
  },
)

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
})

export default IconButton
export type { IconButtonProps }
