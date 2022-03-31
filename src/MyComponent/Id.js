import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from 'reactjs-popup';
export const Id = () => {
    const [forgot, setForgot] = useState(false);
    const history = useHistory();
    const [valid, setValid] = useState(false);
    const [verify, setVerify] = useState(false);
    const [verifyToken, setVerifyToken] = useState("");
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState({});

    useEffect(() => {
        let error = {
            email: "",
            password: ""

        }
        setError(error);
        setValid(false);

        return () => {
            let error = {
                email: "",
                password: ""
            }
            setError(error);
            setValid(false);
        }
    }, []);

    useEffect(() => {
        validation();
    }, [data.email, data.password]);

    const validation = () => {
        let error = {}
        let isValid = true;
        if (!data.email) {
            isValid = false;
            error["email"] = "Please enter a email"
        } else {
            if (typeof data.email !== undefined) {
                if (!data.email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
                    isValid = false;
                    error["email"] = "Invalid email";
                }
            }
        }

        if (!data.password) {
            isValid = false;
            error["password"] = "Please enter a password"
        } else if (data.password.length < 5) {
            isValid = false;
            error["password"] = "Minimum 5 character required"
        }
        setError(error);
        return isValid;

    }

    const fun = (key, value) => {

        setData((prev) => {

            return {
                ...prev,
                [key]: value
            }
        });
    }

    const check = (email, password) => {
        axios.post('http://localhost:3000/login', {
            email: email,
            password: password
        })
            .then(function (response) {
                console.log("response===>>>>>>>", response);
                console.log("response===>>>>>>>", response.data.status);
                if (response.data.status === 'notVerified') {
                    console.log("in here 1=>", response)
                    setVerify(true)
                    setVerifyToken(response.data.token);
                    
                } else {
                    localStorage.setItem('email', email);
                    localStorage.setItem('token', response.data);
                    console.log("in here 2=>", response)
                    toast('Successfully login', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    history.push("/home");
                }

            })
            .catch(function (error) {
                console.log(error);
                console.log("in here 3=>", error)

                toast('Incorrect email or password', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            });
    }

    const submit = (e) => {
        e.preventDefault();

        if (validation()) {
            let email = data.email;
            let password = data.password;

            check(email, password);
        }
    }

    const forgotpassword = (email) => {
        console.log("In forgot password");

        axios.post("http://localhost:3000/password", {
            email: email
        })
            .then(function (response) {
                console.log("response===>>", response);
                if (response.data === '401') {
                    alert("Wrong email or password")
                } else {

                    toast('A Email is sent to your Email Id', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTimeout(() => history.push("/home"), 2000);
                }

            })
            .catch(function (error) {
                console.log(error);
                toast('Please Enter a valid email', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            });

    }

    const funVerify = (email,verifyToken) => {
        
        axios.post("http://localhost:3000/resend", {
            token: verifyToken,
            email: email
        })
        .then(function (response) {
            console.log("response===>>>>>>>", response);
            setVerify(false);
            toast('Mail has been sent ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
        .catch(function (error) {
            console.log(error);
            toast('Some Error came.Please click on verify button again', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }
    return (
        <div >

            <div className='container bg-info text-white my-5'>

                <form onSubmit={submit}>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label h2"  >Email</label><br></br>
                        <input type="text" value={data.email} id="email" onChange={(e) => { fun(e.target.name, e.target.value) }} name="email"></input><br></br>
                        {valid
                            && <span style={{ color: "red" }}>{error.email}</span>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label h2">Password</label><br></br>
                        <input type="password" value={data.password} id="password" onChange={(e) => { fun(e.target.name, e.target.value) }} name="password"></input><br></br>
                        {valid
                            && <span style={{ color: "red" }}>{error.password}</span>}
                    </div>

                    <button type="submit" className="btn btn-sn btn-success" onClick={() => { setValid(true); }}>log in</button><br></br><br></br>
                </form>
                {verify
                    && <span>You have not Verified your account. Please click here  <button onClick={() => { funVerify(data.email,verifyToken); }} type="button">verify</button> to get a mail for verifying your account</span>}
                <div className='actions'>
                    <button type="button" className="btn btn-sn btn-primary" onClick={() => { setForgot(true); }}>Forgot password</button><br></br>

                </div>

                {/* <button type="button" className="btn btn-sn  " id="button" ><Link className="link-danger" to="/auth/sign-up">Register </Link></button> */}
                <br></br><br></br>



                <Popup open={forgot} onClose={() => {
                    setForgot(false);
                }}>
                    <div className="wrapper bg-primary  text-white  my-5  ">
                        <form>
                            <div className="form-label h1 text-center pt-5 px-5" > Forgot Password </div>
                            <label htmlFor="email" className="form-label h2 text-center pt-5 px-5"  >Enter your Email</label><br></br>
                            <input type="text" className='text-center mx-4 px-5' value={data.email} id="email" onChange={(e) => { fun(e.target.name, e.target.value) }} name="email"></input><br></br>
                            {valid
                                && <span className='form-label h2 text-center pt-5 px-5' style={{ color: "red" }}>{error.email}</span>}<br></br>
                            <div className='border border-light p-3 mb-4 Text-center'>
                                <button type="submit" className='btn btn-success' onClick={() => { forgotpassword(data.email); setForgot(false); }}>Submit</button><br></br><br></br>
                            </div>


                        </form>
                    </div>
                </Popup>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>


    )
}
