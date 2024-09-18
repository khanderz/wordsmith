import { Box, Text } from 'native-base'
import { useClient, useDelete } from 'react-supabase'

import { SeeDefinitionButton } from './SeeDefinitionButton'

interface WordRowProps {
  index: number
  item: { word: string }
  handleDefinitionButton: (index: number, word: string) => void
  testID: string
}

export const WordRow = ({
  item,
  handleDefinitionButton,
  index,
  testID,
}: WordRowProps) => {
  // const client = useClient()
  // const [{ count, data, error, fetching }, execute] = useDelete('todos')

  // const handleDelete = async (index: number) => {}
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      paddingX={4}
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
    </Box>
  )
}
