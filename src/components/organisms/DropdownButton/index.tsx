import ButtonBase from '@/components/atoms/ButtonBase'
import { type PressableProps } from '@/components/atoms/Pressable'
import Icon from '@/components/atoms/Icon'
import Typography from '@/components/atoms/Typography'
import { useTheme } from '@/hooks/use-theme'
import { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import ChevronDownIcon from '@/assets/icons/chevron-down.svg'

interface DropdownButtonProps extends Omit<PressableProps, 'children'> {
  label: string
  value: string
  leftIcon?: React.ReactNode
}

const DropdownButton = memo(({ label, value, leftIcon, style, ...rest }: DropdownButtonProps) => {
  const theme = useTheme()

  return (
    <ButtonBase
      style={[
        styles.base,
        { backgroundColor: theme.background, borderColor: theme.backgroundSelected },
        typeof style !== 'function' ? style : undefined,
      ]}
      {...rest}
    >
      <View style={styles.left}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <View style={styles.textContainer}>
          <Typography variant="caption" style={{ color: theme.textSecondary }}>
            {label}
          </Typography>
          <Typography variant="bodyMedium" style={{ color: theme.text }}>
            {value}
          </Typography>
        </View>
      </View>
      <Icon icon={ChevronDownIcon} size={18} color={theme.textSecondary} />
    </ButtonBase>
  )
})

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    minHeight: 56,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  leftIcon: {
    opacity: 0.6,
  },
  textContainer: {
    gap: 2,
  },
})

export default DropdownButton
export type { DropdownButtonProps }
