
import React, { Component } from 'react';
import './authentication-card.scss'
import { authentication } from '../../resources/text'
import { loginWithEmailAndPassword, resetPassword } from '../../utils/authProcessor'
import ErrorHeader from '../error-header/error-header'
import CardInput from '../card-input/card-input'
const text = authentication["AuthCard"];
class LoginCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forgotPasswordEmail: "",
            email: "",
            password: "",
            warning: "",
            forgotPassword: false,
        }
    }

    clearStates = () => {
        this.setState(
            {
                email: "",
                password: "",
                warning: "",
                forgotPasswordEmail: "",
            });
    }


    handleClickForgotPassword = (bool) => {
        this.setState({
            forgotPassword: bool,
            forgotPasswordEmail: "",
            password: "",
            warning: "",
        })
    }

    handleInputChange = (e) => {
        let key = e.target.id
        this.setState(
            {
                [key]: e.target.value,
            });
    }

    handleSubmit = async (e) => {
        const displayWarning = (warning) => {
            this.setState({
                warning: warning
            })
        }
        e.preventDefault()
        if (this.state.forgotPassword) {
            try{
                await resetPassword(this.state.forgotPasswordEmail, displayWarning);
                displayWarning('emailSent');
            }catch(error){
                displayWarning(error.code);
            }
        } else {
            this.setState(
                {
                    password: "",
                });
            let userInfo = await loginWithEmailAndPassword(this.state.email, this.state.password).catch((error) => { displayWarning(error.code) });
            if (userInfo) {
                window.location.reload()
            }
        }
    };


    render() {
        let cardContent;
        let errorHeader;
        let emailClass;
        let passwordClass;
        errorHeader = this.state.warning === "" ? null : <ErrorHeader key="error" warning={text[this.state.warning][this.props.language]} />;
        emailClass = this.state.warning.includes('user-not-found') ? "card-input error-input" : "card-input";
        passwordClass = this.state.warning.includes('password') ? "card-input error-input" : "card-input";

        if (this.state.forgotPassword) {
            cardContent = [errorHeader,
                <CardInput id="forgotPasswordEmail" key="forgotPasswordEmail" class={emailClass} handleChange={this.handleInputChange} value={this.state["forgotPasswordEmail"]} language={this.props.language} />,
                <div key="reminder" className="card-reminder"><span onClick={() => this.handleClickForgotPassword(false)}>{text['back'][this.props.language]}</span></div>
            ]
        } else {
            cardContent = [errorHeader,
                <CardInput id="email" key="email" class={emailClass} handleChange={this.handleInputChange} value={this.state["email"]} language={this.props.language} />,
                <CardInput id="password" key="password" class={passwordClass} handleChange={this.handleInputChange} value={this.state["password"]} language={this.props.language} />,
                <div key="reminder" className="card-reminder"><span onClick={() => this.handleClickForgotPassword(true)}>{text['forgotPassword'][this.props.language]}</span></div>
            ]
        }

        return (
            <form onSubmit={this.handleSubmit} className="card-content">
                {cardContent}
                <button id="submit" type="submit">
                    <i className="fas fa-arrow-right"></i>
                </button>
            </form>
        );
    }
}

export default LoginCard;