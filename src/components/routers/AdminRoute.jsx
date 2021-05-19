import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isLogin, isAdmin} from '../../utils/utils';

const AdminRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogin() && isAdmin()?
                <Component {...props} />
                : <Redirect to="/stations"/>
        )}/>
    );
};

export default AdminRoute;