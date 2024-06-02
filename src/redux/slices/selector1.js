import { createSelector } from '@reduxjs/toolkit';

export const selectContactsFilter = state => state.contactsFilter.value;
export const selectContacts = state => state.contacts.items;
export const selectContactsStatus = state => state.contacts.status;
export const selectContactsError = state => state.contacts.error;
export const selectUser = state => state.auth.userToken;
export const selectIsAuthenticated = state =>
  state.auth.isAuthenticated || false;

export const selectFilteredcontacts = createSelector(
  [selectContacts, selectContactsFilter],
  (list, searchTerm) => {
    return searchTerm.length > 0
      ? list.filter(el => el.firstName.includes(searchTerm))
      : list;
  }
);
