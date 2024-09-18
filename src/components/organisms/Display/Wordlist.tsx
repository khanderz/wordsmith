import { VStack } from 'native-base'
import { Divider } from 'react-native-paper'

import { WordlistContextProps } from '../../../lib/providers/WordlistContext'
import { Definition } from '../../../types'
import { WordRow } from '../../molecules/WordRow'

interface WordlistProps {
  list: WordlistContextProps['list']
  handleDefinitionButton: (index: number, word: string) => void
}

export const WordList = ({ list, handleDefinitionButton }: WordlistProps) => {
  return (
    <VStack testID="word-list" space={2}>
      <Divider />
      {(list as Definition[])?.map((item, index) => {
        return (
          <>
            <WordRow
              testID={`word-${index}`}
              index={index}
              item={item}
              handleDefinitionButton={handleDefinitionButton}
            />
            <Divider />
          </>
        )
      })}
    </VStack>
  )
}
