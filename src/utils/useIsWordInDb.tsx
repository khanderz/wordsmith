import { Definition } from '../types'

interface IsWordInDb {
  list: Definition[] | Definition | undefined
  word: Definition['word'] | undefined
}

export const UseIsWordInDb = ({ list, word }: IsWordInDb) => {
  const wordToSearch = word

  const wordInList = (list as Definition[])?.find(
    (item: Definition) => item.word === wordToSearch,
  )

  return { wordInList, wordToSearch }
}
