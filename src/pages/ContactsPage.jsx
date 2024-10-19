import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, addContact, deleteContact } from '../redux/operations';
import { setFilter } from '../redux/filterSlice';
import {
  selectVisibleContacts,
  selectIsLoading,
  selectFilter,
  selectError,
} from '../redux/selector';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import {
  Box,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Table,
  Tr,
  Td,
  Tbody,
  Th,
  Thead,
} from '@chakra-ui/react';

export const ContactsPage = () => {
  const visibleContacts = useSelector(selectVisibleContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filter = useSelector(selectFilter);
  const userDetails = useSelector(state => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = newContact => {
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleSetFilter = newFilter => {
    dispatch(setFilter(newFilter));
  };

  return (
    <Box p={5}>
      {userDetails && (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Currency</Th>
              <Th>Total Expenses</Th>
              <Th>Total Incomes</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{userDetails.name}</Td>
              <Td>{userDetails.email}</Td>
              <Td>{userDetails.currency}</Td>
              <Td>{userDetails.transactionsTotal?.expenses || 0}</Td>
              <Td>{userDetails.transactionsTotal?.incomes || 0}</Td>
            </Tr>
          </Tbody>
        </Table>
      )}

      {/* <ContactForm addContact={handleAddContact} contacts={visibleContacts} /> */}

      {/* <Filter filter={filter} setFilter={handleSetFilter} /> */}

      {isLoading && (
        <Box display="flex" alignItems="center" mt={4}>
          <Spinner size="lg" />
          <Text ml={4}>Loading...</Text>
        </Box>
      )}

      {error && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {`Error: ${error}`}
        </Alert>
      )}

      {/* {visibleContacts && (
        <ContactList
          contacts={visibleContacts}
          deleteContact={handleDeleteContact}
        />
      )} */}
    </Box>
  );
};
