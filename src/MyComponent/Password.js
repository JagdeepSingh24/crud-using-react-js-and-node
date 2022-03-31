import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import {  toast } from 'react-toastify';
export const Password = () => {
    const history = useHistory();
    const [error, setError] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [valid, setValid] = useState(false);
    const [id, setId] = useState("");

    const passwordValidation = () => {
        let isValid = true;
        let error = {};
        if (!password) {
            error["password"] = "Please Enter password";
            isValid = false;
        } else if (password.length < 5) {
            error["password"] = "Minimun 5 character required";
        }

        if (!confirmPassword) {
            error["confirmPassword"] = "Please Enter Confirm Password";
        } else {
            if (confirmPassword.length < 5) {
                error["confirmPassword"] = "Minimun 5 character required";
            } else if (confirmPassword !== password) {
                error["confirmPassword"] = "Password and Confirm Password Do not match";
            }
        }
        setError(error)
        return isValid;
    }

    useEffect(() => {
        
        const queryParams = new URLSearchParams(window.location.search);
        let token = queryParams.get('token');

        // console.log("}}}}}}}", token);
        tokenvalid(token);
    }, []);

    const tokenvalid = (token) => {
        console.log("here in tokenvalid")
        axios.post(`http://localhost:3000/validtoken`, {
            token: token
        })
            .then((response) => {
                console.log(response.data)
                if (response.data == "used" || response.data=="expires") {
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
                    history.push("/auth/login");
                    
                }
            })
    }

    const updatePassword = (token) => {
        setValid(true);
        if (passwordValidation()) {
            const queryParams = new URLSearchParams(window.location.search);
            let token = queryParams.get('token');

            console.log("token===", token);
            axios.put(`http://localhost:3000/forgotpassword`, {

                password: password,
                token: token
            })
                .then(async (response) => {
                    console.log(response);
                    toast('You have successfully updated', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTimeout(() => history.push("login"), 2000);

                })
                .catch(function (error) {
                    console.log(error);
                    toast('Retry again. Some error occur', {
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
    }
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="password" className="form-label h2 text-center pt-2 mx-5 mx-5" >New Password</label><br></br>
                    <input type="password" value={password} id="password" className=" form-label h5  mx-5" onChange={(e) => { setPassword(e.target.value) }} name="password"></input><br></br>
                    {valid
                        && <span style={{ color: "red" }}>{error.password}</span>}
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="form-label h2 text-center pt-2 mx-5 mx-5">Confirm Password</label><br></br>
                    <input type="password" value={confirmPassword} id="confirmPassword" className=" form-label h5  mx-5" onChange={(e) => { setConfirmPassword(e.target.value) }} name="confirmPassword"></input><br></br>
                    {valid
                        && <span style={{ color: "red" }}>{error.confirmPassword}</span>}<br></br><br></br>
                </div>
                <div className="actions">
                    <button type="button" onClick={() => {
                        updatePassword();
                    }} className="btn btn-sn btn-success mb-3  mx-5">Submit</button>

                </div>
            </form>
        </div>
    )
}
