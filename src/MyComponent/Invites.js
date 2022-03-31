import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom'
const Invites = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [valid, setValid] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        let error = {
            email: ""
        }
        setError(error);
        setValid(false);
        return () => {
            let error = {
                email: "",
            }
            setError(error);
            setValid(false);
        }
    }, []);
    useEffect(() => {
        validation();
    }, [email]);

    const validation = () => {
        let isValid = true;
        let error = {};
        if (!email) {
            error["email"] = "Please Enter Email";
            isValid = false;
        } else {
            if (typeof email !== undefined) {
                if (!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
                    isValid = false;
                    error["email"] = "Invalid email";
                }
            }
        }
        setError(error)
        return isValid;
    }

    const invite = (email) => {
        if (validation()) {
            console.log(" in invites===>", localStorage.getItem("email"));
            console.log("in invites==>email", email);
            axios.post("http://localhost:3000/invite", {
                email: email,
                userEmail: localStorage.getItem("email")
            })
                .then(async (response) => {
                    setValid(false);
                    setEmail("");
                    console.log(response);
                    toast('Invite is sent ', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    // setTimeout(() => history.push("login"), 2000);

                })
                .catch(function (error) {
                    setValid(false);
                    setEmail("");
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
        <div className='text-center mt-5'>
            <form className='bg-info'>
                <div>
                    <h1>Send Invites</h1>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div>
                    <label className='h3 form-label' htmlFor='email'>Enter your Email</label><br></br><br></br>
                    <input type="text" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} name="email" className='form-label'></input><br></br>
                    {valid
                        && <span style={{ color: "red" }}>{error.email}</span>}
                </div>
                <div>
                    <button type="button" onClick={() => { setValid(true); invite(email) }}>Send Invite</button><br></br>
                </div>
                <br></br>
            </form>
        </div>
    )
}

export default Invites