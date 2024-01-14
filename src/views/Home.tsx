import { QueryData, QueryError } from '@supabase/supabase-js'
import {
  Box,
  Flex,
  Input,
  Text,
  Button,
  VStack,
  HStack,
  useToast,
  Modal,
} from 'native-base'
import * as React from 'react'

import { Database } from '../../supabase/database.types'
import { supabase } from '../clients/supabase'
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
  const [word, setWord] = React.useState<
    QueryData<Database> | Definition[] | Definition
  >([])

  // console.log({ word, list })

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
      setWord(data as QueryData<Database>)
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

    const isExist = (list as Definition[])?.find(
      (item: Definition) => item.word === word,
    )
    if (isExist) {
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
      console.log({ wordToSearchVar })
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

  const handleDefinitionButton = (index: number, word: Definition['word']) => {
    const { wordInList, wordToSearch } = UseIsWordInDb({ list, word })
    IsWordInDb = wordInList
    wordToSearchVar = wordToSearch

    console.log({ IsWordInDb, wordToSearchVar })
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
      <Text margin={1}>Home!</Text>
      <Box flexDirection="row" justifyContent="center" w="90%">
        <Input
          aria-label="input-box"
          placeholder="word to add"
          w="50%"
          m={1}
          value={inputValue}
          onChangeText={(v) => setInputValue(v)}
        />
        <Button
          aria-label="add-button"
          m={1}
          onPress={() => {
            addWord(inputValue)
            setInputValue('')
          }}
        >
          Add
        </Button>
      </Box>

      <VStack space={2}>
        {(list as Definition[])?.map((item, index) => {
          return (
            <HStack
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
              <Button
                aria-label="definition-button"
                size="sm"
                onPress={() => handleDefinitionButton(index, item.word)}
              >
                See definition
              </Button>
            </HStack>
          )
        })}
      </VStack>
      <Modal
        aria-label="definition-modal"
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Definition</Modal.Header>
          <Modal.Body>
            <VStack space={2}>
              <Text>
                {IsWordInDb
                  ? (definition as DefinitionInsert)?.word_meanings?.map(
                      (meaning, meaningIndex) =>
                        meaning?.meanings_definitions?.map(
                          (def, defIndex) => def?.definition,
                        ),
                    )
                  : (definition as Definition[])?.map(
                      (item, definitionIndex) =>
                        item.meanings?.map(
                          (meaning, meaningIndex) =>
                            meaning?.definitions?.map(
                              (def, defIndex) => def?.definition,
                            ),
                        ),
                    )}
              </Text>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Flex>
  )
}
