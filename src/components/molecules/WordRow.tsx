import { Box, Text } from 'native-base'
import { useClient, useDelete } from 'react-supabase'

import { SeeDefinitionButton } from './SeeDefinitionButton'
import { Definition } from '../../types'

interface WordRowProps {
  index: number
  item: Definition
  testID: string
}

export const WordRow = ({ item, index, testID }: WordRowProps) => {
  // const client = useClient()
  // const [{ count, data, error, fetching }, execute] = useDelete('todos')

  // const handleDelete = async (index: number) => {}
  return (
    <Box
      key={index}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      paddingX={4}
    >
      <Text
        testID={testID}
        aria-label={`vocab-word-${index}`}
        textAlign="left"
        margin={1}
      >
        {item.word}
      </Text>
      <SeeDefinitionButton index={index} item={item} />
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
