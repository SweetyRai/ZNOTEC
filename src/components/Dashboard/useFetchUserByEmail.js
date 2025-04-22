// hooks/useFetchUserByEmail.js
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/userSlice';

const useFetchUserByEmail = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const ENV_MODE = process.env.REACT_APP_ENV_MODE;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const fetchUser = async () => {
    if (!user?.email) {
      console.warn('User email not found in Redux');
      return;
    }

    try {
      const res = await fetch(API_URL+'/private/api/user-by-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await res.json();

      if (res.ok) {
        const token = sessionStorage.getItem('token');
        dispatch(setUser({ user: data, token }));
        console.log('✅ Redux updated with latest user data:', data);
      } else {
        console.error('❌ Failed to fetch user data:', data.message);
      }
    } catch (err) {
      console.error('⚠️ Fetch user error:', err);
    }
  };

  return fetchUser;
};

export default useFetchUserByEmail;
