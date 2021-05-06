import style from "../login-form/login-form.module.css";
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