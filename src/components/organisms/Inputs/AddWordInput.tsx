import { Box, Input } from 'native-base'

import { Definition } from '../../../types'
import { AddWordButton } from '../../molecules/AddWordButton'
import { PasteButton } from '../../molecules/PasteButton'

interface AddWordInputProps {
  addWord: (inputValue: Definition['word']) => void
  setInputValue: React.Dispatch<React.SetStateAction<string>>
  inputValue: Definition['word'] | undefined
  fetchCopiedText: () => void
  testID?: string
}

export const AddWordInput = ({
  addWord,
  setInputValue,
  inputValue,
  fetchCopiedText,
  testID,
}: AddWordInputProps) => {
  return (
    <Box testID={testID} flexDirection="row" justifyContent="center" w="90%">
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
