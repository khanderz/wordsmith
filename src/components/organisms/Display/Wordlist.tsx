import { Box, VStack } from 'native-base'
import { Divider } from 'react-native-paper'

import { useWordlistContext } from '../../../lib/providers/WordlistProvider'
import { Definition } from '../../../types'
import { WordRow } from '../../molecules/WordRow'

export const WordList = () => {
  const { list } = useWordlistContext()
  return (
    <VStack testID="word-list" space={2}>
      <Divider />
      {(list as Definition[])?.map((item, index) => {
        return (
          <Box key={item.id || index}>
            <WordRow testID={`word-${index}`} index={index} item={item} />
            <Divider />
          </Box>
        )
      })}
    </VStack>
  )
}
