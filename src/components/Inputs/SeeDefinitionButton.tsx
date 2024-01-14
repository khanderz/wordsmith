import { Button } from 'native-base'

interface SeeDefinitionButtonProps {
  handleDefinitionButton: (index: number, word: string) => void
  index: number
  item: { word: string }
}

export const SeeDefinitionButton = ({
  handleDefinitionButton,
  index,
  item,
}: SeeDefinitionButtonProps) => {
  return (
    <Button
      aria-label="definition-button"
      size="sm"
      onPress={() => handleDefinitionButton(index, item.word)}
    >
      See definition
    </Button>
  )
}
