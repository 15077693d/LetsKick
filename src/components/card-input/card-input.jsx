import React from 'react';
import './card-input.scss'
import {cardInput as text} from '../../resources/text'

const CardInput = (props) => {
    const keyPropPair = {
        username:{
            type:"text",
            icon:"far fa-user",
            placeholder:text["username"][props.language]
        },
        forgotPasswordEmail:{
            type:"email",
            icon:"fa fa-envelope",
            placeholder:text["forgotPasswordEmail"][props.language]},
        email:{
            type:"email",
            icon:"fas fa-at",
            placeholder:text["email"][props.language]},
        password:{
            type:"password",
            icon:"fas fa-key",
            placeholder:text["password"][props.language]},
        questionDistrict:{
            type:"",
            icon:"fas fa-house-user",
            placeholder:text["questionDistrict"][props.language]},
        questionPitch:{
            type:"",
            icon:"fas fa-futbol",
            placeholder:text["questionPitch"][props.language]},
        }

    let elements;
    if (keyPropPair[props.id]["type"] === "") {
        elements = <div className={props.class+ " black-word"}>
        <i className={keyPropPair[props.id]["icon"]}></i>
            <span>{keyPropPair[props.id]["placeholder"]}</span>
        </div>
    } else {
        elements = <div
            className={props.class}>
            <i className={keyPropPair[props.id]["icon"]}></i>
            <input
                onChange={props.handleChange}
                value={props.value}
                id={props.id}
                minLength={props.min}
                maxLength={props.max}
                type={keyPropPair[props.id]["type"]}
                placeholder={keyPropPair[props.id]["placeholder"]}
                required />
        </div>
    }

    return elements
}
export default CardInput;

