import React, { Component } from 'react';
import logo from '../../resources/img/logo.png'
import HamburgerMenu from '../../components/hamburger-menu/hamburger-menu';
import './authentication.scss'
import AuthCard from '../../components/authentication-card/authentication-card';
import AuthBtnGroup from '../../components/authentication-btn-group/authentication-btn-group';
import {authentication} from '../../resources/text';
import {checkThirdPartySignIn, signOut} from '../../utils/authProcessor'
import { get } from '../../utils/dataProcessor';

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:"",
            user:"",
            page:0,
            action:"login",
            language:"tc"
        };
    }

    setIdUser = (id) => {
        const callback = (doc) => {
            const user = doc.data();
            if(user){
                 this.setState({
                user:user
            })
            }
        } 
        this.setState({ id: id },()=>get(`user/${this.state.id}`,callback))
    }

    logout = () => {
        const callback = () => {
            this.setState({
                id:"",
                user:""
            })
            window.location.reload()
        }
        signOut(callback)
    }

    switchAction = (e,signup=false,login=false) => {
        if(signup){
            this.setState({action:"signup"});
        }else 
        if(login){
            this.setState({action:"login"});
        }else{
            const newAction = e.target.id;
        this.setState({action:newAction});
        }
    }

    switchLanguage = (e) => {
        switch (e.target.id) {
            case "language":
                this.setState((state)=>({language:state.language==="en"?"tc":"en"}));
                break;
        
            default:
                break;
        }
    } 

    switchPage = (num) => {
        if (num===1){
            this.setState({
            page:1
        })
        }else{
            this.setState((state) => ({ page: state.page += 1 }))
        }    
    }

    render() {
        const yesCallback = (user) => {
            if (this.state.id===""){
                this.setIdUser(user.uid);
            }
        }
        const noCallback = () => {}

        checkThirdPartySignIn(yesCallback,noCallback)
        return (
            <div className ="background">
                <div className ="auth-container">
                <HamburgerMenu
                    id={this.state.id}
                    welcome={this.state.user===""?null:authentication["welcome"][this.state.language]+" "+this.state.user.username}
                    switchLanguage={this.switchLanguage}
                    language={this.state.language}
                    logout={this.logout}
                    page={this.state.page}
                    />
                <img id="logo" alt="logo" src={logo} />
                <AuthCard 
                    language={this.state.language} 
                    setId={this.setIdUser} 
                    switchPage={this.switchPage} 
                    page={this.state.page} 
                    action={this.state.action} 
                    switchAction={this.switchAction}
                    id={this.state.id}
                    />
                <span className="sub-title">{authentication['subTitle'][this.state.language](this.state.action)}</span>
                <AuthBtnGroup 
                    action={this.state.action} 
                    setIdUser={this.setIdUser}
                    switchAction={this.switchAction}
                    switchPage={this.switchPage}
                    />
                </div>
            </div>);
    }
}

export default Authentication;
