import { useWordlistContext } from '../../lib/providers/WordlistContext'
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
  const { list, setWordToSearchVar, handleWordToSearch } = useWordlistContext()

  const handleDefinitionButton = (index: number) => {
    const word = list?.[index].word

    if (word) {
      // setWordToSearchVar(word)
      handleWordToSearch(word)
    } else {
      setWordToSearchVar(item.word)
      handleWordToSearch(item.word)
    }
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
