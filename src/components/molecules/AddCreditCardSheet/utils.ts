import { z } from 'zod'

// --- Formatters ---

export const formatCardNumber = (text: string) => {
  const digits = text.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
}

export const formatExpiry = (text: string, prev: string) => {
  const digits = text.replace(/\D/g, '').slice(0, 4)
  if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  // auto-remove slash when backspacing
  if (prev.endsWith('/') && text.length < prev.length) return digits.slice(0, 1)
  return digits
}

// --- Validation schemas ---

export const holderNameSchema = z.string().min(1, 'Name is required')

export const cardNumberSchema = z
  .string()
  .transform((v) => v.replace(/\D/g, ''))
  .pipe(z.string().length(16, 'Enter a valid 16-digit card number'))

export const expirySchema = z.string().superRefine((val, ctx) => {
  const parts = val.split('/')
  const month = parseInt(parts[0], 10)
  const year = parts[1] ? 2000 + parseInt(parts[1], 10) : NaN
  if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Enter a valid expiry (MM/YY)' })
    return
  }
  const now = new Date()
  if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Card has expired' })
  }
})

export const cvvSchema = z.string().regex(/^\d{3,4}$/, 'Enter a valid CVV')

export const creditCardSchema = z.object({
  holderName: holderNameSchema,
  cardNumber: cardNumberSchema,
  expiry: expirySchema,
  cvv: cvvSchema,
})

export type FormErrors = Partial<Record<keyof z.input<typeof creditCardSchema>, string>>
