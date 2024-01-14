import { Button } from 'native-base'

interface AddWordButtonProps {
  addWord: (inputValue: string) => void
  setInputValue: React.Dispatch<React.SetStateAction<string>>
  inputValue: string
}

export const AddWordButton = ({
  addWord,
  setInputValue,
  inputValue,
}: AddWordButtonProps) => {
  return (
    <Button
      aria-label="add-button"
      m={1}
      onPress={() => {
        addWord(inputValue)
        setInputValue('')
      }}
    >
      Add
    </Button>
  )
}
