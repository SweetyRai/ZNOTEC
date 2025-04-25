import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  totalMessages: 0,
  newMessages: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
    setNewMessages(state, action) {
      state.newMessages = action.payload;
    },
    resetNewMessages(state) {
      state.newMessages = [];
    },
    setTotalMessages(state, action) {
      state.totalMessages = action.payload;
    },
    clearNewMessages(state) {
      state.newMessages = [];
    },
  },
});

export const {
  setMessages,
  setNewMessages,
  resetNewMessages,
  setTotalMessages,
  clearNewMessages,
} = notificationSlice.actions;

export default notificationSlice.reducer;
