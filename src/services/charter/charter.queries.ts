import { queryOptions } from '@tanstack/react-query'
import { AvailabilityParams, charterService } from './charter.service'
import { mapCharter } from './charter.types'
import { mapCharterPhoto } from './charterPhoto.types'
import { mapPackage } from './package.types'

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
      select: (res) => mapCharter(res.data),
    }),

  photos: (charterId: number) =>
    queryOptions({
      queryKey: charterKeys.photos(charterId),
      queryFn: () => charterService.getPhotos(charterId),
      select: (res) => res.data.map(mapCharterPhoto),
    }),

  packages: (charterId: number) =>
    queryOptions({
      queryKey: charterKeys.packages(charterId),
      queryFn: () => charterService.getPackages(charterId),
      select: (res) => res.data.map(mapPackage),
    }),

  availability: (charterId: number, params: AvailabilityParams) =>
    queryOptions({
      queryKey: charterKeys.availability(charterId, params),
      queryFn: () => charterService.getAvailability(charterId, params),
      select: (res) => res.data,
    }),
}
