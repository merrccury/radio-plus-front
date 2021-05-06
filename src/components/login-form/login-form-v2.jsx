import React, {useEffect, useState} from 'react';
import style from './login-form.module.css'

import {Form, Field} from 'react-final-form'
import {reduxForm} from 'redux-form'


import {email, password} from '../../utils/validate'

const onSubmit1 = (data) =>{
    console.log('---->', data);
}

const submitLogInForm = props => {
    const {error, handleSubmit, onSubmit} = props;
    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}

            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit} className={style.form}>
                    <Field name="email" >
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
                    <Field name="password">
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
                    {
                        error &&
                        <div className={style.error}>
                            <small id="credentialsHelp"> {error}</small>
                        </div>
                    }
                    <div className="text-center">
                        <button type="submit" className={"btn btn-light " + style.submit}>Log In</button>
                    </div>
                </form>
            )}
        />
    )
}

export default reduxForm({
    form: 'loginForm',
    onSubmit1
})(submitLogInForm)