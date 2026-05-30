import { api } from '@/lib/api'
import { ApiResponse } from '@/types/api'
import { CharterDTO } from './charter.types'
import { CharterPhotoDTO } from './charterPhoto.types'

const PACKAGE_FIELDS =
  'id,price,min_persons,max_persons,hours,currency,title,description,package_type'

export type AvailabilityParams = {
  trip_date: string
  group_size: number
  booking_days: number
}

export const charterService = {
  getCharter: (charterId: number): Promise<ApiResponse<CharterDTO>> =>
    api.get(`/charters/${charterId}`).then((r) => r.data),

  getPhotos: (charterId: number): Promise<ApiResponse<CharterPhotoDTO[]>> =>
    api.get('/charter_photos', { params: { charter_id: charterId } }).then((r) => r.data),

  getPackages: (charterId: number): Promise<ApiResponse<unknown>> =>
    api
      .get('/packages', { params: { charter_id: charterId, fields: PACKAGE_FIELDS } })
      .then((r) => r.data),

  getAvailability: (charterId: number, params: AvailabilityParams): Promise<ApiResponse<unknown>> =>
    api
      .get('/package_availabilities', { params: { charter_id: charterId, ...params } })
      .then((r) => r.data),
}
