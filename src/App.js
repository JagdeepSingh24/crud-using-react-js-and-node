import './App.css';
import Authlayout from './MyComponent/Authlayout';
import Layout from './MyComponent/Layout';
import React from 'react';
import axios from 'axios';
import Guarded from './MyComponent/Guarded'
import Invalid from './MyComponent/Invalid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import LogInGuard from './MyComponent/LogInGuard';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css";

axios.interceptors.request.use(
  (req) => {
    
    const token = localStorage.getItem('token');
    
    if (token) {
      req.headers['Authorization'] = 'Bearer ' + token;
    }
    req.headers['Content-Type'] = 'application/json';
    
    return req;
    
  },
  (err) => {
    
    return Promise.reject(err);
  }
);
function App(props) {

  return (
    <>
      <Router>
        <Switch>
          <Route path="/auth">
            <LogInGuard component={Authlayout} />
          </Route>

          <Route path="/">
            <Guarded component={Layout} />
          </Route>
          
        </Switch>
      </Router>

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
    </>
  );
}

export default App;
