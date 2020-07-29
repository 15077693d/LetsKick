import React, { Component } from 'react';
import './pitches.scss'
import PitchCardGroup from '../../components/pitch-card-group/pitch-card-group';

class Pitches extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            goAction:"",
            goRight:100,
            goOpacity:0,
        }
    }

    handleGoBackground = (percentage) => {
        this.setState(
            {
                goRight: 100-percentage*100,
                goOpacity: 0+percentage
            },()=>{console.log(this.state)}
        )
    }

    render() {
        let goChatroomStyle = {
            right:`${this.state.goRight}vw`,
            opacity:this.state.goOpacity
        }

        return (
            <div className="background pitch-background">
                <div style={goChatroomStyle} className="go-chatroom"></div>
                <PitchCardGroup handleGoBackground={this.handleGoBackground}/>
            </div>
        );
    }
}

export default Pitches;