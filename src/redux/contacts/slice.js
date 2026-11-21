import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";

// Адаптер нормалізує колекцію контактів у вигляді:
// { ids: ["1", "2"], entities: { "1": {...}, "2": {...} } }
export const contactsAdapter = createEntityAdapter();

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: contactsAdapter.getInitialState({
    isLoading: false,
    error: null,
  }),
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        contactsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchContacts.rejected, handleRejected)

      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        contactsAdapter.addOne(state, action.payload);
      })
      .addCase(addContact.rejected, handleRejected)

      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        contactsAdapter.removeOne(state, action.payload.id);
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
