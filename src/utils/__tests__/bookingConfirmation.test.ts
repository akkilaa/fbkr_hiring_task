import { buildBookingConfirmation } from '@/utils/bookingConfirmation'

describe('buildBookingConfirmation', () => {
  it('returns null when required booking data is missing', () => {
    expect(
      buildBookingConfirmation({
        charterId: 12,
        packageId: null,
        date: new Date('2026-06-01T00:00:00.000Z'),
        adults: 2,
        children: 1,
        firstName: 'Ava',
        lastName: 'Ng',
        email: 'ava@example.com',
        phone: '+1 555 0100',
        paymentMode: 'full',
        selectedCard: null,
      }),
    ).toBeNull()
  })

  it('builds the booking confirmation payload from checkout state', () => {
    const date = new Date('2026-06-01T00:00:00.000Z')

    expect(
      buildBookingConfirmation({
        charterId: 12,
        packageId: 34,
        date,
        adults: 2,
        children: 1,
        firstName: 'Ava',
        lastName: 'Ng',
        email: 'ava@example.com',
        phone: '+1 555 0100',
        paymentMode: 'deposit',
        selectedCard: { last4: '4242', brand: 'visa' },
      }),
    ).toEqual({
      charterId: 12,
      packageId: 34,
      date,
      paymentMode: 'deposit',
      adults: 2,
      children: 1,
      firstName: 'Ava',
      lastName: 'Ng',
      email: 'ava@example.com',
      phone: '+1 555 0100',
      cardLast4: '4242',
      cardBrand: 'visa',
    })
  })
})
