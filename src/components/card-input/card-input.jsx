import React from 'react';
import './card-input.scss'
const CardInput = (props) => {
    let elements;
    if (props.type === "") {
        elements = <div className={props.class+ " black-word"}>
        <i className={props.icon}></i>
            <span>{props.placeholder}</span>
        </div>
    } else {
        elements = <div
            className={props.class}>
            <i className={props.icon}></i>
            <input
                onChange={props.handleChange}
                value={props.value}
                id={props.id}
                minLength={props.min}
                maxLength={props.max}
                type={props.type}
                placeholder={props.placeholder}
                required />
        </div>
    }
    return elements
}
export default CardInput;

