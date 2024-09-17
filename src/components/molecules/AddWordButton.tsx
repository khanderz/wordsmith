import { Button } from '../atoms/Button'

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
      onPress={() => {
        addWord((inputValue as AddWordButtonProps['inputValue']) ?? '')
        setInputValue('')
      }}
      buttonText="Add"
    />
  )
}
