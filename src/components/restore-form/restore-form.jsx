import {Field, reduxForm} from 'redux-form'
import style from "./restore-form.module.css";

import {email} from '../../utils/validate'
import React from "react";


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

const submitRestoreForm = (props) => {
    const {error, handleSubmit, onSubmit, handleClose} = props;
    const errors = error ? error.split('|') : undefined;
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
                <Field name="email" placeholder="Email" type="email" validate={email} component={renderField}
                   label="Enter your email to reset your password"/>
            {error && <small>{errors[0]}<strong>{errors[1]}</strong>{errors[2]}</small>}
            <div className={"text-center " + style.buttons}>
                <button type="button" onClick={handleClose} className={"btn btn-secondary " + style.submit}>Close
                </button>
                <button type="submit" className={"btn btn-primary " + style.submit}>Restore</button>
            </div>
        </form>
    )
}

export default reduxForm(
{
    form: 'submitRestoreForm'  // a unique identifier for this form
}
)(submitRestoreForm)