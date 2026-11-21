import { createSelector } from "@reduxjs/toolkit";
import { contactsAdapter } from "./contacts/slice";

// Базові селектори адаптера працюють з нормалізованим станом
// (state.contacts = { ids, entities, isLoading, error }).
const contactsSelectors = contactsAdapter.getSelectors(
  (state) => state.contacts
);

// Масив контактів у порядку ids — інтерфейс для компонентів не змінився.
export const selectContacts = contactsSelectors.selectAll;
export const selectContactsById = contactsSelectors.selectEntities;
export const selectContactById = contactsSelectors.selectById;
export const selectContactsTotal = contactsSelectors.selectTotal;

export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectError = (state) => state.contacts.error;
export const selectFilter = (state) => state.filter;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    const query = filter.toLowerCase().trim();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(query)
    );
  }
);
