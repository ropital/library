import { RefObject } from "react"

export const getFirstTabbableElement = (ref: RefObject<HTMLElement>): HTMLElement => {
  const tabbableElements = ref.current?.querySelectorAll<HTMLElement>(
    'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
  )

  if (!tabbableElements) throw new Error("Tabbable elements is not found")

  return tabbableElements[0]
}