import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js'
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
import { Definition } from '../types'
import { UseDictMapper } from '../utils/useDictMapper'
import { fetchDict } from '../utils/useDictSearch'
import { UseInsertDefToTable } from '../utils/useInsertDefToTable'

export const HomeScreen = () => {
  // utils
  const toast = useToast()

  // definitions
  const [modalVisible, setModalVisible] = React.useState(false)
  const [definition, setDefinition] = React.useState<Definition[] | Definition>(
    [],
  )

  console.log({ definition })
  // word list
  const [list, setList] = React.useState<Definition[] | Definition>([])
  const [inputValue, setInputValue] = React.useState<Definition['title']>('')
  const [word, setWord] = React.useState<Definition[] | Definition>([])
  console.log({ list })

  // supabase fetch
  const [fetchError, setFetchError] = React.useState<QueryError | null>(null)
  // const [words, setWords] = React.useState<QueryData<Database> | null>(null)

  const fetchWords = async () => {
    const { data, error } = await supabase.from('definition').select('*')
    if (error) {
      setFetchError(error)
      setList(null)
      // console.log(fetchError)
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
      return [{ ...prevList, word }]
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

  const handleWordToSearch = async (index: number) => {
    const wordToSearch = list[index]
    console.log({ wordToSearch })

    const wordInList = (word as Definition[])?.find(
      (item: Definition) => item.word === wordToSearch.word,
    )
    if (wordInList) {
      setDefinition(wordInList)
      setModalVisible(true)
    } else {
      const def: Definition[] = await fetchDict(wordToSearch.word)
      console.log({ def })
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
    handleWordToSearch(index)
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
          // console.log({ item, index })
          return (
            <HStack
              key={index}
              w="100%"
              justifyContent="space-between"
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
                onPress={() => handleDefinitionButton(index)}
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
              {(definition as Definition[])?.map(
                (item, definitionIndex) =>
                  item.meanings?.map(
                    (meaning, meaningIndex) =>
                      meaning?.definitions?.map(
                        (def, defIndex) => def?.definition,
                      ),
                  ),
              )}
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Flex>
  )
}
