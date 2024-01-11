export interface Definition {
  word: string
  phonetic: string
  phonetics: Phonetics[]
  license: License
  meanings: Meanings[]
  sourceUrls: string[]
  title?: string
}

export type Phonetics = {
  audio: string
  license: License
  sourceUrl: string
  text: string
}

export type License = {
  name: string
  url: string
}

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'pronoun'
  | 'preposition'
  | 'conjunction'
  | 'interjection'
  | 'abbreviation'
  | 'prefix'
  | 'suffix'

export type Meanings = {
  partOfSpeech: PartOfSpeech
  definitions: Definitions[]
  antonyms: string[]
  synonyms: string[]
}

export type Definitions = {
  definition: string
  synonyms: string[]
  antonyms: string[]
}
