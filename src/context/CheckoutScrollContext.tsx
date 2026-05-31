import { createContext, useContext } from 'react'

/** Named scroll targets a checkout screen can expose to its bottom bar. */
export type CheckoutAnchorId = 'details' | 'card'

export interface CheckoutScrollContextValue {
  /** Sections call this from `onLayout` to publish their scroll offset. */
  registerAnchor: (id: CheckoutAnchorId, y: number) => void
  /**
   * Scroll a previously-registered section into view.
   * Pass `animated: false` when you need the scroll to complete before a
   * programmatic `focus()` call — iOS does not auto-scroll to off-screen inputs
   * on keyboard-show the way Android does, so scrolling first (synchronously)
   * ensures the input is already in the viewport before the keyboard rises.
   */
  scrollToAnchor: (id: CheckoutAnchorId, animated?: boolean) => void
  /**
   * Tell the KeyboardAwareScrollView to scroll the currently-focused input into
   * view immediately. Call this after a programmatic focus() when the keyboard
   * stays up (blurOnSubmit=false) — KASV defers its own scroll until
   * onSelectionChange fires (i.e. first keystroke) in that case.
   */
  assureFocusedInputVisible: () => void
}

const noop = () => {}

export const CheckoutScrollContext = createContext<CheckoutScrollContextValue>({
  registerAnchor: noop,
  scrollToAnchor: noop,
  assureFocusedInputVisible: noop,
})

export const useCheckoutScroll = () => useContext(CheckoutScrollContext)
