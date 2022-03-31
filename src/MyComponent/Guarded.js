import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';


const Guarded = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/auth/login');
    }
  }, []);
  return <props.component />
}

export default Guarded;