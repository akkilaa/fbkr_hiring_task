import Typography from '@/components/atoms/Typography'
import { useTheme } from '@/hooks/use-theme'
import { forwardRef, useRef } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

interface PhoneInputProps {
  label?: string
  error?: string
  defaultValue?: string
  onChangeText?: (value: string) => void
  onSubmitEditing?: () => void
}

function parseStoredPhone(value: string): { countryCode: string; number: string } {
  if (!value) return { countryCode: '', number: '' }
  const stripped = value.startsWith('+') ? value.slice(1) : value
  const spaceIdx = stripped.indexOf(' ')
  if (spaceIdx === -1) return { countryCode: stripped, number: '' }
  return { countryCode: stripped.slice(0, spaceIdx), number: stripped.slice(spaceIdx + 1) }
}

const PhoneInput = forwardRef<TextInput, PhoneInputProps>(
  ({ label, error, defaultValue, onChangeText, onSubmitEditing }, ref) => {
    const theme = useTheme()
    const phoneRef = useRef<TextInput>(null)
    const parsed = parseStoredPhone(defaultValue ?? '')
    const countryCode = useRef(parsed.countryCode)
    const phoneNumber = useRef(parsed.number)
    const hasError = !!error

    const emit = () => {
      const full = `+${countryCode.current} ${phoneNumber.current}`.trim()
      onChangeText?.(full)
    }

    return (
      <View style={styles.wrapper}>
        {label && (
          <Typography variant="label" style={[styles.label, { color: theme.textSecondary }]}>
            {label}
          </Typography>
        )}
        <View
          style={[styles.row, { borderColor: hasError ? theme.danger : theme.backgroundSelected }]}
        >
          <Typography style={[styles.plus, { color: theme.text }]}>+</Typography>
          <TextInput
            ref={ref}
            style={[styles.countryCode, { color: theme.text }]}
            placeholder="1"
            placeholderTextColor={theme.textSecondary}
            keyboardType="number-pad"
            maxLength={3}
            returnKeyType="next"
            submitBehavior="submit"
            defaultValue={parsed.countryCode}
            onChangeText={(text) => {
              countryCode.current = text
              emit()
              if (text.length === 3) phoneRef.current?.focus()
            }}
            onSubmitEditing={() => phoneRef.current?.focus()}
          />
          <View style={[styles.separator, { backgroundColor: theme.backgroundSelected }]} />
          <TextInput
            ref={phoneRef}
            style={[styles.phone, { color: theme.text }]}
            placeholder="234 567 8900"
            placeholderTextColor={theme.textSecondary}
            keyboardType="phone-pad"
            autoComplete="tel"
            textContentType="telephoneNumber"
            returnKeyType="done"
            defaultValue={parsed.number}
            onChangeText={(text) => {
              phoneNumber.current = text
              emit()
            }}
            onSubmitEditing={onSubmitEditing}
          />
        </View>
        {error && (
          <Typography variant="caption" style={[styles.helper, { color: theme.danger }]}>
            {error}
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
  plus: {
    fontSize: 15,
    lineHeight: 22,
  },
  countryCode: {
    width: 44,
    paddingVertical: 12,
    paddingHorizontal: 4,
    fontSize: 15,
    lineHeight: 22,
  },
  separator: {
    width: 1,
    alignSelf: 'stretch',
    marginVertical: 8,
    marginHorizontal: 8,
  },
  phone: {
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

export default PhoneInput
