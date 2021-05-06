import React, {useEffect, useState} from 'react';
import style from './login-form.module.css'

import {Form, Field} from 'react-final-form'
import {email, password} from '../../utils/validate'

const LoginForm = () => {

    useEffect(() => console.log("render"))
    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Form
            onSubmit={onSubmit}
            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit} className={   style.form}>
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
                                    <input type="password" {...input} placeholder="Password" className={classInput}/>
                                    {meta.touched && meta.error &&
                                    <div className={style.error}>
                                        <small id="passwordHelp"> {meta.error}</small>
                                    </div>
                                    }
                                </div>
                            )
                        }}
                    </Field>
                    <div className="text-center">
                        <button type="submit" className={"btn btn-light " + style.submit}>Submit</button>
                    </div>
                </form>
            )}
        />
    )
}

export default LoginForm;