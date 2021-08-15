import { useEffect } from 'react'
import 'wicg-inert'

export const useInert = (open: boolean, shouldHide: boolean = true) => {
  useEffect(() => {
    if (shouldHide) {
      document.querySelector('#__next')?.toggleAttribute('inert', true)

      return () => {
        document.querySelector('#__next')?.toggleAttribute('inert', false)
      }
    }
  }, [open])
}
