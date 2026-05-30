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
  hours: number
  title: string
  description: string
  packageType: string
  capacity: number
}

export interface PackageDTO extends Omit<
  Package,
  'id' | 'price' | 'minPersons' | 'maxPersons' | 'packageType'
> {
  id: string
  price: string
  min_persons: number
  max_persons: number | null
  package_type: string
}

export const mapPackage = (dto: PackageDTO): Package => ({
  id: Number(dto.id),
  price: Number(dto.price),
  minPersons: dto.min_persons,
  maxPersons: dto.max_persons,
  currency: dto.currency,
  hours: dto.hours,
  title: dto.title,
  description: dto.description,
  packageType: dto.package_type,
  capacity: dto.capacity,
})
