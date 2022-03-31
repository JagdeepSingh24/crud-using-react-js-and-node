import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const LogInGuard = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/dashboard');
    }
  }, []);
  return <props.component />
}

export default LogInGuard;
