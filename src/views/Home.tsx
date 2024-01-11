import * as React from 'react';
import { Box, Flex, Input, Text, Button, VStack, HStack, useToast, Modal } from 'native-base';
import { useDictSearch } from '../utils/useDictSearch';
import { Definition } from '../types';
import { supabase } from '../lib/supabase';
import { Database } from '../../supabase/database.types';
import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js'

export const HomeScreen = () => {
// supabase fetch
const [fetchError, setFetchError] = React.useState<QueryError | null>(null);
const [words, setWords] = React.useState<QueryData<Database> | null>(null);

React.useEffect(() => {
  const fetchWords = async () => {
    const { data, error } = await supabase.from('word').select('*')
      if (error) {
        setFetchError(error)
        setWords(null)
        console.log(fetchError)
        return
      }
      if (data) {
        setWords(data as QueryData<Database>)
        setFetchError(null)
      }
  };
  fetchWords()
}, [])

// supabase mutation 
 const handleSubmit = async () => {
 }

  // utils
  const toast = useToast();
  const fetchDict = useDictSearch();

  // definitions
  const [modalVisible, setModalVisible] = React.useState(false);
  const [definition, setDefinition] = React.useState<Definition[] | Definition>([]);

  // word list
  const [list, setList] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');


  // handles
  const addItem = title => {
    const isExist = list.find(item => item === title);
    if (isExist) {
      toast.show({
        title: "Word Already Exists",
      });
      return;
    }

    if (title === "") {
      toast.show({
        title: "Please Enter Text",
      });
      return;
    }

    setList(prevList => {
      return [...prevList, title];
    });
  };

  const handleDefinitionButton =(index: number) => {
    handleWordToSearch(index)
  }

  const handleWordToSearch = async (index: number) => {
    const wordToSearch = list[index]
   const def : Definition[] | Definition = await fetchDict.fetchDict(wordToSearch);

   if ((def as Definition).title === 'No Definitions Found') {
      toast.show({
        title: "No Definitions Found",
      });
      return;
   } else {
    setModalVisible(true)
    setDefinition(def)
   }
  }

    return (
          <Flex flexDirection="column" justifyContent="center" align='center' w="100%" h="100%" >
              <Text margin={1}>Home!</Text>
                <Box flexDirection="row" justifyContent="center" w="90%" >
                  <Input aria-label='input-box' placeholder='word to add' w="50%" m={1} value={inputValue} onChangeText={v => setInputValue(v)}   />
                  <Button aria-label='add-button' m={1} onPress={() => {
                    addItem(inputValue);
                    setInputValue("");
                  }}  >Add</Button>
                </Box>
              
                <VStack space={2}>
                  {list.map((item, index) => 
                    <HStack key={index}  w="100%" justifyContent="space-between" alignItems="center">
                      <Text key={index}  aria-label={`vocab-word-${index}`} textAlign="left"  margin={1}>{item}</Text>
                      <Button  aria-label='definition-button' size="sm" onPress={() => handleDefinitionButton(index)} >See definition</Button>
                    </HStack>
                  )}
                </VStack>
                <Modal aria-label='definition-modal' isOpen={modalVisible} onClose={() => setModalVisible(false)} >
                    <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Definition</Modal.Header>
                    <Modal.Body>
                     <VStack space={2}>
                      {(definition as Definition[]).map((item, definitionIndex) => 
                        item.meanings.map((meaning, meaningIndex) =>
                          meaning.definitions.map((def, defIndex) => 
                          def.definition
                          )
                        )
                      )}
                     </VStack>
                      {/* {definition.map((item, index) => {
                        item.meanings.map((meaning, index) => {
                          meaning.definitions.map((def, index) => 
                          def.definition
                        )
                      }
                      )})} */}
                    </Modal.Body>
                    </Modal.Content>
                </Modal>
          </Flex>
      );
}