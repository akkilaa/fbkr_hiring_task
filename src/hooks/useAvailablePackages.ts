import { charterQueryOptions } from '@/services/charter/charter.queries'
import { Package } from '@/services/charter/package.types'
import { toCalendarDateString } from '@/utils/dateUtils'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export type PackageWithAvailability = Package & { isAvailable: boolean }

export const useAvailablePackages = (
  charterId: number,
  date: Date,
  adults: number,
  children: number,
) => {
  const packagesQuery = useQuery(charterQueryOptions.packages(charterId))
  const availabilityQuery = useQuery(
    charterQueryOptions.availability(charterId, {
      trip_date: toCalendarDateString(date),
      group_size: adults + children,
      booking_days: 1,
    }),
  )

  const data = useMemo<PackageWithAvailability[]>(() => {
    if (!packagesQuery.data) return []
    const availabilityMap = availabilityQuery.data ?? {}
    return packagesQuery.data
      .map((pkg) => ({ ...pkg, isAvailable: availabilityMap[pkg.id]?.available ?? true }))
      .sort((a, b) => Number(b.isAvailable) - Number(a.isAvailable))
  }, [packagesQuery.data, availabilityQuery.data])

  return {
    data,
    isLoading: packagesQuery.isLoading || availabilityQuery.isLoading,
  }
}
