import { Box, Flex, Input, Text, Button, FlatList, VStack, useToast } from 'native-base';
import * as React from 'react';

export const HomeScreen = () => {
  const toast = useToast();
  const wordList = []

  const [list, setList] = React.useState(wordList);
  const [inputValue, setInputValue] = React.useState('');

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
          <VStack>
{list.map((item, index) => 
  <Text key={index} margin={1}>{item}</Text>
)}
          </VStack>
          </Flex>
      );
}