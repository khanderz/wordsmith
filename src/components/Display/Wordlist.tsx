import { HStack, Text } from 'native-base'

import { SeeDefinitionButton } from '../Inputs/SeeDefinitionButton'

interface WordlistProps {
  index: number
  item: { word: string }
  handleDefinitionButton: (index: number, word: string) => void
}

export const WordList = ({
  index,
  item,
  handleDefinitionButton,
}: WordlistProps) => {
  return (
    <HStack key={index} w="100%" justifyContent="start" alignItems="center">
      <Text
        key={index}
        aria-label={`vocab-word-${index}`}
        textAlign="left"
        margin={1}
      >
        {item.word}
      </Text>
      <SeeDefinitionButton
        handleDefinitionButton={handleDefinitionButton}
        index={index}
        item={item}
      />
    </HStack>
  )
}
