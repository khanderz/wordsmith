import React, { createContext, useState, useContext, useMemo } from 'react'
import { Snackbar } from 'react-native-paper'

interface SnackbarContextProps {
  showSnackbar: (
    message: string,
    actionLabel?: string,
    actionHandler?: () => void,
  ) => void
  hideSnackbar: () => void
}

const SnackbarContext = createContext<SnackbarContextProps>({
  showSnackbar: () => {},
  hideSnackbar: () => {},
})

interface SnackbarProviderProps {
  children: React.ReactNode
  testID: string
}

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [actionLabel, setActionLabel] = useState<string | undefined>(undefined)
  const [actionHandler, setActionHandler] = useState<(() => void) | undefined>(
    undefined,
  )

  const showSnackbar = (
    message: string,
    actionLabel?: string,
    actionHandler?: () => void,
  ) => {
    setMessage(message)
    setActionLabel(actionLabel)
    setActionHandler(() => actionHandler)
    setVisible(true)
  }

  const hideSnackbar = () => {
    setVisible(false)
  }

  const contextValue = useMemo(() => ({ showSnackbar, hideSnackbar }), [])

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={hideSnackbar}
        action={
          actionLabel
            ? {
                label: actionLabel,
                onPress: actionHandler || (() => {}),
              }
            : undefined
        }
      >
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = () => {
  const context = useContext(SnackbarContext)
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  }
  return context
}
