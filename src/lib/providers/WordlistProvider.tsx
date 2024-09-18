import { QueryData } from '@supabase/supabase-js'
import { useToast } from 'native-base'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { supabase } from './SupabaseProvider'
import { Database } from '../../../supabase/database.types'
import { utils } from '../../lib/utils/index'
import { Definition, DefinitionInsert } from '../../types'

export interface WordlistContextProps {
  list: Definition[] | Definition
  // setWordToSearchVar: (word: Definition['word']) => void
  // IsWordInDb?: boolean
  addWord: (word: Definition['word']) => void
  definition: Definition[] | Definition | DefinitionInsert
  modalVisible: boolean
  setModalVisible: (value: boolean) => void
  handleWordToSearch: (word: Definition['word']) => void
}
interface WordlistProviderProps {
  children: React.ReactNode
  testID: string
}

const WordlistContext = createContext<WordlistContextProps>({
  addWord: () => {},
  list: [],
  // setWordToSearchVar: () => {},
  definition: [],
  modalVisible: false,
  setModalVisible: () => {},
  handleWordToSearch: () => {},
})

export function WordlistProvider({ children }: WordlistProviderProps) {
  // utils
  const toast = useToast()

  // states
  const [list, setList] = useState<Definition[] | Definition>([])
  // const [wordToSearchVar, setWordToSearchVar] = useState<
  //   Definition['word'] | undefined
  // >(undefined)
  // const [IsWordInDb, setIsWordInDb] = useState<boolean | undefined>(undefined)
  const [definition, setDefinition] = useState<
    Definition[] | Definition | DefinitionInsert
  >([])
  const [modalVisible, setModalVisible] = useState(false)

  // supabase fetch
  const fetchWords = async () => {
    const { data } = await supabase.from('definition').select('*')

    if (data) {
      setList(data as QueryData<Database>)
    }
  }

  // handles
  // const checkWordInDb = (word: Definition['word']) => {
  //   const { wordInList, wordToSearch } = utils.UseIsWordInDb({ list, word })

  //   // setIsWordInDb(!!wordInList)
  //   // setWordToSearchVar(wordToSearch)
  //   if (wordInList) {
  //     setDefinition(wordInList)
  //   }
  // }

  const handleInsert = (def: Definition[]) => {
    const { definitionObject, meaningsArray, definitionsMapped } =
      utils.UseDictMapper({ def })

    utils.UseInsertDefToTable({
      definitionObject,
      meaningsArray,
      definitionsMapped,
    })
  }

  const handleWordToSearch = async (word: Definition['word']) => {
    // checkWordInDb(word)
    // if (IsWordInDb) {
    //   setModalVisible(true)
    // } else {
    // Use wordToSearchVar to fetch the definition from the external API
    const defFromApi: Definition[] = await utils.fetchDict(word)

    if (defFromApi[0]?.title === 'No Definitions Found') {
      console.log('No Definitions Found')
      // toast.show({ title: 'No Definitions Found' })
    } else {
      setModalVisible(true)
      setDefinition(defFromApi)
      handleInsert(defFromApi)
    }
    // }
  }

  const addWord = async (word: Definition['word']) => {
    if (word === '') {
      toast.show({
        title: 'Please Enter Text',
      })
      return
    }

    try {
      // Insert the word into the Supabase database
      const { error } = await supabase.from('definition').insert([{ word }])

      if (error) {
        console.error('Supabase Insert Error:', error)
        toast.show({
          title: 'Error Adding Word',
          description: error.message,
        })
        return
      }

      // Refetch the word list after adding a new word
      await fetchWords()

      toast.show({
        title: 'Word Added Successfully',
      })
    } catch (e) {
      console.error('Add Word Failed:', e)
      toast.show({
        title: 'An unexpected error occurred',
      })
    }
  }

  // lifecycle methods
  useEffect(() => {
    fetchWords()
  }, [list])

  const value = useMemo(() => {
    return {
      addWord,
      list,
      // IsWordInDb,
      // setWordToSearchVar,
      definition,
      modalVisible,
      setModalVisible,
      handleWordToSearch,
    }
  }, [list, addWord, handleInsert, definition, modalVisible])

  return (
    <WordlistContext.Provider value={value}>
      {children}
    </WordlistContext.Provider>
  )
}

export function useWordlistContext() {
  const context = useContext(WordlistContext)
  if (context === undefined) {
    throw new Error('useWordlistContext must be used within a WordlistProvider')
  }
  return context
}
