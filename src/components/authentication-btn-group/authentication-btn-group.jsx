import React from 'react';
import './authentication-btn-group.scss';
import { authWithThirdParty } from '../../utils/authProcessor';
import { addUser,get } from '../../utils/dataProcessor';
const AuthBtnGroup = (props) => {
    const handleClick = async (type) => {
        const userInfo = await authWithThirdParty(type)
        const user = await get(`user/${userInfo.uid}`)
        if(user){
            window.location.reload()
        }else{
            addUser(userInfo.uid,userInfo.email,userInfo.displayName)
            await props.setIdUser(userInfo.uid)
            props.switchPage(1)
            props.switchAction("signup")
        }
    }

    return (<div className="other-methods">
        <div className="btn-group">
            <div onClick={() => handleClick("facebook")}><i className="fab fa-facebook-f"></i><span>Facebook</span></div>
            <div onClick={() => handleClick("google")}><i className="fab fa-google"></i><span>Google</span></div>
        </div>
    </div>);
}

export default AuthBtnGroup;