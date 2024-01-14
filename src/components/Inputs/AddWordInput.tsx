import { Box, Input } from 'native-base'

import { AddWordButton } from './AddWordButton'

interface AddWordInputProps {
  addWord: (inputValue: string) => void
  setInputValue: React.Dispatch<React.SetStateAction<string>>
  inputValue: string
}

export const AddWordInput = ({
  addWord,
  setInputValue,
  inputValue,
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
    </Box>
  )
}
