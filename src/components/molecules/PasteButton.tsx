import * as Clipboard from 'expo-clipboard'
import { ClipboardPasteButtonProps } from 'expo-clipboard'
import { Button } from 'native-base'
import React from 'react'

type PasteButtonProps = {
  onPress: () => void
} & ClipboardPasteButtonProps

export const PasteButton = ({ onPress, ...props }: PasteButtonProps) => {
  return (
    <Button
      {...props}
      testID="paste-button"
      aria-label="paste-button"
      m={1}
      onPress={() => {
        onPress()
      }}
    >
      Paste
    </Button>
  )
}
