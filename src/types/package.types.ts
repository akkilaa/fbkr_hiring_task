export interface PackageAvailability {
  packageId: number
  available: boolean
  spotsAvailable: number | null
  reason: string | null
  freeCancellationUntil: string | null
  isInstantBook: boolean
}

export interface PackageAvailabilityDTO extends Omit<
  PackageAvailability,
  'packageId' | 'spotsAvailable' | 'freeCancellationUntil' | 'isInstantBook'
> {
  package_id: number
  spots_available: number | null
  free_cancellation_until: string | null
  is_instant_book: boolean
}

export interface Package {
  id: number
  price: number
  minPersons: number
  maxPersons: number | null
  currency: string
}

export interface PackageDTO extends Omit<Package, 'id' | 'price' | 'minPersons' | 'maxPersons'> {
  id: string
  price: string
  min_persons: number
  max_persons: number | null
}
