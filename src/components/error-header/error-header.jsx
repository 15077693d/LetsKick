import React from 'react';
import './error-header.scss'
const ErrorHeader = (props) => (<div  className="warning">
    <i className="fas fa-exclamation-triangle"></i><span>{props.warning}</span></div>)
export default ErrorHeader;