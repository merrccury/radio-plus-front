import React, {useEffect, useState} from 'react';
import style from './login.module.css'
import LoginForm from "../login-form/login-form-v3";
import {SubmissionError} from "redux-form";
import AuthHeader from "../auth-header/auth-header";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import RestoreForm from "../restore-form/restore-form"
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import {setCookie} from '../../utils/cookie'


const Login = () => {

    const authApi = API.auth;
    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submitLogInForm = async (data) => {
        const {email, password} = data;
        if (!email)
            throw new SubmissionError({
                email: "Enter email address"
            });
        else if (!password)
            throw new SubmissionError({
                password: "Enter your password"
            });
        const auth = await authApi.login(data);
       // debugger;
        if (auth.data.type === 'error'){
            throw new SubmissionError({
                _error: auth.data.data
            });
        }
        else{
            const accessToken = auth.data.data.accessToken;
            const refreshToken = auth.data.data.refreshToken;
            const roles = auth.data.data.roles;
            setCookie('accessToken', accessToken);
            setCookie('refreshToken', refreshToken);
            setCookie('roles', roles);
            history.push("/stations");
        }
    };

    const submitRestoreForm = (data) => {
        if (data.email === undefined)
            throw new SubmissionError({
                email: "Enter email address"
            });
        throw new SubmissionError({
            _error: `On the email |${data.email} |were sent further instructions`
        });
    }


    return (
        <div className={style.back}>
            <AuthHeader/>
            <LoginForm onSubmit={submitLogInForm} handleShow={handleShow}/>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Restore password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RestoreForm onSubmit={submitRestoreForm} handleClose={handleClose}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Login;