import React, { useEffect } from 'react';
import styles from '../ContactForm/ContactForm.module.css';
import { FormLabel } from '@chakra-ui/react';

import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from '../../redux/slices/filterSlice';
import {
  fetchContacts,
  addContact,
  deleteContact,
  selectContacts,
  selectContactsLoading,
} from '../../redux/slices/contactsSlice.js';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectContactsLoading);
  const filter = useSelector(state => state.filter);

  useEffect(() => {
    dispatch(fetchContacts()).catch(error => {
      console.error('Error dispatching fetchContacts:', error);
    });
  }, [dispatch]);

  const handleAddContact = async (name, phone) => {
    const isNameAlreadyExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isNameAlreadyExist) {
      alert(`Contact with name ${name} already exists!`);
    } else {
      try {
        await dispatch(addContact({ name, phone }));
      } catch (error) {
        console.error('Error adding contact:', error);
      }
    }
  };
  const handleSearchChange = e => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = Array.isArray(contacts)
    ? contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  return (
    <div className={styles.addContactContainer}>
      <FormLabel>Phonebook</FormLabel>
      <ContactForm
        onAddContact={(name, phone) => handleAddContact(name, phone)}
      />

      <FormLabel>Contacts</FormLabel>
      {isLoading && <p>Loading contacts...</p>}
      <Filter value={filter} onChange={handleSearchChange} />
      <ContactList
        list={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default ContactsPage;
