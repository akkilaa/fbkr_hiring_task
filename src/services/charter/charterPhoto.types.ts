import type { StringBool } from '@/types/api'

/** Clean domain model with proper TypeScript types */
export interface CharterPhoto {
  id: number
  charterId: number
  description: string
  altText: string | null
  cardinal: boolean
  path: string
  width: number
  height: number
  aspectRatio: number
  status: string
  dateCreated: string
  dateUpdated: string
  urls: CharterPhotoUrls
  urlPattern: string
}

/**
 * Raw API response shape — inherits shared fields from CharterPhoto,
 * overrides fields whose name or type differ from the wire format.
 */
export interface CharterPhotoDTO extends Omit<
  CharterPhoto,
  | 'id'
  | 'charterId'
  | 'altText'
  | 'cardinal'
  | 'width'
  | 'height'
  | 'aspectRatio'
  | 'dateCreated'
  | 'dateUpdated'
  | 'urlPattern'
> {
  // Overrides
  id: string
  charter_idcharter: string
  alt_text: string | null
  cardinal: StringBool
  width: string
  height: string
  aspect_ratio: string
  date_created: string
  date_updated: string
  url_pattern: string
}

interface CharterPhotoUrls {
  small: string
  thumbnail: string
  public: string
  m: string
  mb: string
  f: string
  fb: string
  t: string
  tb: string
  s: string
  sb: string
}
