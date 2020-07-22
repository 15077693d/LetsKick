import React, { Component } from 'react';
import './authentication-card.scss'
import { authentication } from '../../resources/text'
import SwitchButton from '../switch-btn/switch-btn';
import { getPitchesByDistrict, update, getRef } from '../../utils/dataProcessor';
import { index2Id, filterSearch } from '../../utils/util'
import { signUpWithEmailAndPassword, loginWithEmailAndPassword, resetPassword } from '../../utils/authProcessor'
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
            selectedDistrictIndex: "",
            forgotPassword: false
        }
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

    handleClickForgotPassword = (bool)=>{
        this.setState({
            forgotPassword:bool
        })
    }

    handleInputChange = (e) => {
        let key = `${this.props.action}_${e.target.id}`
        this.setState(
            {
                [key]: e.target.value,
            });
    }

    handleSelectDistrict = (e) => {
        const selectElement = e.target
        const districtIndex = selectElement.selectedIndex - 1
        this.setState(
            {
                selectedDistrictIndex: districtIndex,
                districtIndex: districtIndex
            });
    }

    handleSwitchDistrict = (e) => {
        const selectElement = e.target
        const districtIndex = selectElement.selectedIndex - 1
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

        if (this.props.action === "signup" & this.props.page <= 2) {
            switch (this.props.page) {
                case 0:
                    e.preventDefault()
                    const username = this.state.signup_username
                    const email = this.state.signup_email;
                    const password = this.state.signup_password;
                    signUpWithEmailAndPassword(username, email, password, displayWarning, this.props.switchPage, this.props.setId);
                    break;
                case 1:
                    e.preventDefault()
                    this.props.switchPage();
                    const districtId = index2Id(this.state["districtIndex"])
                    getPitchesByDistrict(districtId, (list) => {
                        this.setState({
                            pitches: list
                        })
                    });
                    const districtRef = getRef(`district/${index2Id(this.state.districtIndex)}`)
                    update(`user/${this.props.id}`, { district: districtRef });
                    break;
                case 2:
                    const favouritePitchesRef = this.state.favouritePitches.map((item) => getRef(`pitch/${item}`))
                    update(`user/${this.props.id}`, { favourite_pitches: favouritePitchesRef });
                    break;
                default:
                    break;
            };
        } else {
            e.preventDefault()
            if (this.state.forgotPassword) {
                const email = this.state.login_email;
                resetPassword(email, displayWarning,text['emailSent'][this.props.language]);
                this.handleClickForgotPassword(false);
            } else {
                const email = this.state.login_email;
                const password = this.state.login_password;
                loginWithEmailAndPassword(email, password, displayWarning, this.props.setId)
            }

        };
    };

    render() {
        let cardContent;
        const districtOptions = text['district'][this.props.language].map((district, i) => <option key={`${i + 1}`} value={`${i + 1}`}> {district}</option>);
        const pitches = this.state.pitches.filter((doc) => filterSearch(doc, this.state.search, this.props.language)).map(
            (doc, i) => <div key={i}><span className="name">{doc[`name_${this.props.language}`]}</span><SwitchButton handleClickPitch={this.handleClickPitch} id={doc.id} /></div>)
        if (this.props.action === "login") {
            if (this.state.forgotPassword) {
                cardContent = [<div key="1" className="card-input">
                    <i className="fa fa-envelope"></i><input onChange={this.handleInputChange} id="email" value={this.state["login_email"]} type="email" placeholder={text["emailQuestion"][this.props.language]} required />
                </div>,<div key="2" className="card-reminder"><span onClick={()=>this.handleClickForgotPassword(false)}>{text['back'][this.props.language]}</span></div>]
            } else {
                cardContent = [<div key="1" className="card-input">
                    <i className="fas fa-at"></i><input onChange={this.handleInputChange} id="email" value={this.state["login_email"]} type="email" placeholder={text["email"][this.props.language]} required />
                </div>,
                <div key="2" className="card-input">
                    <i className="fas fa-key"></i><input onChange={this.handleInputChange} id="password" value={this.state["login_password"]} type="password" placeholder={text["password"][this.props.language]} required />
                </div>,
                <div key="3" className="card-reminder">
                    <span onClick={()=>this.handleClickForgotPassword(true)}>{text['forgotPassword'][this.props.language]}</span>
                </div>,
                <span key="4" className="warning">{this.state.login_warning}</span>]
            }

        } else {
            switch (this.props.page) {
                case 0:
                    cardContent = [<div key="1" className="card-input">
                        <i className="far fa-user"></i><input onChange={this.handleInputChange} value={this.state["signup_username"]} id="username" minLength={6} maxLength={10} ref="username" type="text" placeholder={text['username'][this.props.language]} required />
                    </div>,
                    <div key="2" className="card-input">
                        <i className="fas fa-at"></i><input onChange={this.handleInputChange} value={this.state["signup_email"]} id="email" type="email" placeholder={text['email'][this.props.language]} required />
                    </div>,
                    <div key="3" className="card-input">
                        <i className="fas fa-key"></i><input onChange={this.handleInputChange} value={this.state["signup_password"]} id="password" minLength={6} type="password" placeholder={text['password'][this.props.language]} required />
                    </div>,
                    <span key="4" className="warning">{this.state.signup_warning}</span>
                    ]
                    break;
                case 1:
                    cardContent = <div className="card-input">
                        <i className="fas fa-house-user"></i>
                        <select onChange={this.handleSelectDistrict} name="district" id="district" required>
                            <option value="" disabled selected>{text['questionDistrict'][this.props.language]}</option>
                            {districtOptions}
                        </select>
                    </div>
                    break;
                case 2:
                    cardContent = [<div key="1" className="card-input">
                        <i className="fas fa-futbol"></i>
                        <span>{text['questionPitch'][this.props.language]}</span>
                    </div>,
                    <div key="2" id="dropdown">
                        <div>
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