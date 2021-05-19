import React, {useEffect, useState} from 'react';
import style from './sign-up.module.css'
import SignUpForm from "../sign-up-form/sign-up-form-v2";
import {SubmissionError} from "redux-form";
import AuthHeader from "../auth-header/auth-header";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import {setCookie} from "../../utils/cookie";



const SignUp = () => {

    const history = useHistory();
    const authApi = API.auth;
    const submitForm = async (data) => {
        const {firstName, lastName, email, password, repeatPassword} = data;
        if (!firstName)
            throw new SubmissionError({
               firstName: "Enter your First Name"
            });
        else if (!lastName)
            throw new SubmissionError({
                lastName: "Enter your Last Name"
            });
        else if (!email)
            throw new SubmissionError({
                email: "Enter your email address"
            });
        else if (!password)
            throw new SubmissionError({
                password: "Enter your password"
            });
        else if (!repeatPassword)
            throw new SubmissionError({
                repeatPassword: "Enter password repeat"
            });
        else if (password !== repeatPassword)
            throw new SubmissionError({
                _error: "Password mismatch"
            });
        const auth = await authApi.signup(data);
        if (auth.data.type === 'error')
            throw new SubmissionError({
                _error: auth.data.data
            })
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