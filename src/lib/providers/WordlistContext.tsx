import { QueryError, QueryData } from '@supabase/supabase-js'
import { useToast } from 'native-base'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { supabase } from './supabaseProvider'
import { Database } from '../../../supabase/database.types'
import { utils } from '../../lib/utils/index'
import { Definition } from '../../types'

interface WordlistContextProps {
  addWord: (word: Definition['word']) => void
  list: Definition[] | Definition | undefined
  IsWordInDb?: boolean
  wordToSearchVar?: string
}
interface WordlistProviderProps {
  children: React.ReactNode
}

const WordlistContext = createContext<WordlistContextProps>({
  addWord: () => {},
  list: [],
  IsWordInDb: false,
  wordToSearchVar: '',
})

export function WordlistProvider({ children }: WordlistProviderProps) {
  let IsWordInDb: boolean | undefined = undefined
  let wordToSearchVar: string | undefined = undefined

  // utils
  const toast = useToast()

  // word list
  const [list, setList] = useState<Definition[] | Definition | undefined>([])
  console.log({ list })
  // supabase fetch
  const [fetchError, setFetchError] = useState<QueryError | null>(null)

  const fetchWords = async () => {
    const { data, error } = await supabase.from('definition').select('*')

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

  // handles
  const addWord = (word: Definition['word']) => {
    const { wordInList, wordToSearch } = utils.UseIsWordInDb({ list, word })

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

  // lifecycle methods
  useEffect(() => {
    fetchWords()
  }, [])

  const value = useMemo(() => {
    return {
      addWord,
      list,
      IsWordInDb,
      wordToSearchVar,
    }
  }, [])

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
