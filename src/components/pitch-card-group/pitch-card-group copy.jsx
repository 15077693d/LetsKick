import React, { Component } from 'react';
import PitchCard from '../../components/pitch-card/pitch-card';
import './pitch-card-group.scss'
import { head2Tail } from '../../utils/util';
import { ReactComponent as DownIcon } from './down.svg'
import {getPitches} from '../../utils/dataProcessor'

const width = window.innerWidth
const height = window.innerHeight;
const topThreshold = 0.08*height
const containerHeight = (height * 0.3 < 200 ? 200 : height * 0.3) + topThreshold*5.2
const nextStyle = {
    zIndex: 5,
    opacity: 1,
    top: `${(height * 0.3 < 200 ? 200 : height * 0.3) + topThreshold*4.7}px`
}
let timeOut;


class PitchCardGroup extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activeCard:"",
            zIndex: [0, 1, 2, 3, 4, 3, 2],
            width: width < 768 ? ["68vw", "71vw", "74vw", "77vw", "80vw", "71vw", "68vw"] : ["34vw", "35.5vw", "37vw", "38.5vw", "40vw", "35.5vw", "34vw"],
            leftBase: width < 768 ? [6 * width * 0.01, 4.5 * width * 0.01, 3 * width * 0.01, 1.5 * width * 0.01, 0 * width * 0.01, 4.5 * width * 0.01, 6 * width * 0.01] :
                [3 * width * 0.01, 2.25 * width * 0.01, 1.5 * width * 0.01, 0.75 * width * 0.01, 0 * width * 0.01, 2.25 * width * 0.01, 3 * width * 0.01],
            opacity: [0.2, 0.3, 0.5, 0.6, 0.9, 0.3, 0.1],
            top: [0, topThreshold*1, topThreshold*2, topThreshold*3, topThreshold*4, topThreshold*4.7, topThreshold*5.2],
            nextFlag: true,
            count: 0,
            pitches:[]
        }
    }

    async componentDidMount(){
        this.setState({
            pitches:await getPitches()
        })
    }

    setCheckActiveCard = (name,action) => {
        if(action==="set"){
            this.setState({
                        activeCard:name
                    })
        }else{
            return name===this.state.activeCard
        }
    }

    handleNextStart = () => {
        if (this.state.nextFlag) {
            const sec = this.state.count === 0 ? 0 : 700;
            timeOut = setTimeout(() => {
                const total = this.state.zIndex.length;
                this.setState((state) => (
                    {
                        count: state.count += 1,
                        zIndex: head2Tail(state.zIndex, total),
                        opacity: head2Tail(state.opacity, total),
                        top: head2Tail(state.top, total),
                        width: head2Tail(state.width, total),
                        leftBase: head2Tail(state.leftBase, total)
                    }
                ))
                this.handleNextStart();
            }, sec)
        }
    }

    handleNextEnd = () => {
        clearTimeout(timeOut)
        this.setState({ nextFlag: false, count: 0 })
    }

    render() {
        const filteredPitches = this.state.pitches.slice(0,7)
        let pitchCards = filteredPitches.map((pitch,i) => <PitchCard
            handleGoBackground = {this.props.handleGoBackground}
            handleActiveCard = {this.setCheckActiveCard}
            handleOnMouseDown={this.handleCardStart}
            handleOnMouseUp={this.handleCardEnd}
            key={pitch.id} 
            pitch={pitch}
            language={this.props.language}
            leftBase = {this.state.leftBase[i]}
            style={{
                width: this.state.width[i],
                zIndex: this.state.zIndex[i],
                position: "absolute",
                top: `${this.state.top[i]}px`,
                opacity: this.state.opacity[i],
            }} />)
        return (
            <div style={{ width: width < 768 ? "80vw" : "40vw",
                          height: containerHeight }} className="pitch-card-container">
                {pitchCards}
                <div style={nextStyle} className="next-container">
                    <DownIcon id="next"
                        onTouchStart={() => this.setState({ nextFlag: true }, () => this.handleNextStart())}
                        onTouchEnd={this.handleNextEnd}
                        onMouseDown={() => this.setState({ nextFlag: true }, () => this.handleNextStart())}
                        onMouseUp={this.handleNextEnd} />
                </div>
            </div>
        );
    }
}

export default PitchCardGroup;