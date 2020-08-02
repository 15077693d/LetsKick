import React, { Component } from 'react';
import logo from '../../resources/img/logo.png'
import './authentication.scss'
import AuthCard from '../../components/authentication-card/authentication-card';
import AuthBtnGroup from '../../components/authentication-btn-group/authentication-btn-group';
import {authentication} from '../../resources/text';

class Authentication extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            action:"login",
            page:0
        };
    }


    switchAction = (action) => {
        if(action!==this.state.action){
            this.setState({action:action});
        }
    }

    switchPage = (num) => {
            this.setState({
            page:num
        })
    }

    render() {
        return (
            <div className ="background">
                <div className ="auth-container">
                <img id="logo" alt="logo" src={logo} />
                <AuthCard 
                    setIdUser={this.props.setIdUser}
                    language={this.props.language} 
                    action={this.state.action} 
                    switchAction={this.switchAction}
                    switchPage={this.switchPage}
                    page={this.state.page}
                    id={this.props.id}
                    />
                <span className="sub-title">{authentication['subTitle'][this.props.language](this.state.action)}</span>
                <AuthBtnGroup 
                    action={this.state.action} 
                    setIdUser={this.props.setIdUser}
                    switchAction={this.switchAction}
                    switchPage={this.switchPage}
                    />
                </div>
            </div>);
    }
}

export default Authentication;
