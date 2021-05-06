import React, {useEffect, useState} from 'react';
import style from './sign-up-form.module.css'
import {Form, Field} from 'react-final-form'
import {reduxForm} from 'redux-form'


import {email, password, text} from '../../utils/validate'


const submitSignUpForm = props => {
    const {error, handleSubmit, onSubmit} = props;
    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}

            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit} className={style.form}>
                    <Field name="firstName" validate={text}>
                        {({input, meta}) => {
                            let classInput = meta.touched && meta.error ? "form-control is-invalid" : "form-control";
                            return (
                                <div>
                                    <label>First Name</label>
                                    <input type="text" {...input} placeholder="First Name" className={classInput}/>
                                    {meta.touched && meta.error &&
                                    <div className={style.error}>
                                        <small id="firstNameHelp"> {meta.error}</small>
                                    </div>
                                    }
                                </div>
                            )
                        }}
                    </Field>
                    <Field name="lastName" validate={text}>
                        {({input, meta}) => {
                            let classInput = meta.touched && meta.error ? "form-control is-invalid" : "form-control";
                            return (
                                <div>
                                    <label>Last Name</label>
                                    <input type="text" {...input} placeholder="Last Name" className={classInput}/>
                                    {meta.touched && meta.error &&
                                    <div className={style.error}>
                                        <small id="lastNameHelp"> {meta.error}</small>
                                    </div>
                                    }
                                </div>
                            )
                        }}
                    </Field>
                    <Field name="email" validate={email}>
                        {({input, meta}) => {
                            let classInput = meta.touched && meta.error ? "form-control is-invalid" : "form-control";
                            return (
                                <div>
                                    <label>Email</label>
                                    <input type="email" {...input} placeholder="Email" className={classInput}/>
                                    {meta.touched && meta.error &&
                                    <div className={style.error}>
                                        <small id="emailHelp"> {meta.error}</small>
                                    </div>
                                    }
                                </div>
                            )
                        }}
                    </Field>
                    <Field name="password" validate={password}>
                        {({input, meta}) => {
                            let classInput = meta.touched && meta.error ? "form-control is-invalid" : "form-control";
                            return (
                                <div>
                                    <label>Password</label>
                                    <input type="password" {...input} placeholder="Password"
                                           className={classInput}/>
                                    {meta.touched && meta.error &&
                                    <div className={style.error}>
                                        <small id="passwordHelp"> {meta.error}</small>
                                    </div>
                                    }
                                </div>
                            )
                        }}
                    </Field>

                    <Field name="passwordRepeat" validate={password}>
                        {({input, meta}) => {
                            let classInput = meta.touched && meta.error ? "form-control is-invalid" : "form-control";
                            return (
                                <div>
                                    <label>Password repeat</label>
                                    <input type="password" {...input} placeholder="Password repeat"
                                           className={classInput}/>
                                    {meta.touched && meta.error &&
                                    <div className={style.error}>
                                        <small id="passwordRepeatHelp"> {meta.error}</small>
                                    </div>
                                    }
                                </div>
                            )
                        }}
                    </Field>

                    {
                        error &&
                        <div className={style.error}>
                            <small id="credentialsHelp"> {error}</small>
                        </div>
                    }
                    <div className="text-center">
                        <button type="submit" className={"btn btn-light " + style.submit}>Sign Up</button>
                    </div>
                </form>
            )}
        />
    )
}

export default reduxForm({
    form: 'signUpForm'
})(submitSignUpForm)