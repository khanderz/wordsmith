import * as Clipboard from 'expo-clipboard'
import { ClipboardPasteButtonProps } from 'expo-clipboard'

import { Button } from '../atoms/Button'

type PasteButtonProps = {
  onPress: () => void
} & ClipboardPasteButtonProps

export const PasteButton = ({ onPress }: PasteButtonProps) => {
  return (
    <Button
      testID="paste-button"
      onPress={() => {
        onPress()
      }}
      buttonText="Paste"
    />
  )
}
