import React from 'react'
import { Password } from './Password';
import { Form } from './Form';
import { Id } from './Id';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Invalid from './Invalid';
import Verified from './Verified';
const Authlayout = (props) => {
    console.log("In authlayouts: ",props);
    return (
        
        <div>
            
            <Route exact path={`${props.match.url}/login`}>
                <Id />
            </Route>
            <Route exact path={`${props.match.url}/password`}>
                <Password />
            </Route>
            <Route exact path={`${props.match.url}/invalid`}>
                <Invalid />
            </Route>
            <Route exact path={`${props.match.path}/sign-up`} >
                <Form/>
            </Route>
            <Route exact path={`${props.match.path}/verified`} >
                <Verified/>
            </Route>
        </div>
    )
}

export default withRouter(Authlayout);
