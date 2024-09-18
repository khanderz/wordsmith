import { Definition, DefinitionInsert, MeaningsInsert } from '../../types'

interface DictMapperProps {
  def: Definition[]
}

export const UseDictMapper = ({ def }: DictMapperProps) => {
  const definitionObject = {} as DefinitionInsert
  const meaningsArray = [] as MeaningsInsert[]

  for (let i = 0; i < def.length; i++) {
    const { license, meanings, phonetic, phonetics, sourceUrls, word } = def[i]

    const { name, url } = license
    const { name: phonName, url: phonUrl } = phonetics[0].license ?? {
      name: '',
      url: '',
    }
    const sourceUrlPhonetics = phonetics[0].sourceUrl
    const text = phonetics[0].text
    const audio = phonetics[0].audio

    definitionObject.license = { name, url, word }
    definitionObject.word_source_urls = sourceUrls
    definitionObject.phonetic = phonetic
    definitionObject.phonetics = {
      phonetics_license: { name: phonName, url: phonUrl, word },
      phonetics_source_url: sourceUrlPhonetics,
      phonetics_text: text,
      phonetics_audio: audio,
      word,
    }
    definitionObject.word = word

    for (let j = 0; j < meanings.length; j++) {
      const { definitions, partOfSpeech, antonyms, synonyms } = meanings[j]
      meaningsArray.push({
        meanings_partofspeech: partOfSpeech,
        meanings_antonyms: antonyms,
        meanings_synonyms: synonyms,
        meanings_definitions: [],
        word,
      })
      for (let k = 0; k < definitions.length; k++) {
        const {
          definition,
          synonyms: defSynonyms,
          antonyms: defAntonyms,
        } = definitions[k]
        meaningsArray[j].meanings_definitions.push({
          word,
          definition,
          definition_synonyms: defSynonyms,
          definition_antonyms: defAntonyms,
        })
      }
    }
  }

  definitionObject.word_meanings = meaningsArray

  const definitionsMapped = meaningsArray
    .map((item) => item.meanings_definitions)
    .flat()

  return { definitionObject, meaningsArray, definitionsMapped }
}
