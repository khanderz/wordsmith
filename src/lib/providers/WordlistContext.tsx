import { QueryError, QueryData } from '@supabase/supabase-js'
import { useToast } from 'native-base'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { supabase } from './supabaseProvider'
import { Database } from '../../../supabase/database.types'
import { utils } from '../../lib/utils/index'
import { Definition } from '../../types'

export interface WordlistContextProps {
  addWord: (word: Definition['word']) => void
  list: Definition[] | Definition | undefined
  IsWordInDb?: boolean
  wordToSearchVar?: string
  setWordToSearchVar: (word: string) => void
}
interface WordlistProviderProps {
  children: React.ReactNode
}

const WordlistContext = createContext<WordlistContextProps>({
  addWord: () => {},
  list: [],
  IsWordInDb: false,
  wordToSearchVar: '',
  setWordToSearchVar: () => {},
})

export function WordlistProvider({ children }: WordlistProviderProps) {
  // utils
  const toast = useToast()

  // word list
  const [list, setList] = useState<Definition[] | Definition | undefined>([])
  const [wordToSearchVar, setWordToSearchVar] = useState<string | undefined>(
    undefined,
  )
  const [IsWordInDb, setIsWordInDb] = useState<boolean | undefined>(undefined)

  // supabase fetch
  const [fetchError, setFetchError] = useState<QueryError | null>(null)

  const fetchWords = async () => {
    const { data, error } = await supabase.from('definition').select('*')

    if (error) {
      setFetchError(error)
      setList(undefined)
      return
    }
    if (data) {
      setList(data as QueryData<Database>)
      setFetchError(null)
    }
  }

  // handles
  const addWord = async (word: Definition['word']) => {
    const { wordInList, wordToSearch } = utils.UseIsWordInDb({ list, word })

    setIsWordInDb(!!wordInList)
    setWordToSearchVar(wordToSearch)

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

    // Insert the word into the Supabase database
    const { error } = await supabase.from('definition').insert([{ word }])

    if (error) {
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
  }

  // lifecycle methods
  useEffect(() => {
    fetchWords()
  }, [])

  // Re-fetch data whenever the list changes
  useEffect(() => {
    fetchWords()
  }, [list])

  const value = useMemo(() => {
    return {
      addWord,
      list,
      IsWordInDb,
      wordToSearchVar,
      setWordToSearchVar,
    }
  }, [list, IsWordInDb, wordToSearchVar])

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
