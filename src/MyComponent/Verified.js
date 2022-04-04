import axios from 'axios';
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Verified = () => {
    const queryParams = new URLSearchParams(window.location.search);
    let token = queryParams.get('token');
    const history = useHistory();


    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        let token = queryParams.get('token');
        console.log("token====>>>>", token)
        if (token === null) {
          console.log("null")
          history.push("/auth/invalid");
        } else {
          console.log("not null");
          verify(token);
        }
      }, []);

      const verify=(token)=>{
        console.log("here");
          axios.put("http://localhost:3000/verify",{
              token:token,
          })
          .then((response) => {
            console.log(response);
            toast('Account Verified', {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          });
            history.push("/auth/login");
          })
          .catch(function (error) {
            console.log(">>>>>>",error);
            history.push("/auth/invalid");
          });
      }
  return (
    <div>Verified</div>
  )
}

export default Verified