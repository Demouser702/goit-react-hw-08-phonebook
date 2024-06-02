import React from 'react';
import ContactListItem from './ContactListItem';
import { Box } from '@chakra-ui/react';

const ContactList = ({ list, onDeleteContact }) => {
  console.log('Rendering ContactList with contacts:', list);

  return (
    <Box w="100%" p={4} color="white">
      {list.map(contact => (
        <ContactListItem
          key={contact.id}
          contact={contact}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </Box>
  );
};

export default ContactList;
