
import React, { Component } from 'react';
import './authentication-card.scss'
import { authentication, districtSelect } from '../../resources/text'
import SwitchButton from '../switch-btn/switch-btn';
import { getPitches, update, getRef } from '../../utils/dataProcessor';
import { filterSearch } from '../../utils/util'
import { signUpWithEmailAndPassword } from '../../utils/authProcessor'
import DistrictSelect from '../district-select/district-select'
import ErrorHeader from '../error-header/error-header'
import CardInput from '../card-input/card-input'
const text = authentication["AuthCard"];
class SignUpCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pitches: [],
            username: "",
            email: "",
            password: "",
            districtId: "",
            favouritePitches: [],
            search: "",
            warning: "",
            selectedDistrictId: "",
        }
    }

    clearStates = () => {
        this.setState(
            {
                password: "",
                warning: "",
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
        // no light 
        if (!e.target.classList.contains("toggle-active")) {
            // not include in state
            if (!this.state.favouritePitches.includes(id)) {
                this.setState(state => ({
                    favouritePitches: state.favouritePitches.concat(id)
                }))
            }
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
        const districtId = e.target.id
        muteOtherToggle(districtId)
    }

    handleSwitchDistrict = async (e) => {
        const toggles = document.getElementsByClassName('toggle')
        for (let i = 0; i < toggles.length; i++) {
            toggles[i].classList.remove("toggle-active")
        }
        const districtId = e.target.value
        this.setState({
            selectedDistrictId: districtId,
        })
    }

    handleSubmit = async (e) => {
        const displayWarning = (warning) => {
            this.setState({
                warning: warning
            })
        }
        e.preventDefault()
        switch (this.props.page) {
            case 0:
                this.clearStates();
                try {
                    let id = await signUpWithEmailAndPassword(this.state.username, this.state.email, this.state.password)
                    this.props.setIdUser(id)
                    this.props.switchPage(1)
                } catch (errorMessage) {
                    displayWarning(errorMessage)
                }

                break;
            case 1:
                const activeElement = document.querySelector('.toggle-active')
                const districtId = activeElement === null ? "" : activeElement.id
                if (districtId === "") {
                    displayWarning("null-district")
                } else {
                    const districtRef = getRef(`district/${districtId}`)
                    const pitches = await getPitches()
                    update(`user/${this.props.id}`, { district: districtRef });
                    this.setState({
                        selectedDistrictId: districtId,
                        districtId: districtId,
                        pitches: pitches
                    })
                    this.props.switchPage(2)
                }
                break;
            case 2:
                if (this.state.favouritePitches.length === 0) {
                    displayWarning("null-pitches")
                } else {
                    const favouritePitchesRef = this.state.favouritePitches.map((item) => getRef(`pitch/${item}`))
                    await update(`user/${this.props.id}`, { favourite_pitches: favouritePitchesRef });
                    window.location.reload()
                }
                break;
            default:
                break;
        };
    }

    render() {
        let cardContent;
        let errorHeader;
        let emailClass;
        let usernameClass;
        let dropdownClass;

        emailClass = this.state.warning.includes('email') ? "card-input error-input" : "card-input";
        usernameClass = this.state.warning.includes('username') ? "card-input error-input" : "card-input";
        switch (this.props.page) {
            case 0:
                errorHeader = this.state.warning === "" ? null : <ErrorHeader key="error" warning={text[this.state.warning][this.props.language]} />;
                cardContent = [errorHeader,
                    <CardInput key="username" class={usernameClass} handleChange={this.handleInputChange} id="username" value={this.state["username"]} language={this.props.language} min={6} max={10} />,
                    <CardInput key="email" class={emailClass} language={this.props.language} handleChange={this.handleInputChange} id="email" value={this.state["email"]} />,
                    <CardInput key="password" class="card-input" handleChange={this.handleInputChange} language={this.props.language} id="password" value={this.state["password"]} min={6} />,
                ]
                break;
            case 1:
                const districts = districtSelect['district'][this.props.language]
                const districtElements = Object.keys(districts).map((districtId) => <div key={districtId} ><span className="name">{districts[districtId]}</span><SwitchButton className="toggle" handleClick={this.handleClickDistrict} id={districtId} /></div>);
                dropdownClass = this.state.warning === "null-district" ? "error-input" : "";
                errorHeader = this.state.warning === "null-district" ? <ErrorHeader key="error" warning={text[this.state.warning][this.props.language]} /> : null;
                cardContent = [errorHeader,
                    <CardInput key="questionDistrict" id="questionDistrict" class="card-input" language={this.props.language} />,
                    <div key="dropdown" className={dropdownClass} id="dropdown">{districtElements}</div>
                ]
                break;
            case 2:
                const pitches = this.state.pitches.filter((doc) => filterSearch(doc, this.state.search, this.props.language) &&  doc.district.id===this.state.selectedDistrictId)
                const pitchElements = pitches.map(doc => {
                    let className = this.state.favouritePitches.includes(doc.id) ? "toggle toggle-active" : "toggle";
                    return (<div key={doc.id}>
                        <span className="name">{doc[`name_${this.props.language}`]}</span>
                        <SwitchButton handleClick={this.handleClickPitch} className={className} id={doc.id} />
                    </div>)
                })
                dropdownClass = this.state.warning === "null-pitches" ? "error-input" : "";
                errorHeader = this.state.warning === "null-pitches" ? <ErrorHeader key="error" warning={text[this.state.warning][this.props.language]} /> : null;
                cardContent = [errorHeader,
                    <CardInput key="questionPitch" id="questionPitch" class="card-input" language={this.props.language} />,
                    <div key="2_signup_2" className={dropdownClass} id="dropdown">
                        <div className="search-district">
                            <div><span><i className="fas fa-search"></i><input onChange={this.handleSearch} value={this.state["search"]} type="text" placeholder={text['search'][this.props.language]} /></span></div>
                            <DistrictSelect handleOnChange={this.handleSwitchDistrict} language={this.props.language} selectedDistrictId={this.state["selectedDistrictId"]} />
                        </div>
                        {pitchElements}
                    </div>]
                break;
            default:
                break;
        }
        return (
            <form onSubmit={this.handleSubmit} className="card-content">
                {cardContent}
                <button id="submit" type="submit">
                    <i className="fas fa-arrow-right"></i>
                </button>
            </form>)
    }
}

export default SignUpCard;