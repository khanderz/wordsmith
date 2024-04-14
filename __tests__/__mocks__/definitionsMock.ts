import { Definition, DefinitionInsert } from '../../src/types'

export const mockDefinitionsData: DefinitionInsert[] = [
  {
    id: 1,
    license: {
      id: null,
      name: 'CC BY-SA 3.0',
      url: 'https://creativecommons.org/licenses/by-sa/3.0',
      word: 'hello',
    },
    // license_id: null,
    // meanings_id: null,
    phonetic: null,
    phonetics: {
      // phonetics_id: null,
      phonetics_audio:
        'https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3',
      phonetics_license: {
        id: null,
        name: 'BY-SA 4.0',
        url: 'https://creativecommons.org/licenses/by-sa/4.0',
        word: 'hello',
      },
      phonetics_source_url:
        'https://commons.wikimedia.org/w/index.php?curid=75797336',
      phonetics_text: null,
      word: 'hello',
    },
    // phonetics_id: null,
    word: 'hello',
    word_meanings: [],
    word_source_urls: ['https://en.wiktionary.org/wiki/hello'],
  },
  {
    id: 14,
    license: {
      id: null,
      name: 'CC BY-SA 3.0',
      url: 'https://creativecommons.org/licenses/by-sa/3.0',
      word: 'value',
    },
    phonetic: '/ˈvæljuː/',
    phonetics: {
      phonetics_audio:
        'https://api.dictionaryapi.dev/media/pronunciations/en/value-us.mp3',
      phonetics_license: {
        id: null,
        name: 'BY-SA 3.0',
        url: 'https://creativecommons.org/licenses/by-sa/3.0',
        word: 'value',
      },
      phonetics_source_url:
        'https://commons.wikimedia.org/w/index.php?curid=1197666',
      phonetics_text: '/ˈvæljuː/',
      word: 'value',
    },
    word: 'value',
    word_meanings: [
      {
        meanings_antonyms: [],
        meanings_definitions: [
          {
            definition:
              'The quality (positive or negative) that renders something desirable or valuable.',
            definition_antonyms: [],
            definition_synonyms: [],
            word: 'value',
          },
          {
            definition:
              "That which is valued or highly esteemed, such as one's morals, morality, or belief system.",
            definition_antonyms: [],
            definition_synonyms: [],
            word: 'value',
          },
          {
            definition:
              'The amount (of money or goods or services) that is considered to be a fair equivalent for something else.',
            definition_antonyms: [],
            definition_synonyms: [],
            word: 'value',
          },
          {
            definition: 'The relative duration of a musical note.',
            definition_antonyms: [],
            definition_synonyms: [],
            word: 'value',
          },
          {
            definition:
              'The relative darkness or lightness of a color in (a specific area of) a painting etc.',
            definition_antonyms: [],
            definition_synonyms: [],
            word: 'value',
          },
          {
            definition:
              'Any definite numerical quantity or other mathematical object, determined by being measured, computed, or otherwise defined.',
            definition_antonyms: [],
            definition_synonyms: [],
            word: 'value',
          },
          {
            definition: 'Precise meaning; import.',
            definition_antonyms: [],
            definition_synonyms: [],
            word: 'value',
          },
          {
            definition:
              '(in the plural) The valuable ingredients to be obtained by treating a mass or compound; specifically, the precious metals contained in rock, gravel, etc.',
            definition_antonyms: [],
            definition_synonyms: [],
            word: 'value',
          },
          {
            definition: 'Esteem; regard.',
            definition_antonyms: [],
            definition_synonyms: [],
            word: 'value',
          },
          {
            definition: 'Valour; also spelled valew.',
            definition_antonyms: [],
            definition_synonyms: [],
            word: 'value',
          },
        ],
        meanings_partofspeech: 'noun',
        meanings_synonyms: ['valence', 'worth'],
        word: 'value',
      },
      {
        meanings_antonyms: [
          'belittle',
          'derogate',
          'despise',
          'disesteem',
          'disrespect',
        ],
        meanings_definitions: [
          {
            definition:
              'To estimate the value of; judge the worth of something.',
            definition_antonyms: [],
            definition_synonyms: [],
            word: 'value',
          },
          {
            definition:
              'To fix or determine the value of; assign a value to, as of jewelry or art work.',
            definition_antonyms: [],
            definition_synonyms: [],
            word: 'value',
          },
          {
            definition:
              'To regard highly; think much of; place importance upon.',
            definition_antonyms: [],
            definition_synonyms: [],
            word: 'value',
          },
          {
            definition: 'To hold dear.',
            definition_antonyms: [],
            definition_synonyms: [],
            word: 'value',
          },
        ],
        meanings_partofspeech: 'verb',
        meanings_synonyms: [
          'appreciate',
          'assess',
          'esteem',
          'prize',
          'rate',
          'respect',
          'treasure',
          'valuate',
          'worthen',
        ],
        word: 'value',
      },
    ],
    word_source_urls: ['https://en.wiktionary.org/wiki/value'],
  },
]
