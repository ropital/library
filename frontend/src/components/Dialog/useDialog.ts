import { useCallback, useState } from 'react'

export type UseDialogReturns = {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

export const useDialog = (): UseDialogReturns => {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  return {isOpen, onClose, onOpen}
}
