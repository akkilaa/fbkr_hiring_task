import Typography from '@/components/atoms/Typography'
import { useTheme } from '@/hooks/use-theme'
import { forwardRef, useId } from 'react'
import { StyleSheet, TextInput, type TextInputProps, View } from 'react-native'

interface InputProps extends TextInputProps {
  label?: string
  info?: string
  error?: string
  leftSlot?: React.ReactNode
  rightSlot?: React.ReactNode
  InputComponent?: React.ElementType
}

const Input = forwardRef<TextInput, InputProps>(
  (
    { label, info, error, leftSlot, rightSlot, style, InputComponent = TextInput, ...rest },
    ref,
  ) => {
    const theme = useTheme()
    const labelId = useId()
    const hasError = !!error

    return (
      <View style={styles.wrapper}>
        {label && (
          <Typography
            nativeID={labelId}
            variant="label"
            style={[styles.label, { color: theme.textSecondary }]}
          >
            {label}
          </Typography>
        )}
        <View
          style={[
            styles.row,
            {
              backgroundColor: 'transparent',
              borderColor: hasError ? theme.danger : theme.backgroundSelected,
            },
          ]}
        >
          {leftSlot != null && <View style={styles.slot}>{leftSlot}</View>}
          <InputComponent
            ref={ref}
            accessibilityLabelledBy={label ? labelId : undefined}
            accessibilityLabel={label}
            style={[
              styles.input,
              { color: theme.text },
              typeof style !== 'function' ? style : undefined,
            ]}
            placeholderTextColor={theme.textSecondary}
            {...rest}
          />
          {rightSlot != null && <View style={styles.slot}>{rightSlot}</View>}
        </View>
        {(error || info) && (
          <Typography
            variant="caption"
            style={[styles.helper, { color: hasError ? theme.danger : theme.textSecondary }]}
          >
            {error ?? info}
          </Typography>
        )}
      </View>
    )
  },
)

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    marginLeft: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1.5,
    paddingHorizontal: 12,
    minHeight: 48,
  },
  slot: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 4,
    fontSize: 15,
    lineHeight: 22,
  },
  helper: {
    marginLeft: 2,
  },
})

export default Input
export type { InputProps }
