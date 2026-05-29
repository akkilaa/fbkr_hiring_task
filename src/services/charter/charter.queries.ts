import { queryOptions } from '@tanstack/react-query'
import { charterService, AvailabilityParams } from './charter.service'

export const charterKeys = {
  all: (charterId: number) => ['charters', charterId] as const,
  detail: (charterId: number) => [...charterKeys.all(charterId), 'detail'] as const,
  photos: (charterId: number) => [...charterKeys.all(charterId), 'photos'] as const,
  packages: (charterId: number) => [...charterKeys.all(charterId), 'packages'] as const,
  availability: (charterId: number, params: AvailabilityParams) =>
    [...charterKeys.all(charterId), 'availability', params] as const,
}

export const charterQueryOptions = {
  detail: (charterId: number) =>
    queryOptions({
      queryKey: charterKeys.detail(charterId),
      queryFn: () => charterService.getCharter(charterId),
    }),

  photos: (charterId: number) =>
    queryOptions({
      queryKey: charterKeys.photos(charterId),
      queryFn: () => charterService.getPhotos(charterId),
    }),

  packages: (charterId: number) =>
    queryOptions({
      queryKey: charterKeys.packages(charterId),
      queryFn: () => charterService.getPackages(charterId),
    }),

  availability: (charterId: number, params: AvailabilityParams) =>
    queryOptions({
      queryKey: charterKeys.availability(charterId, params),
      queryFn: () => charterService.getAvailability(charterId, params),
    }),
}
