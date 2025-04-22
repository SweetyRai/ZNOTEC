// redux/adminSlice.js
import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    admin: null,
    isAuthenticated: false,
    token: null,
  },
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logoutAdmin: (state) => {
      state.admin = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
