import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isLogin, logout} from '../../utils/utils';

const LogoutRouter = ({ ...rest}) => {
    return (
        <Route {...rest} render={props => (
            logout() ?
                <Redirect to="/"/>
                : <Redirect to="/"/>
        )}/>
    );
};

export default LogoutRouter;