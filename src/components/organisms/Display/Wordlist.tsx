import { Button, HStack, Text } from 'native-base'
import { useClient, useDelete } from 'react-supabase'

import { SeeDefinitionButton } from '../../molecules/SeeDefinitionButton'

interface WordlistProps {
  index: number
  item: { word: string }
  handleDefinitionButton: (index: number, word: string) => void
  testID?: string
}

export const WordList = ({
  index,
  item,
  testID,
  handleDefinitionButton,
}: WordlistProps) => {
  // const client = useClient()
  // const [{ count, data, error, fetching }, execute] = useDelete('todos')

  // const handleDelete = async (index: number) => {}
  return (
    <HStack
      testID={testID}
      key={index}
      w="100%"
      justifyContent="start"
      alignItems="center"
    >
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
