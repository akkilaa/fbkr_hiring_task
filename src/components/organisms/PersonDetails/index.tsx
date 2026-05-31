import Input from '@/components/atoms/Input'
import Typography from '@/components/atoms/Typography'
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

export interface PersonDetailsHandle {
  submit: () => void
}

interface PersonDetailsProps {
  onSubmit: () => void
}

const PersonDetails = forwardRef<PersonDetailsHandle, PersonDetailsProps>(({ onSubmit }, ref) => {
  const theme = useTheme()
  const setPersonDetails = usePersonDetailsStore((s) => s.setPersonDetails)

  const firstNameRef = useRef<TextInput>(null)
  const lastNameRef = useRef<TextInput>(null)
  const emailRef = useRef<TextInput>(null)
  const phoneRef = useRef<TextInput>(null)

  const values = useRef({ firstName: '', lastName: '', email: '', phone: '' })

  const [errors, setErrors] = useState<FormErrors>({})

  const handleSubmit = () => {
    const result = schema.safeParse(values.current)
    if (!result.success) {
      const fieldErrors: FormErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormErrors
        if (!fieldErrors[field]) fieldErrors[field] = issue.message
      }
      setErrors(fieldErrors)
      // Focusing the first invalid field scrolls it into view via keyboard-aware scroll.
      const fieldRefs = {
        firstName: firstNameRef,
        lastName: lastNameRef,
        email: emailRef,
        phone: phoneRef,
      }
      const firstInvalid = (Object.keys(fieldRefs) as (keyof typeof fieldRefs)[]).find(
        (field) => fieldErrors[field],
      )
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
          error={errors.firstName}
          onChangeText={(text) => {
            values.current.firstName = text
          }}
          onSubmitEditing={() => setTimeout(() => lastNameRef.current?.focus(), 50)}
        />
        <Input
          ref={lastNameRef}
          label="Last name"
          placeholder="Doe"
          autoCapitalize="words"
          autoComplete="family-name"
          textContentType="familyName"
          returnKeyType="next"
          error={errors.lastName}
          onChangeText={(text) => {
            values.current.lastName = text
          }}
          onSubmitEditing={() => setTimeout(() => emailRef.current?.focus(), 50)}
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
          error={errors.email}
          onChangeText={(text) => {
            values.current.email = text
          }}
          onSubmitEditing={() => setTimeout(() => phoneRef.current?.focus(), 50)}
        />
        <Input
          ref={phoneRef}
          label="Phone number"
          placeholder="+1 234 567 8900"
          keyboardType="phone-pad"
          autoComplete="tel"
          textContentType="telephoneNumber"
          returnKeyType="done"
          error={errors.phone}
          onChangeText={(text) => {
            values.current.phone = text
          }}
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
