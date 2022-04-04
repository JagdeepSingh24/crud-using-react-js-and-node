import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react'
import Home from './Home'
import ManageGuard from './ManageGuard';
import Dashboard from './Dashboard'
import Sidebar from './Sidebar'
import Manageuser from './Manageuser'
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Invites from './Invites';
import Invalid from './Invalid';
const Layout = (props) => {
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            checked(token);
        }
    }, []);

    const checked = (token) => {
        axios.post('http://localhost:3000/token', { token })
            .then(function (response) {
                console.log("response", response.data);

            })
            .catch(function (error) {
                localStorage.clear()
                history.push('/auth/login');
            });
    }

    return (

        <div className='row vh-100 w-100'>
            <div className='col-sm-2 '>
                <Sidebar />
            </div>
            <div className='col-sm-10 bg-secondary text-white'>
                <Route path={`${props.match.path}dashboard`} >
                    <Dashboard />
                </Route>
                <Route path={`${props.match.url}home`}>
                <ManageGuard component={Home} />
                </Route>
                <Route path={`${props.match.path}manageuser`}>
                    <ManageGuard component={Manageuser} />
                </Route>
                <Route path={`${props.match.path}invites`}>

                    <ManageGuard component={Invites} />
                </Route>

            </div>

        </div >



    )
}

export default withRouter(Layout);
