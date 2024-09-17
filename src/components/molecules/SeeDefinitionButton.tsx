import { Button } from '../atoms/Button'

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
      testID="definition-button"
      key={index}
      onPress={() => handleDefinitionButton(index, item.word)}
      buttonText="Definition"
      compact
    />
  )
}
