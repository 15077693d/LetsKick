import React, { Component } from 'react';
import './pitches.scss'
import PitchCardGroup from '../../components/pitch-card-group/pitch-card-group';
import DistrictSelect from '../../components/district-select/district-select';
import { pitches } from '../../resources/text'

class Pitches extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            goAction: "",
            goRight: 100,
            goOpacity: 0,
            goLeft: 100,
            isEnd: false,
        }
    }

    handleGoBackground = (percentage, direction, isEnd) => {
        switch (direction) {
            case "right":
                this.setState(
                    {
                        goLeft: 100,
                        goRight: 100 - percentage * 100,
                        goOpacity: 0 + percentage,
                        isEnd: isEnd
                    }
                )
                break;
            case "left":
                this.setState(
                    {
                        goRight: 100,
                        goLeft: 100 - percentage * 100,
                        goOpacity: 0 + percentage,
                        isEnd: isEnd
                    }
                )
                break;
            default:
                break;
        }
    }



    render() {
        const goChatroomStyle = {
            right: `${this.state.goRight}vw`,
            opacity: this.state.goOpacity,
            transition: this.state.isEnd ? "all 1s" : "none"
        }

        const goMatchStyle = {
            left: `${this.state.goLeft}vw`,
            opacity: this.state.goOpacity,
            transition: this.state.isEnd ? "all 1s" : "none"
        }

        return (
            <div className="background pitch-background">
                <div className="pitches-district-select-container">
                    <DistrictSelect class="pitches-distrist-select" page="pitches" language="tc" handleOnChange={() => { }} selectedDistrictIndex={2} />
                    <i className="fas fa-angle-down"></i>
                </div>
                <div style={goChatroomStyle} className="go-chatroom">
                    <div className="go-text">
                        <span>{pitches['right'][this.props.language]}</span>
                        <span>{pitches['kick'][this.props.language]}</span>
                    </div>
                </div>
                <div style={goMatchStyle} className="go-match">
                    <div className="go-text">
                        <span>{pitches['left'][this.props.language]}</span>
                        <span>{pitches['chat'][this.props.language]}</span>
                    </div>
                </div>
                <PitchCardGroup language={this.props.language} user={this.props.user} handleGoBackground={this.handleGoBackground} />
            </div>
        );
    }
}

export default Pitches;