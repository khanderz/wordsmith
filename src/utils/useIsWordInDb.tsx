import { Definition } from '../types'

interface IsWordInDb {
  list: Definition[] | Definition
  word: Definition['word']
}

export const UseIsWordInDb = ({ list, word }: IsWordInDb) => {
  const wordToSearch = word

  const wordInList = (list as Definition[])?.find(
    (item: Definition) => item.word === wordToSearch,
  )

  return { wordInList, wordToSearch }
}
