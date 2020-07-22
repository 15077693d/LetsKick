import React from 'react';
import './switch-btn.scss'

const handleClick = (e)=>{
    if(e.target.classList.contains("toggle-active")){
        e.target.classList.remove("toggle-active")
    }else{
        e.target.classList.add("toggle-active")
    }   
}
const SwitchButton = (props) => (<span onClick={(e)=>{props.handleClickPitch(e);handleClick(e);}} id={props.id} className="toggle"></span>)
export default SwitchButton;