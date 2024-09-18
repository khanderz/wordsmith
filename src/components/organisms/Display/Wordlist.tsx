import { VStack } from 'native-base'
import { Divider } from 'react-native-paper'

import { useWordlistContext } from '../../../lib/providers/WordlistContext'
import { Definition } from '../../../types'
import { WordRow } from '../../molecules/WordRow'

export const WordList = () => {
  const { list } = useWordlistContext()
  return (
    <VStack testID="word-list" space={2}>
      <Divider />
      {(list as Definition[])?.map((item, index) => {
        return (
          <>
            <WordRow
              key={index}
              testID={`word-${index}`}
              index={index}
              item={item}
            />
            <Divider />
          </>
        )
      })}
    </VStack>
  )
}
