interface Definition {
    word: string;
    phonetic: string;
    phonetics: Phonetics[];
    license: License;
    meanings: Meanings[];
    sourceUrls: string[];
  }

  type Phonetics = {
    audio: string;
    license: License;
    sourceUrl: string;
    text: string;
  }

  type License = {
    name: string;
    url: string;
  }

  type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'pronoun' | 'preposition' | 'conjunction' | 'interjection' | 'abbreviation' | 'prefix' | 'suffix';

  type Meanings = {
    partOfSpeech: PartOfSpeech; 
    definitions: Definitions[];
    antonyms: string[];
    synonyms: string[];
  }

  type Definitions = {
    definition: string;
    synonyms: string[];
    antonyms: string[];
  }