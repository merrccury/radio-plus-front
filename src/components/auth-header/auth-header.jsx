import style from './auth-header.module.css'
import { useHistory } from "react-router-dom";


const AuthHeader = () => {
    const history = useHistory();

    const goToLogIn = ()=>{
        history.push('/')
    }
    const goToSignUp = ()=>{
        history.push('/signup')
    }

    return (
        <div className={style.header}>
            <h1>Joji</h1>
            <div>
                <button onClick={goToLogIn} className="btn btn-light">Log In</button>
                <button onClick={goToSignUp} className="btn btn-light">Sign Up</button>
            </div>
        </div>
    )
}

export default AuthHeader;