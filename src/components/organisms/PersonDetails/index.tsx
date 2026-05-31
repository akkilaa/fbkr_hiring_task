import Input from '@/components/atoms/Input'
import PhoneInput from '@/components/atoms/PhoneInput'
import Typography from '@/components/atoms/Typography'
import { useCheckoutScroll } from '@/context/CheckoutScrollContext'
import { useTheme } from '@/hooks/use-theme'
import { usePersonDetailsStore } from '@/store/personDetailsStore'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { z } from 'zod'

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.email('Invalid email address'),
  phone: z.string().min(7, 'Phone number is required'),
})

type FormErrors = Partial<Record<keyof z.infer<typeof schema>, string>>
type FieldName = keyof z.infer<typeof schema>

const FIELD_ORDER: FieldName[] = ['firstName', 'lastName', 'email', 'phone']

export interface PersonDetailsHandle {
  submit: () => void
}

interface PersonDetailsProps {
  onSubmit: () => void
}

const PersonDetails = forwardRef<PersonDetailsHandle, PersonDetailsProps>(({ onSubmit }, ref) => {
  const theme = useTheme()
  const { assureFocusedInputVisible } = useCheckoutScroll()
  const setPersonDetails = usePersonDetailsStore((s) => s.setPersonDetails)
  const resetPersonDetails = usePersonDetailsStore((s) => s.reset)

  const firstNameRef = useRef<TextInput>(null)
  const lastNameRef = useRef<TextInput>(null)
  const emailRef = useRef<TextInput>(null)
  const phoneRef = useRef<TextInput>(null)

  const fieldRefs = {
    firstName: firstNameRef,
    lastName: lastNameRef,
    email: emailRef,
    phone: phoneRef,
  }

  const values = useRef({ firstName: '', lastName: '', email: '', phone: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const debounceTimers = useRef<Partial<Record<FieldName, ReturnType<typeof setTimeout>>>>({})

  const handleChange = (field: FieldName, text: string) => {
    values.current[field] = text
    clearTimeout(debounceTimers.current[field])
    debounceTimers.current[field] = setTimeout(() => {
      const result = schema.safeParse(values.current)
      if (result.success) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
        setPersonDetails(result.data)
      } else {
        const allErrors: FormErrors = {}
        for (const issue of result.error.issues) {
          const f = issue.path[0] as FieldName
          if (!allErrors[f]) allErrors[f] = issue.message
        }
        setErrors((prev) => ({ ...prev, [field]: allErrors[field] }))
        resetPersonDetails()
      }
    }, 500)
  }

  const handleSubmit = () => {
    for (const timer of Object.values(debounceTimers.current)) clearTimeout(timer)

    const result = schema.safeParse(values.current)
    if (!result.success) {
      const fieldErrors: FormErrors = {}
      for (const issue of result.error.issues) {
        const f = issue.path[0] as FieldName
        if (!fieldErrors[f]) fieldErrors[f] = issue.message
      }
      const firstInvalid = FIELD_ORDER.find((f) => fieldErrors[f])
      if (firstInvalid) fieldRefs[firstInvalid].current?.focus()
      return
    }
    setErrors({})
    setPersonDetails(result.data)
    onSubmit()
  }

  useImperativeHandle(ref, () => ({ submit: handleSubmit }))

  return (
    <View style={styles.container}>
      <Typography variant="title2" style={{ color: theme.text }}>
        Your details
      </Typography>
      <View style={styles.form}>
        <Input
          ref={firstNameRef}
          label="First name"
          placeholder="John"
          autoCapitalize="words"
          autoComplete="given-name"
          textContentType="givenName"
          returnKeyType="next"
          submitBehavior="submit"
          error={errors.firstName}
          onChangeText={(text) => handleChange('firstName', text)}
          onSubmitEditing={() => {
            lastNameRef.current?.focus()
            assureFocusedInputVisible()
          }}
        />
        <Input
          ref={lastNameRef}
          label="Last name"
          placeholder="Doe"
          autoCapitalize="words"
          autoComplete="family-name"
          textContentType="familyName"
          returnKeyType="next"
          submitBehavior="submit"
          error={errors.lastName}
          onChangeText={(text) => handleChange('lastName', text)}
          onSubmitEditing={() => {
            emailRef.current?.focus()
            assureFocusedInputVisible()
          }}
        />
        <Input
          ref={emailRef}
          label="Email"
          placeholder="john.doe@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
          submitBehavior="submit"
          error={errors.email}
          onChangeText={(text) => handleChange('email', text)}
          onSubmitEditing={() => {
            phoneRef.current?.focus()
            assureFocusedInputVisible()
          }}
        />
        <PhoneInput
          ref={phoneRef}
          label="Phone number"
          error={errors.phone}
          onChangeText={(text) => handleChange('phone', text)}
          onSubmitEditing={handleSubmit}
        />
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 24,
  },
  form: {
    gap: 16,
  },
})

export default PersonDetails
