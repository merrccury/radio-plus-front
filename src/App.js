import './App.css';
import axios from 'axios';
import {BrowserRouter, Switch} from "react-router-dom";
import {Component} from "react";
import PublicRoute from "./components/routers/PublicRout";
import PrivateRoute from "./components/routers/PrivateRout";
import Login from "./components/login/login";
import SignUp from "./components/sign-up/sign-up";
import Store from "./redux/store";
import {Provider} from "react-redux";
import Artist from "./components/artist/artist";
import Admin from "./components/admin/admin";
import Stations from "./components/stations/stations";
import AdminRoute from "./components/routers/AdminRoute";
import LogoutRouter from "./components/routers/LogoutRouter";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Provider store={Store}>
                    <Switch>
                        <PublicRoute restricted={false} component={SignUp} path="/signup" exact/>
                        <PrivateRoute restricted={false} component={Artist} path="/artist" exact/>
                        <PrivateRoute restricted={false} component={Stations} path="/stations" exact/>
                        <LogoutRouter restricted={false} path="/logout" exact/>
                        <AdminRoute restricted={false} component={Admin} path="/admin" exact/>
                        <PublicRoute restricted={false} component={Login} path="/" exact/>
                    </Switch>
                </Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
