import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Form = () => {
  const history = useHistory();
  const [valid, setValid] = useState(false);
  const [data, setData] = useState({
    fname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    let token = queryParams.get('token');
    console.log("token====>>>>", token)
    if (token === null) {
      console.log("null")
      history.push("/auth/login");
    } else {
      console.log("not null")
      tokenvalid(token);
    }
    let error = {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
    setError(error);
    setValid(false);
    return () => {
      let error = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      }
      setError(error);
      setValid(false);
    }
  }, []);

  useEffect(() => {
    validation();
  }, [data.fname, data.email, data.password, data.confirmPassword]);


  const validation = () => {
    let isValid = true;
    let error = {};
    if (!data.fname) {
      error["name"] = "Please Enter name";
      isValid = false;
    } else {
      if (!data.fname.match(/^[a-zA-Z]{1,}[a-zA-Z\s]+$/)) {
        isValid = false;
        error["name"] = "Only letters";
      }
    }


    if (!data.email) {
      error["email"] = "Please Enter Email";
      isValid = false;
    } else {
      if (typeof data.email !== undefined) {
        if (!data.email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
          isValid = false;
          error["email"] = "Invalid email";
        }
      }
    }


    if (!data.password) {
      error["password"] = "Please Enter password";
      isValid = false;
    } else if (data.password.length < 5) {
      error["password"] = "Minimun 5 character required";
    }


    if (!data.confirmPassword) {
      error["confirmPassword"] = "Please Enter Confirm Password";
    } else {
      if (data.confirmPassword.length < 5) {
        error["confirmPassword"] = "Minimun 5 character required";
      } else if (data.confirmPassword !== data.password) {
        error["confirmPassword"] = "Password and Confirm Password Do not match";
      }
    }

    setError(error)
    return isValid;
  }
  const fun = (key, value) => {


    setData((prev) => {

      return {
        ...prev,
        [key]: value
      }
    })
  }

  const tokenvalid = (token) => {
    axios.post("http://localhost:3000/inviteToken", {
      token: token
    })
      .then((response) => {
        console.log(response.data)
        if (response.data == "used" || response.data == "expires") {
          console.log("invalid token")
          // history.push("/auth/login");
          toast('Invalid Token', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          history.push("/auth/invalid");

        }
      })
  }

  const create = (fname, email, password) => {
    const queryParams = new URLSearchParams(window.location.search);
    let token = queryParams.get('token');
    axios.post(`http://localhost:3000/users`, {
      fname: fname,
      email: email,
      password: password,
      token: token
    })
      .then((response) => {
        console.log(response);

        toast('Successfully Register', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push("/auth/login");
      })
      .catch(function (error) {
        console.log(error);

        toast('Retry again. SOme error occur', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  const submit = (e) => {
    e.preventDefault();

    if (validation()) {
      let fname = data.fname;
      let email = data.email;
      let password = data.password;
      create(fname, email, password);

    }
  }

  return (
    <div>
      <div className='container my-5 bg-info text-white'>
        <form onSubmit={submit}>
          <div>
            <label htmlFor="fname" className="form-label h2">Name</label><br></br>
            <input type="text" id="fname" value={data.fname} onChange={(e) => { fun(e.target.name, e.target.value) }} name="fname"></input><br></br>
            {valid
              && <span style={{ color: "red" }}>{error.name}</span>}
          </div>
          <div>
            <label htmlFor="email" className="form-label h2">Email</label><br></br>
            <input type="text" value={data.email} id="email" onChange={(e) => { fun(e.target.name, e.target.value) }} name="email"></input><br></br>
            {valid
              && <span style={{ color: "red" }}>{error.email}</span>}
          </div>
          <div>
            <label htmlFor="password" className="form-label h2" >Password</label><br></br>
            <input type="password" value={data.password} id="password" onChange={(e) => { fun(e.target.name, e.target.value) }} name="password"></input><br></br>
            {valid
              && <span style={{ color: "red" }}>{error.password}</span>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="form-label h2">Confirm Password</label><br></br>
            <input type="password" value={data.confirmPassword} id="confirmPassword" onChange={(e) => { fun(e.target.name, e.target.value) }} name="confirmPassword"></input><br></br>
            {valid
              && <span style={{ color: "red" }}>{error.confirmPassword}</span>}<br></br><br></br>
          </div>

          <button type="submit" className="btn btn-sn btn-success h4" onClick={() => { setValid(true); }}>Sign up</button><br></br><br></br>
        </form>
        <button className="btn btn-sn h4 " id="button"><Link className="link-danger" to="/auth/login">Log in </Link></button>

      </div>
      {/* <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
    </div>

  )
}
