import { charterQueryOptions } from '@/services/charter/charter.queries'
import { useQuery } from '@tanstack/react-query'

export const useCharter = (charterId: number) => useQuery(charterQueryOptions.detail(charterId))

export const useCharterPhotos = (charterId: number) =>
  useQuery(charterQueryOptions.photos(charterId))

export const useCharterPackages = (charterId: number) =>
  useQuery(charterQueryOptions.packages(charterId))
