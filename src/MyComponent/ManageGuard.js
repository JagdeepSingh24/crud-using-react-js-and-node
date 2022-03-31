import React from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ManageGuard = (props) => {
    const [type, setType] = useState("");
    const history = useHistory();
    const checked = () => {
        axios.post('http://localhost:3000/token', {
            token: localStorage.getItem('token')
        })
            .then(function (response) {
                
                setType(response.data[0].account_type)
                if(response.data[0].account_type =='user'){
                    
                    history.push('/dashboard');
                    
                  }
            })
            .catch(function (error) {
                localStorage.clear()
                history.push('/auth/login');
            });
    }
    console.log("type",type);
    useEffect(async () => {
      await checked();
      
      
    }, []);
    return <props.component />
}

export default ManageGuard;
