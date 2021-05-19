import React, {useState} from 'react'
import {Field, reduxForm} from 'redux-form'
import style from "./login-form.module.css";

import {email, password} from '../../utils/validate'
import {Button, Modal} from "bootstrap";


const renderField = ({input, label, type, meta: {touched, error}}) => {
    let classInput = touched && error ? "form-control is-invalid" : "form-control";
    return (
        <div>
            <label className={style.label}>{label}</label>
            <input type={type} className={classInput} {...input}/>
            {touched && error &&
            <div className={style.error}>
                <small> {error}</small>
            </div>
            }
        </div>
    )
}

const submitLogInForm = (props) => {
    const {error, handleSubmit, onSubmit, handleShow} = props;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
            <Field name="email" placeholder="Email" type="email" validate={email} component={renderField} label="Email"/>
            <Field name="password" placeholder="Password" type="password" validate={password} component={renderField} label="Password"/>
            {
                error && <div className={style.error}>
                    <small> {error}</small>
                </div>
            }            <div className={"text-center " + style.buttons}>
                <button type="submit" className={"btn btn-light " + style.submit}>Log In</button>
                <button type="button" onClick={handleShow} className={"btn btn-light " + style.submit}>Restore password</button>

            </div>

        </form>
    )
}

export default reduxForm({
    form: 'submitLogInForm'  // a unique identifier for this form
})(submitLogInForm)