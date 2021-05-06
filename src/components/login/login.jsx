import React, {useEffect, useState} from 'react';
import style from './login.module.css'
import LoginForm from "../login-form/login-form-v3";
import {SubmissionError} from "redux-form";
import AuthHeader from "../auth-header/auth-header";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import RestoreForm from "../restore-form/restore-form"

const Login = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submitLogInForm = (data) => {
        const {email, password} = data;
        if (!email)
            throw new SubmissionError({
                email: "Enter email address"
            });
        else if (!password)
            throw new SubmissionError({
                password: "Enter your password"
            });
        console.log(data);
    };

    const submitRestoreForm = (data) =>{
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
                    <RestoreForm onSubmit={submitRestoreForm} handleClose={handleClose} />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Login;