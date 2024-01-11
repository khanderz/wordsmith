export interface Definition {
  id?: string;
  word: string;
  phonetic: string;
  phonetics: Phonetics[];
  license: License;
  meanings: Meanings[];
  sourceUrls: string[];
  title?: string;
}

export interface DefinitionInsert {
  word: string;
  phonetic: string;
  phonetics: Phonetics;
  license: License;
  word_meanings: Meanings[];
  word_source_urls: string[];
}

export interface MeaningsInsert {
  meanings_partofspeech: PartOfSpeech;
  meanings_definitions: DefinitionsInsert[];
  meanings_synonyms: Meanings["synonyms"];
  meanings_antonyms: Meanings["antonyms"];
}

export interface DefinitionsInsert {
  definition: Definitions["definition"];
  definition_synonyms: Definitions["synonyms"];
  definition_antonyms: Definitions["antonyms"];
}

export type Phonetics = {
  id?: string;
  audio?: string;
  license?: License;
  sourceUrl?: string;
  text?: string;
};

export type License = {
  id?: string;
  name: string;
  url: string;
};

export type PartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "pronoun"
  | "preposition"
  | "conjunction"
  | "interjection"
  | "abbreviation"
  | "prefix"
  | "suffix";

export type Meanings = {
  id?: string;
  partOfSpeech: PartOfSpeech;
  definitions: Definitions[];
  antonyms?: string[];
  synonyms?: string[];
};

export type Definitions = {
  id?: string;
  definition: string;
  synonyms: string[];
  antonyms: string[];
};

export type WordList = {
  id: string;
  title: string;
  words: Definition[];
};

export type WordInsertInput = {
  wordName: string;
  wordPhonetic: string;
  wordPhonetics: Phonetics[];
  wordLicense: License;
  wordSourceUrls: string[];
  wordMeanings: Meanings[];
  wordDefinitions: Definitions[];
};
