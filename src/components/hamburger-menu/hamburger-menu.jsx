import React from 'react';
import { hamburgerMenu } from '../../resources/text';
import './hamburger-menu.scss';
import { Link } from 'react-router-dom';

const HamburgerMenu = (props) => {
    const handleClick = () => {
        document.querySelector("#toggler").click()
    }
    const welcome = props.username === "" ? null : <li>{hamburgerMenu["welcome"][props.language] + " " + props.username}</li>
    const logout = props.username === "" ? null : <Link style={{ color: 'black', textDecoration: 'none' }} to="/"><li className="nav-item" onClick={props.logout}>{hamburgerMenu['logout'][props.language]}</li></Link>;
    return (<div className="header-container">
        <input type="checkbox" id="toggler" />
        <label htmlFor="toggler">
            <div className="hambuger-container">
                <span></span>
                <span></span>
            </div>
        </label>
        <div onClick={handleClick} className="nav-items">
                <ul>
                    {welcome}
                    <li className="nav-item" onClick={props.switchLanguage} id="language">{hamburgerMenu['language'][props.language]}</li>
                    <li className="nav-item" id='map'>{hamburgerMenu['map'][props.language]}</li>
                    {logout}
                </ul>
        </div>

    </div>);
}

export default HamburgerMenu;