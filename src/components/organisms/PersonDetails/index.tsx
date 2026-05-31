import Input from '@/components/atoms/Input'
import PhoneInput from '@/components/atoms/PhoneInput'
import Typography from '@/components/atoms/Typography'
import { useCheckoutScroll } from '@/context/CheckoutScrollContext'
import { useTheme } from '@/hooks/use-theme'
import { usePersonDetailsStore } from '@/store/personDetailsStore'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Platform, StyleSheet, TextInput, View } from 'react-native'
import { z } from 'zod'

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.email('Invalid email address'),
  phone: z
    .string()
    .regex(/^\+?\d[\d\s\-()]*$/, 'Enter a valid phone number')
    .refine((val) => val.replace(/\D/g, '').length >= 7, 'Phone number is too short'),
})

type FormErrors = Partial<Record<keyof z.infer<typeof schema>, string>>
type FieldName = keyof z.infer<typeof schema>

const FIELD_ORDER: FieldName[] = ['firstName', 'lastName', 'email', 'phone']

const getFieldErrors = (issues: z.ZodIssue[]): FormErrors => {
  const fieldErrors: FormErrors = {}
  for (const issue of issues) {
    const field = issue.path[0] as FieldName
    if (!fieldErrors[field]) fieldErrors[field] = issue.message
  }
  return fieldErrors
}

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

  const { firstName, lastName, email, phone } = usePersonDetailsStore.getState()
  const values = useRef({ firstName, lastName, email, phone })
  const [errors, setErrors] = useState<FormErrors>({})
  const debounceTimers = useRef<Partial<Record<FieldName, ReturnType<typeof setTimeout>>>>({})

  const validateCurrentValues = () => {
    const result = schema.safeParse(values.current)
    if (result.success) {
      return { isValid: true as const, data: result.data }
    }

    return {
      isValid: false as const,
      errors: getFieldErrors(result.error.issues),
    }
  }

  const handleChange = (field: FieldName, text: string) => {
    values.current[field] = text
    clearTimeout(debounceTimers.current[field])

    debounceTimers.current[field] = setTimeout(() => {
      const validation = validateCurrentValues()
      if (validation.isValid) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
        setPersonDetails(validation.data)
      } else {
        const { errors: fieldErrors } = validation
        setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }))
        setPersonDetails({
          firstName: fieldErrors.firstName ? '' : values.current.firstName,
          lastName: fieldErrors.lastName ? '' : values.current.lastName,
          email: fieldErrors.email ? '' : values.current.email,
          phone: fieldErrors.phone ? '' : values.current.phone,
        })
      }
    }, 500)
  }

  const handleSubmit = () => {
    for (const timer of Object.values(debounceTimers.current)) clearTimeout(timer)

    const validation = validateCurrentValues()
    if (!validation.isValid) {
      const firstInvalid = FIELD_ORDER.find((field) => validation.errors[field])
      if (firstInvalid) fieldRefs[firstInvalid].current?.focus()
      return
    }

    setErrors({})
    setPersonDetails(validation.data)
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
          defaultValue={values.current.firstName}
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
          defaultValue={values.current.lastName}
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
          // Android handles the in-place keyboard swap fine, so keep it up and
          // scroll manually like the other hops. iOS instead jumps-then-settles
          // on the QWERTY -> numeric swap, so let the email keyboard dismiss.
          submitBehavior={Platform.OS === 'ios' ? undefined : 'submit'}
          defaultValue={values.current.email}
          error={errors.email}
          onChangeText={(text) => handleChange('email', text)}
          onSubmitEditing={() => {
            if (Platform.OS === 'ios') {
              // Let the email keyboard dismiss and the numeric one re-present so
              // KASV's keyboard-show scroll rises in lockstep with the keyboard.
              // The deferred focus lets the dismissal register before we refocus.
              requestAnimationFrame(() => phoneRef.current?.focus())
              return
            }
            phoneRef.current?.focus()
            assureFocusedInputVisible()
          }}
        />
        <PhoneInput
          ref={phoneRef}
          label="Phone number"
          defaultValue={values.current.phone}
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
