import { Flex, useToast } from 'native-base'
import { useState } from 'react'

import { WordList } from '../components/organisms/Display/Wordlist'
import { DefinitionModal } from '../components/organisms/Feedback/DefinitionModal'
import { useWordlistContext } from '../lib/providers/WordlistContext'
import { utils } from '../lib/utils/index'
import { Definition, DefinitionInsert } from '../types'

export const HomeScreen = () => {
  // utils
  const { list, IsWordInDb, wordToSearchVar, setWordToSearchVar } =
    useWordlistContext()
  const toast = useToast()

  // definitions
  const [modalVisible, setModalVisible] = useState(false)
  const [definition, setDefinition] = useState<
    Definition[] | Definition | DefinitionInsert
  >([])

  const handleInsert = async (def: Definition[]) => {
    const { definitionObject, meaningsArray, definitionsMapped } =
      utils.UseDictMapper({ def })

    utils.UseInsertDefToTable({
      definitionObject,
      meaningsArray,
      definitionsMapped,
    })
  }

  const handleWordToSearch = async () => {
    if (IsWordInDb) {
      // setDefinition(IsWordInDb)
      setModalVisible(true)
    } else {
      const def: Definition[] = await utils.fetchDict(wordToSearchVar)

      if ((def as Definition[])[0].title === 'No Definitions Found') {
        toast.show({
          title: 'No Definitions Found',
        })
      } else {
        setModalVisible(true)
        setDefinition(def)
        handleInsert(def)
      }
    }
  }

  const handleDefinitionButton = (index: number) => {
    setWordToSearchVar(list?.[index].word)
    handleWordToSearch()
  }

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      align="center"
      w="100%"
      h="100%"
    >
      <WordList list={list} handleDefinitionButton={handleDefinitionButton} />
      <DefinitionModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        definition={definition}
        IsWordInDb={IsWordInDb}
      />
    </Flex>
  )
}
