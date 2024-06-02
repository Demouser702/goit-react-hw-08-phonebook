import React from 'react';
import { Box, Button } from '@chakra-ui/react';

const ContactListItem = ({ contact, onDeleteContact }) => {
  const { id, name, phone } = contact;

  const handleDeleteClick = () => {
    onDeleteContact(id);
  };

  return (
    <Box bg="tomato" w="100%" p={2} color="white">
      <Box bg="tomato" w="100%" p={1} color="white">
        {name}: {phone}
      </Box>
      <Button type="submit" colorScheme="blue" onClick={handleDeleteClick}>
        Delete
      </Button>
    </Box>
  );
};

export default ContactListItem;
