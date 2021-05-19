import React from 'react'
import {Field, reduxForm} from 'redux-form'
import style from './search-field.module.css';

const SearchForm = (props) => {
    const {handleSubmit} = props
    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <div className="form-group">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Search</span>
                    </div>
                    <input className="form-control" name="search" type="text" placeholder="Search"/>
                </div>
            </div>
        </form>
    )
}

export default SearchForm;