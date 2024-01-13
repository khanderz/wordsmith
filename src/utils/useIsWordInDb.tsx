import { Definition } from '../types'

interface IsWordInDb {
  index: number
  list: Definition[] | Definition
  word: Definition[] | Definition
}

export const UseIsWordInDb = ({ index, list, word }: IsWordInDb) => {
  const wordToSearch = list[index]
  console.log({ wordToSearch })

  const wordInList = (word as Definition[])?.find(
    (item: Definition) => item.word === wordToSearch.word,
  )
  return { wordInList, wordToSearch }
}
