import { Box, Flex, Input, Text, Button } from 'native-base';
import * as React from 'react';

export const HomeScreen = () => {
const handleAdd =() => {
    console.log('add')
}
    return (
          <Flex flexDirection="column" justifyContent="center" align='center' w="100%" h="100%" >
          <Text margin={1}>Home!</Text>
          <Box flexDirection="row" justifyContent="center" w="90%" >
          <Input placeholder='word to add' w="50%" m={1} />
          <Button m={1} onPress={handleAdd} >Add</Button>
          </Box>
          </Flex>
      );
}