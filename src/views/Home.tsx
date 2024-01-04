import * as React from 'react';
import { Box, Flex, Input, Text, Button, VStack, HStack, useToast, Modal } from 'native-base';
import { useDictSearch } from '../utils/useDictSearch';

export const HomeScreen = () => {
  // utils
  const toast = useToast();
  const fetchDict = useDictSearch({ word: 'test' });


  // definitions
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    fetchDict.fetchDict('test');
  }, []);


  // word list
  const wordList = []

  const [list, setList] = React.useState(wordList);
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

    return (
          <Flex flexDirection="column" justifyContent="center" align='center' w="100%" h="100%" >
              <Text margin={1}>Home!</Text>
                <Box flexDirection="row" justifyContent="center" w="90%" >
                  <Input placeholder='word to add' w="50%" m={1} value={inputValue} onChangeText={v => setInputValue(v)}   />
                  <Button m={1} onPress={() => {
                    addItem(inputValue);
                    setInputValue("");
                  }}  >Add</Button>
                </Box>
              
                <VStack space={2}>
                  {list.map((item, index) => 
                    <HStack w="100%" justifyContent="space-between" alignItems="center">
                      <Text textAlign="left"  key={index} margin={1}>{item}</Text>
                      <Button size="sm" onPress={() => setModalVisible(true)} >See definition</Button>
                    </HStack>
                  )}
                </VStack>
                <Modal  isOpen={modalVisible} onClose={() => setModalVisible(false)} >
                    <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Contact Us</Modal.Header>
                    </Modal.Content>
                </Modal>
          </Flex>
      );
}