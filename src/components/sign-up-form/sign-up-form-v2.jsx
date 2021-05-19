import React from 'react'
import {Field, reduxForm} from 'redux-form'
import style from "./sign-up-form.module.css";

import {email, password, text} from '../../utils/validate'


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

const submitSignUpForm = (props) => {
    const {error, handleSubmit, onSubmit} = props
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
            <Field name="firstName" placeholder="First Name" type="text" validate={text} component={renderField}
                   label="First Name"/>
            <Field name="lastName" placeholder="Last Name" type="text" validate={text} component={renderField}
                   label="Last Name"/>
            <Field name="email" placeholder="Email" type="email" validate={email} component={renderField}
                   label="Email"/>
            <Field name="password" type="password" placeholder="Password" validate={password} component={renderField}
                   label="Password"/>
            <Field name="repeatPassword" placeholder="Repeat password" type="password" validate={password}
                   component={renderField} label="Repeat password"/>

            {
                error && <div className={style.error}>
                    <small> {error}</small>
                </div>
            }
            <div className={"text-center " + style.buttons}>
                <button type="submit" className={"btn btn-light " + style.submit}>Sign Up</button>
            </div>

        </form>
    )
}

export default reduxForm({
    form: 'submitSignUpForm'  // a unique identifier for this form
})(submitSignUpForm)