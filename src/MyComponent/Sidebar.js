import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { memo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Sidebar = () => {
    const history = useHistory();
    const [valid, setValid] = useState(false);
    const logout = () => {
        if (window.confirm("Are you sure you want to log out")) {
            localStorage.clear();
            toast('Successfully logged out', {
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
    }
    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) {
            check(email);
        }
    }, [])
    const check = (email) => {

        axios.post(`http://localhost:3000/manageuser`, { email })
            .then(async (response) => {
                let account_type = response.data[0].account_type;
                if (account_type === "admin") {
                    setValid(true);
                } else {
                    setValid(false);
                }
            })
            .catch(function (error) {
                console.log(error);

            });
    }


    return (
        <div >
            <ul className='nav flex-column '>
                {valid
                    && <div className='list-group-item list-group-item-action '>
                        <li><Link to="/home">Dashboard</Link></li>
                    </div>}
                <div className='list-group-item list-group-item-action '>
                    <li><Link to="/dashboard">My Profile</Link></li>
                </div>
                {valid
                    && <div className='list-group-item list-group-item-action '>
                        <li><Link to="/manageuser">Manage User</Link></li>
                    </div>}

                {valid
                    && <div className='list-group-item list-group-item-action '>
                        <li><Link to="/invites">Invites Users</Link></li>
                    </div>}

                <div className='list-group-item list-group-item-action '>
                    <li onClick={logout}><Link>Log out</Link></li>
                </div>




            </ul>
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

export default memo(Sidebar);
