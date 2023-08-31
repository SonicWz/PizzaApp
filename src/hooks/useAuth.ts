import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from './redux';

export const useAuth = () => {
  
  const {email, error} = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (email){
      navigate('/');
    }
    if (!email){
      navigate('/auth');
    }
  }, [email]);
  
  return [email, error];
}