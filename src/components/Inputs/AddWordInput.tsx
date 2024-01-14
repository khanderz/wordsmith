import { Box, Input } from 'native-base'

import { AddWordButton } from './AddWordButton'
import { PasteButton } from './PasteButton'
import { Definition } from '../../types'

interface AddWordInputProps {
  addWord: (inputValue: Definition['word']) => void
  setInputValue: React.Dispatch<React.SetStateAction<string>>
  inputValue: Definition['word']
  fetchCopiedText: () => void
}

export const AddWordInput = ({
  addWord,
  setInputValue,
  inputValue,
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
        onPress={() => {
          fetchCopiedText()
        }}
      />
    </Box>
  )
}
