import { QueryData, QueryError } from '@supabase/supabase-js'
import * as Clipboard from 'expo-clipboard'
import { Flex, Text, VStack, useToast } from 'native-base'
import * as React from 'react'

import { Database } from '../../supabase/database.types'
import { supabase } from '../clients/supabase'
import { WordList } from '../components/Display/Wordlist'
import { DefinitionModal } from '../components/Feedback/DefinitionModal'
import { AddWordInput } from '../components/Inputs/AddWordInput'
import { Definition, DefinitionInsert } from '../types'
import { UseDictMapper } from '../utils/useDictMapper'
import { fetchDict } from '../utils/useDictSearch'
import { UseInsertDefToTable } from '../utils/useInsertDefToTable'
import { UseIsWordInDb } from '../utils/useIsWordInDb'

let IsWordInDb = undefined
let wordToSearchVar = undefined

export const HomeScreen = () => {
  // utils
  const toast = useToast()

  // definitions
  const [modalVisible, setModalVisible] = React.useState(false)
  const [definition, setDefinition] = React.useState<
    Definition[] | Definition | DefinitionInsert
  >([])

  // word list
  const [list, setList] = React.useState<Definition[] | Definition>([])
  const [inputValue, setInputValue] = React.useState<Definition['title']>('')

  // copy function
  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync()
    setInputValue(text)
  }

  // supabase fetch
  const [fetchError, setFetchError] = React.useState<QueryError | null>(null)

  const fetchWords = async () => {
    const { data, error } = await supabase.from('definition').select('*')
    if (error) {
      setFetchError(error)
      setList(null)
      console.log(fetchError)
      return
    }
    if (data) {
      setList(data as QueryData<Database>)
      setFetchError(null)
    }
  }
  React.useEffect(() => {
    fetchWords()
  }, [])

  // handles
  const addWord = (word: Definition['word']) => {
    const { wordInList, wordToSearch } = UseIsWordInDb({ list, word })

    IsWordInDb = !!wordInList
    wordToSearchVar = wordToSearch

    if (IsWordInDb) {
      toast.show({
        title: 'Word Already Exists',
      })
      return
    }

    if (word === '') {
      toast.show({
        title: 'Please Enter Text',
      })
      return
    }

    setList((prevList: Definition) => {
      return [
        //@ts-ignore
        ...prevList,
        {
          word,
        },
      ]
    })
  }

  const handleInsert = async (def: Definition[]) => {
    const { definitionObject, meaningsArray, definitionsMapped } =
      UseDictMapper({ def })

    UseInsertDefToTable({
      definitionObject,
      meaningsArray,
      definitionsMapped,
    })
  }

  const handleWordToSearch = async () => {
    if (IsWordInDb) {
      setDefinition(IsWordInDb)
      setModalVisible(true)
    } else {
      const def: Definition[] = await fetchDict(wordToSearchVar)

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
    wordToSearchVar = list[index].word
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
      <Text margin={1} selectable selectionColor="red">
        random words This differs a lot from the way the original project was
        written. Basically, ignore the value prop and pass text components as
        children using the textComponentProps section. Typescript will give you
        an error saying that you need value to be defined. You do not. PR's to
        fix this welcome. The reason we do this is because by using
        textComponentsProps, we can use nested text styles and everything just
        works. Example
      </Text>

      <AddWordInput
        addWord={addWord}
        setInputValue={setInputValue}
        inputValue={inputValue}
        fetchCopiedText={fetchCopiedText}
      />
      <VStack space={2}>
        {(list as Definition[])?.map((item, index) => {
          return (
            <WordList
              key={index}
              index={index}
              item={item}
              handleDefinitionButton={handleDefinitionButton}
            />
          )
        })}
      </VStack>
      <DefinitionModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        definition={definition}
        IsWordInDb={IsWordInDb}
      />
    </Flex>
  )
}
