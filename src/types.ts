export interface Definition {
  id?: string | number
  word: string
  phonetic: string | null // TODO null?
  phonetics: Phonetics[]
  license: License
  meanings: Meanings[]
  sourceUrls: string[]
  title?: string
}

export interface DefinitionInsert {
  id?: string | number
  word: Definition['word']
  phonetic: string | null // TODO null?
  phonetics: PhoneticsInsert
  license: License
  word_meanings: MeaningsInsert[]
  word_source_urls: string[]
}

export interface PhoneticsInsert {
  word: Definition['word']
  phonetics_license?: License
  phonetics_source_url?: string
  phonetics_text?: string | null
  phonetics_audio?: string
}

export interface MeaningsInsert {
  word: Definition['word']
  meanings_partofspeech: PartOfSpeech
  meanings_definitions: DefinitionsInsert[]
  meanings_synonyms: Meanings['synonyms']
  meanings_antonyms: Meanings['antonyms']
}

export interface DefinitionsInsert {
  word: Definition['word']
  definition: Definitions['definition']
  definition_synonyms: Definitions['synonyms']
  definition_antonyms: Definitions['antonyms']
}

export type Phonetics = {
  id?: string
  word: Definition['word']
  audio?: string
  license?: License
  sourceUrl?: string
  text?: string
}

export type License = {
  id?: string | number | null // TODO: null?
  name: string
  word: Definition['word']
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
  id?: string
  word: Definition['word']
  partOfSpeech: PartOfSpeech
  definitions: Definitions[]
  antonyms?: string[]
  synonyms?: string[]
}

export type Definitions = {
  id?: string
  definition: Definition['word']
  synonyms: string[]
  antonyms: string[]
}

export type WordList = {
  id: string
  title: string
  words: Definition[]
}

export type WordInsertInput = {
  wordName: Definition['word']
  wordPhonetic: string
  wordPhonetics: Phonetics[]
  wordLicense: License
  wordSourceUrls: string[]
  wordMeanings: Meanings[]
  wordDefinitions: Definitions[]
}

export type UserInsert = {
  user_name: string
  user_email: string
  user_password: string
  user_wordlist: WordList[]
  user_favorite_words: Definition[]
}

export type WordlistInsert = {
  wordlist_name: string
  wordlist_words: Definition[]
}
