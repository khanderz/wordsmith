import { Box, Input } from 'native-base'

import { AddWordButton } from './AddWordButton'
import { PasteButton } from './PasteButton'

interface AddWordInputProps {
  addWord: (inputValue: string) => void
  setInputValue: React.Dispatch<React.SetStateAction<string>>
  inputValue: string
  copiedText: string
  fetchCopiedText: () => void
}

export const AddWordInput = ({
  addWord,
  setInputValue,
  inputValue,
  copiedText,
  fetchCopiedText,
}: AddWordInputProps) => {
  return (
    <Box flexDirection="row" justifyContent="center" w="90%">
      <Input
        aria-label="input-box"
        placeholder="word to add"
        w="50%"
        m={1}
        value={inputValue}
        onChangeText={(v) => setInputValue(v)}
      />
      <AddWordButton
        addWord={addWord}
        setInputValue={setInputValue}
        inputValue={inputValue}
      />
      <PasteButton
        word={copiedText}
        onPress={() => {
          fetchCopiedText()
        }}
      />
    </Box>
  )
}
