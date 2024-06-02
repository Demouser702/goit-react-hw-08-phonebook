import { createSelector } from '@reduxjs/toolkit';

export const selectContactsFilter = state => state.filter;
export const selectContacts = state => state.contacts.items;
export const selectContactsStatus = state => state.contacts.status;
export const selectContactsError = state => state.contacts.error;
export const selectUser = state => state.auth.user; // Updated to select the user object
export const selectIsAuthenticated = state =>
  state.auth.isAuthenticated || false;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectContactsFilter],
  (list, searchTerm) => {
    return searchTerm.length > 0
      ? list.filter(el => el.firstName.includes(searchTerm))
      : list;
  }
);
