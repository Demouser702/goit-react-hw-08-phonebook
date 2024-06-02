import { Input, InputGroup } from '@chakra-ui/react';
import React from 'react';

function EmailInput() {
  return (
    <InputGroup size="md">
      <Input pr="4.5rem" placeholder="Enter email" />
    </InputGroup>
  );
}
export default EmailInput;
