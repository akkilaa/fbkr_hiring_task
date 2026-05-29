import { useQuery } from '@tanstack/react-query'
import { charterQueryOptions } from '@/services/charter/charter.queries'
import { AvailabilityParams } from '@/services/charter/charter.service'

export const useCharter = (charterId: number) => useQuery(charterQueryOptions.detail(charterId))

export const useCharterPhotos = (charterId: number) =>
  useQuery(charterQueryOptions.photos(charterId))

export const useCharterPackages = (charterId: number) =>
  useQuery(charterQueryOptions.packages(charterId))

export const useCharterAvailability = (charterId: number, params: AvailabilityParams) =>
  useQuery(charterQueryOptions.availability(charterId, params))
