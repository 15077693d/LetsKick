import React from 'react';
import {authentication} from '../../resources/text';
import './hamburger-menu.scss';
const text = authentication['HamburgerMenu']
const HamburgerMenu = (props) => {
    const welcome = props.welcome===null?null:<li>{props.welcome}</li>;
    const logout = props.id===""||props.page!==0?null:<label htmlFor="toggler"><li onClick={props.logout}>{text['logout'][props.language]}</li></label>;
    return (<div className="header-container">
    <input type="checkbox" id="toggler" />
    <label htmlFor="toggler">
        <div className="hambuger-container">
            <span></span>
            <span></span>
        </div>
    </label>
    <div className="nav-items">
        <ul>
            {welcome}
            <label htmlFor="toggler">
                <li onClick={props.switchLanguage} id="language">{text['language'][props.language]}</li>
            </label>
            <label htmlFor="toggler">
                <li id='map'>{text['map'][props.language]}</li>
            </label>
            {logout}
        </ul>
    </div>
</div>);
}

export default HamburgerMenu;