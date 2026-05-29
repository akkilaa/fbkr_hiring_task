import Pressable, { type PressableProps } from '@/components/atoms/Pressable'
import { memo } from 'react'

type ButtonBaseProps = PressableProps & { loading?: boolean }

const ButtonBase = memo(({ disabled, loading, style, children, ...rest }: ButtonBaseProps) => {
  const isDisabled = disabled || loading
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      disableDim={isDisabled}
      style={[{ opacity: isDisabled ? 0.5 : 1 }, typeof style !== 'function' ? style : undefined]}
      {...rest}
    >
      {children}
    </Pressable>
  )
})

export default ButtonBase
export type { ButtonBaseProps }
