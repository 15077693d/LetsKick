import React from 'react';
import './load-animation.scss';
import ballLogo from './ball.svg'
const LoadingAnimation = (props) => <div class="background animation-background">
    <div class="box">
        <div class="line line-a"><div class="sub-line"></div></div>
        <div class="line line-b"><div class="sub-line"></div></div>
        <div class="line line-c"><div class="sub-line"></div></div>
        <div class="line line-d"><div class="sub-line"></div></div>
        <div class="line line-e"><div class="sub-line"></div></div>
        <img id="ball" src={ballLogo} alt="ball logo" />
        <p>LOADING</p>
    </div>
</div>

export default LoadingAnimation;