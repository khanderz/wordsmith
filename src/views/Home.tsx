import { QueryData, QueryError } from '@supabase/supabase-js'
import * as Clipboard from 'expo-clipboard'
import { Flex, VStack, useToast } from 'native-base'
import * as React from 'react'
import { Button, Text, Image } from 'react-native'

import { Database } from '../../supabase/database.types'
import { supabase } from '../clients/supabase'
import { WordList } from '../components/Display/Wordlist'
import { DefinitionModal } from '../components/Feedback/DefinitionModal'
import { AddWordInput } from '../components/Inputs/AddWordInput'
import useShareIntent from '../hooks/useShareIntent'
import { Definition, DefinitionInsert } from '../types'
import { UseDictMapper } from '../utils/useDictMapper'
import { fetchDict } from '../utils/useDictSearch'
import { UseInsertDefToTable } from '../utils/useInsertDefToTable'
import { UseIsWordInDb } from '../utils/useIsWordInDb'

let IsWordInDb: boolean | undefined = undefined
let wordToSearchVar: string | undefined = undefined

export const HomeScreen = () => {
  // sharing intent
  const { shareIntent, resetShareIntent, text } = useShareIntent()

  React.useEffect(() => {
    if (text) {
      setInputValue(text)
      resetShareIntent()
    }
  }, [text])

  // utils
  const toast = useToast()

  // definitions
  const [modalVisible, setModalVisible] = React.useState(false)
  const [definition, setDefinition] = React.useState<
    Definition[] | Definition | DefinitionInsert
  >([])

  // word list
  const [list, setList] = React.useState<Definition[] | Definition | undefined>(
    [],
  )
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
    console.log({ data })
    if (error) {
      setFetchError(error)
      setList(undefined)
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
    //@ts-ignore
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
      // setDefinition(IsWordInDb)
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
    wordToSearchVar = list?.[index].word
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
      <AddWordInput
        testID="add-word-input"
        addWord={addWord}
        //@ts-ignore
        setInputValue={setInputValue}
        inputValue={inputValue}
        fetchCopiedText={fetchCopiedText}
      />
      <VStack space={2}>
        {(list as Definition[])?.map((item, index) => {
          return (
            <WordList
              testID="word-list"
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
