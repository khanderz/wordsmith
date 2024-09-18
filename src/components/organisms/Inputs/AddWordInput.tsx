import { Box, Input } from 'native-base'

import { Definition } from '../../../types'
import { SimpleAnvilLogo } from '../../icons/anvilSimple'

interface AddWordInputProps {
  setInputValue: React.Dispatch<React.SetStateAction<string>>
  inputValue: Definition['word'] | undefined
  testID?: string
}

export const AddWordInput = ({
  setInputValue,
  inputValue,
  testID,
}: AddWordInputProps) => {
  return (
    <Box
      testID={testID}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      w="90%"
    >
      <SimpleAnvilLogo />
      <Input
        aria-label="input-box"
        placeholder="word to add"
        w="50%"
        value={inputValue}
        onChangeText={(v) => setInputValue(v)}
      />
    </Box>
  )
}
