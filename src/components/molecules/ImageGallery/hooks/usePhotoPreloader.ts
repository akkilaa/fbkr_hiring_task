import { CharterPhoto } from '@/services/charter/charterPhoto.types'
import { Image } from 'expo-image'
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

const PRELOAD_BATCH = 30
const PRELOAD_TRIGGER = 5

export const usePhotoPreloader = (photos: CharterPhoto[]) => {
  const photosRef = useRef(photos)
  useLayoutEffect(() => {
    photosRef.current = photos
  })
  const preloadedUpToRef = useRef(0)

  const preloadBatch = useCallback((from: number) => {
    const current = photosRef.current
    const to = Math.min(from + PRELOAD_BATCH, current.length)
    if (from >= current.length) return
    Image.prefetch(current.slice(from, to).map((p) => p.urls.public))
    preloadedUpToRef.current = to
  }, [])

  useEffect(() => {
    preloadedUpToRef.current = 0
    preloadBatch(0)
  }, [photos, preloadBatch])

  const notifyPhotoVisible = useCallback(
    (index: number) => {
      if (index >= preloadedUpToRef.current - PRELOAD_TRIGGER) {
        preloadBatch(preloadedUpToRef.current)
      }
    },
    [preloadBatch],
  )

  return { notifyPhotoVisible }
}
