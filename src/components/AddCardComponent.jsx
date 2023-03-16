import { Flex, Button, Input } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';

const AddCardComponent = ({ addCard }) => {
  const [title, setTitle] = useState('');

  return (
    <Flex flex="3" padding="5">
      <Flex flex="1" bg="white" borderRadius="md" boxShadow="md" flexDirection="row" p={2}>
        <Input mt={2} placeholder="Task" value={title} onChange={(e) => setTitle(e.target.value)} />

        <Button
          ml={1}
          mt={2}
          colorScheme="green"
          onClick={() => {
            addCard(title);
            setTitle('');
          }}
        >
          <AddIcon boxSize={5} />
        </Button>
      </Flex>
    </Flex>
  );
};

export default AddCardComponent;
