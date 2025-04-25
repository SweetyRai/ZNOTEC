import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import adminReducer, { setAdmin } from './adminSlice';
import notificationReducer from './notificationSlice';

// Configure store
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    admin: adminReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Optional: Load admin token from localStorage and restore session
const adminToken = localStorage.getItem('adminToken');
const adminData = localStorage.getItem('adminData');

if (adminToken && adminData) {
  try {
    const parsedAdmin = JSON.parse(adminData);
    store.dispatch(setAdmin({ admin: parsedAdmin, token: adminToken }));
  } catch (e) {
    console.error('Error parsing admin data from localStorage:', e);
  }
}

export default store;
