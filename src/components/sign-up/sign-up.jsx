import React, {useEffect, useState} from 'react';
import style from './sign-up.module.css'
import SignUpForm from "../sign-up-form/sign-up-form-v2";
import {SubmissionError} from "redux-form";
import AuthHeader from "../auth-header/auth-header";


const SignUp = () => {

    const submitForm = (data) => {
        if (data.password !== data.repeatPassword)
            throw new SubmissionError({
                email: "email already exist",
                password: 'Password mismatch',
                repeatPassword: 'Password mismatch',
                //_error: 'Password mismatch'
            })

        console.log(data);
    };

    return (
        <div className={style.main}>
            <AuthHeader/>
            <div>
                <h1>Sign Up Page</h1>
            </div>
            <SignUpForm onSubmit={submitForm}/>
        </div>
    )

}

export default SignUp;