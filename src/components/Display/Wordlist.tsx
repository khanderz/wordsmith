import { Button, HStack, Text } from 'native-base'
import { useClient, useDelete } from 'react-supabase'

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
  const client = useClient()
  // const [{ count, data, error, fetching }, execute] = useDelete('todos')

  // const handleDelete = async (index: number) => {}
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
      {/* <Button
        key={index}
        aria-label="delete-button"
        size="sm"
        onPress={() => handleDelete(index)}
      >
        Delete
      </Button> */}
    </HStack>
  )
}
