import { Flex } from 'native-base'

import { WordList } from '../components/organisms/Display/Wordlist'
import { DefinitionModal } from '../components/organisms/Feedback/DefinitionModal'
import { useWordlistContext } from '../lib/providers/WordlistContext'

export const HomeScreen = () => {
  // utils
  const { modalVisible } = useWordlistContext()

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      align="center"
      w="100%"
      h="100%"
    >
      <WordList />
      <DefinitionModal modalVisible={modalVisible} />
    </Flex>
  )
}
