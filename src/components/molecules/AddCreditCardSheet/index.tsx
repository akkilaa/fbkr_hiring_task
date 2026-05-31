import { useSheetDismiss } from '@/bottom-sheet/SheetDismissContext'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import SheetHeader from '@/components/molecules/SheetHeader'
import { useTheme } from '@/hooks/use-theme'
import { detectCardBrand, useCreditCardStore } from '@/store/creditCardStore'
import { BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { useRef, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { creditCardSchema, formatCardNumber, formatExpiry, type FormErrors } from './utils'

const AddCreditCardSheet = () => {
  const { bottom } = useSafeAreaInsets()
  const theme = useTheme()
  const dismiss = useSheetDismiss()
  const addCard = useCreditCardStore((s) => s.addCard)

  const holderNameRef = useRef<TextInput>(null)
  const cardNumberRef = useRef<TextInput>(null)
  const expiryRef = useRef<TextInput>(null)
  const cvvRef = useRef<TextInput>(null)

  const [holderName, setHolderName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (): FormErrors => {
    const result = creditCardSchema.safeParse({ holderName, cardNumber, expiry, cvv })
    if (result.success) return {}
    return Object.fromEntries(
      result.error.issues.map((issue) => [issue.path[0], issue.message]),
    ) as FormErrors
  }

  const handleSave = () => {
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }
    const digits = cardNumber.replace(/\D/g, '')
    addCard({
      holderName: holderName.trim(),
      last4: digits.slice(-4),
      expiry,
      brand: detectCardBrand(digits),
    })
    dismiss()
  }

  return (
    <BottomSheetScrollView
      contentContainerStyle={[styles.content, { paddingBottom: Math.max(bottom, 16) + 16 }]}
      keyboardShouldPersistTaps="handled"
    >
      <SheetHeader title="Add credit card" />
      <View style={[styles.divider, { backgroundColor: theme.backgroundSelected }]} />

      <View style={styles.form}>
        <Input
          ref={holderNameRef}
          InputComponent={BottomSheetTextInput}
          label="Cardholder name"
          placeholder="John Smith"
          value={holderName}
          onChangeText={(t) => {
            setHolderName(t)
            if (errors.holderName) setErrors((e) => ({ ...e, holderName: undefined }))
          }}
          error={errors.holderName}
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => cardNumberRef.current?.focus()}
        />
        <Input
          ref={cardNumberRef}
          InputComponent={BottomSheetTextInput}
          label="Card number"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChangeText={(t) => {
            setCardNumber(formatCardNumber(t))
            if (errors.cardNumber) setErrors((e) => ({ ...e, cardNumber: undefined }))
          }}
          error={errors.cardNumber}
          keyboardType="number-pad"
          maxLength={19}
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => expiryRef.current?.focus()}
        />
        <View style={styles.row}>
          <View style={styles.flex}>
            <Input
              ref={expiryRef}
              InputComponent={BottomSheetTextInput}
              label="Expiry"
              placeholder="MM/YY"
              value={expiry}
              onChangeText={(t) => {
                setExpiry(formatExpiry(t, expiry))
                if (errors.expiry) setErrors((e) => ({ ...e, expiry: undefined }))
              }}
              error={errors.expiry}
              keyboardType="number-pad"
              maxLength={5}
              returnKeyType="next"
              submitBehavior="submit"
              onSubmitEditing={() => cvvRef.current?.focus()}
            />
          </View>
          <View style={styles.flex}>
            <Input
              ref={cvvRef}
              InputComponent={BottomSheetTextInput}
              label="CVV"
              placeholder="123"
              value={cvv}
              onChangeText={(t) => {
                setCvv(t.replace(/\D/g, '').slice(0, 4))
                if (errors.cvv) setErrors((e) => ({ ...e, cvv: undefined }))
              }}
              error={errors.cvv}
              keyboardType="number-pad"
              maxLength={4}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={handleSave}
            />
          </View>
        </View>
      </View>

      <Button label="Save card" onPress={handleSave} style={styles.saveButton} />
    </BottomSheetScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 12,
  },
  form: {
    gap: 14,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex: {
    flex: 1,
  },
  saveButton: {
    marginTop: 4,
  },
})

export default AddCreditCardSheet
