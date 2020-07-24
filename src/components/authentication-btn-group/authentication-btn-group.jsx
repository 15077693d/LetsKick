import React from 'react';
import './authentication-btn-group.scss';
import { authWithThirdParty } from '../../utils/authProcessor';
const AuthBtnGroup = (props) => {
    const callback1 = (e)=>{
        props.switchPage(1)
        props.switchAction(e,true,false)
    }
    const callback2 = (id)=>{
        props.setIdUser(id)
    }

    return (<div className="other-methods">
        <div className="btn-group">
            <div onClick={() => { authWithThirdParty("facebook",callback1,callback2)}}><i className="fab fa-facebook-f"></i><span>Facebook</span></div>
            <div onClick={() => { authWithThirdParty("google",callback1,callback2)}}><i className="fab fa-google"></i><span>Google</span></div>
        </div>
    </div>);
}

export default AuthBtnGroup;