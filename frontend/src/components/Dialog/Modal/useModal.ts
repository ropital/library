import { RefObject, useCallback, useEffect } from "react"
import { useInert } from "../../../hooks/useInert";
import { getFirstTabbableElement } from "../../../utils/a11y/getFirstTabbableElement";

export type FocusableElement = {
  focus(options?: FocusOptions): void
}

export type UseModalProps = {
  isOpen: boolean
  modalRef: RefObject<HTMLDivElement>
  closeOnEsc?: boolean
  shouldHide?: boolean
  finalFocusRef?: RefObject<FocusableElement>
  onClose?: () => void
}

export const useModal = (props: UseModalProps) => {
  const { isOpen, shouldHide, closeOnEsc = true, finalFocusRef, modalRef, onClose } = props

  useInert(isOpen, shouldHide);
  
  useEffect(() => {
    try {
      getFirstTabbableElement(modalRef).focus()
    } catch (error) {
      console.warn("There are no focusable elements. Put the close button.")
    }
    
    return () => {
      setTimeout(() => {
        finalFocusRef?.current?.focus()
      }) 
    }
  }, [])

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation()

        if (closeOnEsc) {
          onClose?.()
        }
      }
    },
    [closeOnEsc, onClose],
  )

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown)
    
    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [onKeyDown])
}