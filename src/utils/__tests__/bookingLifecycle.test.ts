import { useBookingConfirmationStore } from '@/store/bookingConfirmationStore'
import { useCharterBookingStore } from '@/store/charterBookingStore'
import { useCreditCardStore } from '@/store/creditCardStore'
import { usePersonDetailsStore } from '@/store/personDetailsStore'
import { enterSuccessScreen, resetBookingState } from '@/utils/bookingLifecycle'

describe('booking lifecycle helpers', () => {
  beforeEach(() => {
    useCharterBookingStore.setState({
      charterId: 1,
      selectedPackageId: 2,
      date: new Date('2026-06-01T00:00:00.000Z'),
      adults: 4,
      children: 1,
    })
    usePersonDetailsStore.setState({
      firstName: 'Ava',
      lastName: 'Ng',
      email: 'ava@example.com',
      phone: '+1 555 0100',
    })
    useCreditCardStore.setState({
      cards: [
        { id: 'card-1', holderName: 'Ava Ng', last4: '4242', expiry: '12/30', brand: 'visa' },
      ],
      selectedCardId: 'card-1',
    })
    useBookingConfirmationStore.setState({
      confirmation: {
        charterId: 1,
        packageId: 2,
        date: new Date('2026-06-01T00:00:00.000Z'),
        paymentMode: 'full',
        adults: 4,
        children: 1,
        firstName: 'Ava',
        lastName: 'Ng',
        email: 'ava@example.com',
        phone: '+1 555 0100',
        cardLast4: '4242',
        cardBrand: 'visa',
      },
    })
  })

  it('resets booking, details, and selected card state for the next trip', () => {
    resetBookingState()

    expect(useCharterBookingStore.getState()).toMatchObject({
      charterId: null,
      selectedPackageId: null,
      adults: 2,
      children: 0,
    })
    expect(usePersonDetailsStore.getState()).toMatchObject({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    })
    expect(useCreditCardStore.getState()).toMatchObject({
      selectedCardId: null,
    })
  })

  it('hides the loader before resetting the success screen state', () => {
    const hideLoader = jest.fn()

    enterSuccessScreen(hideLoader, resetBookingState)

    expect(hideLoader).toHaveBeenCalledTimes(1)
    expect(useCharterBookingStore.getState().charterId).toBeNull()
  })
})
