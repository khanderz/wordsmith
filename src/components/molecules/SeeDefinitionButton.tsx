import { useWordlistContext } from '../../lib/providers/WordlistProvider'
import { Definition } from '../../types'
import { Button } from '../atoms/Button'

interface SeeDefinitionButtonProps {
  index: number
  item: Definition
}

export const SeeDefinitionButton = ({
  index,
  item,
}: SeeDefinitionButtonProps) => {
  const { list, handleWordToSearch } = useWordlistContext()

  const handleDefinitionButton = (index: number) => {
    const word = list?.[index].word

    handleWordToSearch(word)
  }

  return (
    <Button
      testID="definition-button"
      key={index}
      onPress={() => handleDefinitionButton(index)}
      buttonText="Definition"
      compact
    />
  )
}
