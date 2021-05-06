import './App.css';
import axios from 'axios';
import {BrowserRouter, Switch} from "react-router-dom";
import {Component} from "react";
import PublicRoute from "./components/routers/PublicRout";
import Login from "./components/login/login";
import SignUp from "./components/sign-up/sign-up";
import Store from "./redux/store";
import {Provider} from "react-redux";

const apiUrl = 'http://DESKTOP-V8HU7V3:3333';


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Provider store={Store}>
                    <Switch>
                        <PublicRoute restricted={false} component={SignUp} path="/signup" exact/>
                        <PublicRoute restricted={false} component={Login} path="/" exact/>
                    </Switch>
                </Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
