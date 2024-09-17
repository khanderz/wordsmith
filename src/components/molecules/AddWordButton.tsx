import { Button } from 'native-base'

interface AddWordButtonProps {
  addWord: (inputValue: string) => void
  setInputValue: React.Dispatch<React.SetStateAction<string>>
  inputValue: string | undefined
}

export const AddWordButton = ({
  addWord,
  setInputValue,
  inputValue,
}: AddWordButtonProps) => {
  return (
    <Button
      testID="add-word-button"
      aria-label="add-button"
      m={1}
      onPress={() => {
        addWord(inputValue as string)
        setInputValue('')
      }}
    >
      Add
    </Button>
  )
}
