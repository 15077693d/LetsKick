import React from 'react';
import './authentication-card.scss';
import LoginCard from './login-card';
import SignUpCard from './signup-card';
import { authentication } from '../../resources/text';
const text = authentication['AuthCard']

const AuthCard = (props) => {
    return (
        <div className="card">
            <div className="card-title">
                <span id="login" onClick={() => { props.switchAction("login"); }} className={props.action === "login" ? "active-title" : ""}>{text["login"][props.language]}</span>
                <span id="signup" onClick={() => { props.switchAction("signup"); }} className={props.action === "signup" ? "active-title" : ""}>{text["signup"][props.language]}</span>
            </div>
            {props.action === "login" ? <LoginCard language={props.language} /> : <SignUpCard setIdUser={props.setIdUser} id={props.id} switchPage={props.switchPage} language={props.language} page={props.page}/>}
        </div>
    );
}

export default AuthCard;