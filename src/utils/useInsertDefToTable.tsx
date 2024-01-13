import { supabase } from '../clients/supabase'
import {
  DefinitionInsert,
  MeaningsInsert,
  Definition,
  DefinitionsInsert,
} from '../types'

interface InsertDefToTableProps {
  definitionObject: DefinitionInsert
  meaningsArray: MeaningsInsert[]
  definitionsMapped: DefinitionsInsert[]
}

export const UseInsertDefToTable = async ({
  definitionObject,
  meaningsArray,
  definitionsMapped,
}: InsertDefToTableProps) => {
  const { data, error } = await supabase
    .from('definition')
    .insert(definitionObject)

  await supabase.from('meanings').insert(meaningsArray)
  await supabase.from('phonetics').insert(definitionObject.phonetics)
  await supabase.from('license').insert(definitionObject.license)
  await supabase
    .from('license')
    .insert(definitionObject.phonetics.phonetics_license)
  await supabase.from('definitions').insert(definitionsMapped)

  return { data, error }
}
