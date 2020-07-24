import React, { Component } from 'react';
import './authentication-card.scss'
import { authentication } from '../../resources/text'
import SwitchButton from '../switch-btn/switch-btn';
import { getPitchesByDistrict, update, getRef } from '../../utils/dataProcessor';
import { index2Id, filterSearch } from '../../utils/util'
import { signUpWithEmailAndPassword, loginWithEmailAndPassword, resetPassword } from '../../utils/authProcessor'
import ErrorHeader from '../error-header/error-header'
import CardInput from '../card-input/card-input'
const text = authentication["AuthCard"];
class AuthCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pitches: [],
            login_email: "",
            login_password: "",
            signup_username: "",
            signup_email: "",
            signup_password: "",
            districtIndex: "",
            favouritePitches: [],
            search: "",
            signup_warning: "",
            login_warning: "",
            selectedDistrictIndex: "16",
            forgotPassword: false
        }
    }

    clearStates = () => {
        this.setState(
            {
                login_password: "",
                signup_password: "",
                signup_warning: "",
                login_warning: "",
            });
    }

    handleSearch = (e) => {
        this.setState(
            {
                search: e.target.value
            });
    }

    handleClickPitch = (e) => {
        let id = e.target.id
        if (!e.target.classList.contains("toggle-active")) {
            this.setState(state => ({
                favouritePitches: state.favouritePitches.concat(id)
            }))
        }
        else {
            this.setState(state => ({
                favouritePitches: state.favouritePitches.filter((item) => item !== id)
            }))
        }
    }

    handleClickForgotPassword = (bool) => {
        this.setState({
            forgotPassword: bool
        }, () => this.clearStates())
    }

    handleInputChange = (e) => {
        let key = e.target.id
        this.setState(
            {
                [key]: e.target.value,
            });
    }

    handleClickDistrict = (e) => {
        const muteOtherToggle = (value) => {
            const toggles = document.getElementsByClassName('toggle')
            for (let i = 0; i < toggles.length; i++) {
                if (toggles[i].id !== value) {
                    toggles[i].classList.remove("toggle-active")
                }
            }
        }
        let selectElement = e.target
        const districtIndex = selectElement.id
        muteOtherToggle(districtIndex, selectElement)
    }

    handleSwitchDistrict = (e) => {
        const selectElement = e.target
        const districtIndex = selectElement.value
        const id = index2Id(districtIndex)
        getPitchesByDistrict(id, (list) => {
            this.setState({
                selectedDistrictIndex: districtIndex,
                pitches: list
            })
        })
    }

    handleSubmit = (e) => {
        const displayWarning = (warning) => {
            const key = this.props.action === "signup" ? "signup_warning" : "login_warning";
            this.setState({
                [key]: warning
            })
        }
        e.preventDefault()
        if (this.props.action === "signup" & this.props.page <= 2) {    
            switch (this.props.page) {
                case 0:
                    const username = this.state.signup_username
                    const email = this.state.signup_email;
                    const password = this.state.signup_password;
                    this.clearStates();
                    signUpWithEmailAndPassword(username, email, password, displayWarning, this.props.switchPage, this.props.setId);
                    break;
                case 1:
                    const activeElement =  document.querySelector('.toggle-active')
                    const districtIndex = activeElement===null?"":activeElement.id
                    const callback = () => {
                        if (this.state["districtIndex"] === "") {
                            displayWarning("null-district")
                        } else {
                            const districtId = index2Id(this.state["districtIndex"])
                            getPitchesByDistrict(districtId, (list) => {
                                this.setState({
                                    pitches: list
                                })
                            });
                            const districtRef = getRef(`district/${index2Id(this.state.districtIndex)}`)
                            update(`user/${this.props.id}`, { district: districtRef });
                            this.props.switchPage();
                        }
                    }

                    this.setState(
                        {
                            selectedDistrictIndex: districtIndex,
                            districtIndex: districtIndex
                        }, callback);
                    break;
                case 2:
                    console.log(this.state.favouritePitches)
                    if(this.state.favouritePitches.length===0){
                        console.log(this.state.favouritePitches)
                        displayWarning("null-pitches")
                    }else{
                          const favouritePitchesRef = this.state.favouritePitches.map((item) => getRef(`pitch/${item}`))
                          update(`user/${this.props.id}`, { favourite_pitches: favouritePitchesRef });
                          window.location.reload()
                    }
                    break;
                default:
                    break;
            };
        } else {
            if (this.state.forgotPassword) {
                const email = this.state.login_email;
                resetPassword(email, displayWarning, 'emailSent');
            } else {
                const email = this.state.login_email;
                const password = this.state.login_password;
                this.clearStates();
                loginWithEmailAndPassword(email, password, displayWarning, this.props.setId)
            }

        };
    };

    render() {
        let cardContent;
        let errorHeader;
        let emailClass;
        let passwordClass;
        let usernameClass;
        let dropdownClass;
        const districtOptions = text['district'][this.props.language].map((district, i) => <option key={`${i}`} value={`${i}`}> {district}</option>);
        const pitches = this.state.pitches.filter((doc) => filterSearch(doc, this.state.search, this.props.language)).map(
            (doc, i) => <div key={i}><span className="name">{doc[`name_${this.props.language}`]}</span><SwitchButton handleClick={this.handleClickPitch} id={doc.id} /></div>)
        const districts = text['district'][this.props.language].map((district, i) => <div key={`${i}`} ><span className="name">{district}</span><SwitchButton handleClick={this.handleClickDistrict} id={i} /></div>);

        if (this.props.action === "login") {
            errorHeader = this.state.login_warning === "" ? null : <ErrorHeader key="login_error" warning={text[this.state.login_warning][this.props.language]} />;
            emailClass = this.state.login_warning.includes('user-not-found') ? "card-input error-input" : "card-input";
            passwordClass = this.state.login_warning.includes('password') ? "card-input error-input" : "card-input";
            if (this.state.forgotPassword) {
                console.log(emailClass,this.state.login_warning)
                cardContent = [errorHeader, <CardInput key="1_login_a" class={emailClass} icon="fa fa-envelope" handleChange={this.handleInputChange} id="login_email"
                    value={this.state["login_email"]} type="email" placeholder={text["emailQuestion"][this.props.language]} />
                    , <div key="2" className="card-reminder">
                        <span onClick={() => this.handleClickForgotPassword(false)}>{text['back'][this.props.language]}</span>
                    </div>]
            } else {
                cardContent = [errorHeader, <CardInput key="1_login_b" i="1" class={emailClass} icon="fas fa-at" handleChange={this.handleInputChange} id="login_email"
                    value={this.state["login_email"]} type="email" placeholder={text["email"][this.props.language]} />,
                    <CardInput key="2_login_b" class={passwordClass} icon="fas fa-key" handleChange={this.handleInputChange} id="login_password"
                        value={this.state["login_password"]} type="password" placeholder={text["password"][this.props.language]} />,
                    <div key="3)login_b" className="card-reminder">
                        <span onClick={() => this.handleClickForgotPassword(true)}>{text['forgotPassword'][this.props.language]}</span>
                    </div>]
            }
        } else {
            emailClass = this.state.signup_warning.includes('email') ? "card-input error-input" : "card-input";
            usernameClass = this.state.signup_warning.includes('username') ? "card-input error-input" : "card-input";
            switch (this.props.page) {
                case 0:
                    console.log(this.state.signup_warning)
                    errorHeader = this.state.signup_warning === "" ? null : <ErrorHeader key="0_signup_0" warning={text[this.state.signup_warning][this.props.language]} />;
                    cardContent = [errorHeader, <CardInput key="1_signup_0" class={usernameClass} icon="far fa-user" handleChange={this.handleInputChange} id="signup_username"
                        value={this.state["signup_username"]} type="text" placeholder={text["username"][this.props.language]} min={6} max={10} />,
                        <CardInput key="2_signup_0" class={emailClass} icon="fas fa-at" handleChange={this.handleInputChange} id="signup_email"
                            value={this.state["signup_email"]} type="email" placeholder={text["email"][this.props.language]} />,
                        <CardInput key="3_signup_0" class="card-input" icon="fas fa-key" handleChange={this.handleInputChange} id="signup_password"
                            value={this.state["signup_password"]} type="password" placeholder={text["password"][this.props.language]} min={6} />,
                    ]
                    break;
                case 1:
                    dropdownClass = this.state.signup_warning === "null-district" ? "error-input" : "";
                    errorHeader = this.state.signup_warning === "null-district" ? <ErrorHeader key="0_signup_1" warning={text[this.state.signup_warning][this.props.language]} /> : null;
                    cardContent = [<CardInput key="1_signup_1" class="card-input" icon="fas fa-house-user" handleChange={this.handleInputChange}
                        type="" placeholder={text["questionDistrict"][this.props.language]} />, errorHeader,
                    <div key="1_signup_2" className={dropdownClass} id="dropdown">
                        {districts}
                    </div>]
                    break;
                case 2:
                    dropdownClass = this.state.signup_warning === "null-pitches" ? "error-input" : "";
                    errorHeader = this.state.signup_warning === "null-pitches" ? <ErrorHeader key="0_signup_1" warning={text[this.state.signup_warning][this.props.language]} /> : null;
                    cardContent = [<CardInput key="1_signup_2" class="card-input" icon="fas fa-futbol" handleChange={this.handleInputChange}
                        type="" placeholder={text['questionPitch'][this.props.language]} />,errorHeader,
                    <div key="2_signup_2" className={dropdownClass} id="dropdown">
                        <div className="search-district">
                            <div><span><i className="fas fa-search"></i><input onChange={this.handleSearch} value={this.state["search"]} type="text" placeholder={text['search'][this.props.language]} /></span></div>
                            <select onChange={this.handleSwitchDistrict} id="district" >
                                <option value="" disabled selected>{text["district"][this.props.language][this.state["selectedDistrictIndex"]]}</option>
                                {districtOptions}
                            </select>
                        </div>
                        {pitches}
                    </div>]
                    break;
                default:
                    break;
            }
        }
        return (
            <div className="card">
                <div className="card-title">
                    <span id="login" onClick={(e) => { this.props.switchAction(e); }} className={this.props.action === "login" ? "active-title" : ""}>{text["login"][this.props.language]}</span>
                    <span id="signup" onClick={(e) => { this.props.switchAction(e); }} className={this.props.action === "signup" ? "active-title" : ""}>{text["signup"][this.props.language]}</span>
                </div>
                <form onSubmit={this.handleSubmit} className="card-content">
                    {cardContent}
                    <button id="submit" type="submit">
                        <i className="fas fa-arrow-right"></i>
                    </button>
                </form>
            </div>
        );
    }
}

export default AuthCard;