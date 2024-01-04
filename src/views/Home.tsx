import * as React from 'react';
import { Box, Flex, Input, Text, Button, VStack, HStack, useToast, Modal } from 'native-base';
import { useDictSearch } from '../utils/useDictSearch';

export const HomeScreen = () => {
  // utils
  const toast = useToast();
  const fetchDict = useDictSearch();

  // definitions
  const [modalVisible, setModalVisible] = React.useState(false);
  const [definition, setDefinition] = React.useState('');

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
    setModalVisible(true)
    handleWordToSearch(index)
  }

  const handleWordToSearch = async (index: number) => {
    const wordToSearch = list[index]
   const def = await fetchDict.fetchDict(wordToSearch);
    console.log(def)
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
                      <Text>{definition}</Text>
                    </Modal.Body>
                    </Modal.Content>
                </Modal>
          </Flex>
      );
}