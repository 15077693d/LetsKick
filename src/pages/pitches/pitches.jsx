import React, { Component } from 'react';
import './pitches.scss'
import PitchCardGroup from '../../components/pitch-card-group/pitch-card-group';
import DistrictSelect from '../../components/district-select/district-select';
import { pitches } from '../../resources/text'
import { getPitches, getFavouitePitchesFromUser } from '../../utils/dataProcessor'

class Pitches extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            pitches: [],
            favouitePitches: [],
            selectedDistrictId: "favourite",
            goRight: 100,
            goOpacity: 0,
            goLeft: 100,
            isEnd: false,
        }
    }


    async componentDidUpdate(prevProps){
        if (prevProps.user!==this.props.user) {
            console.log("You click like?")
            const pitches = await getPitches()
            const favouitePitches= await getFavouitePitchesFromUser(this.props.user)
            this.setState({
                pitches: pitches,
                favouitePitches: favouitePitches,
            })
        }
    }

    async componentDidMount(){
        if (this.props.user!=="" && this.state.pitches.length===0){
            console.log("Mount!")
            const pitches = await getPitches()
            const favouitePitches= await getFavouitePitchesFromUser(this.props.user)
            this.setState({
                pitches: pitches,
                favouitePitches: favouitePitches,
            })
        }
    }


    handleClickLike = (pitchId,type) => {
        switch (type) {
            case "+":
                this.setState((state)=>{
                    const targetPitch = state.pitches.filter(pitch => pitch.id===pitchId)
                    return {
                        favouitePitches:state.favouitePitches.concat(targetPitch)
                    } 
                })
                break;
            case "-":
                this.setState((state)=>{
                    return {
                        favouitePitches:state.favouitePitches.filter(pitch => pitch.id!==pitchId)
                    } 
                })
                break;
            default:
                break;
        }
        
    }

    handleDistrictChange = (e) => {
        this.setState({
            selectedDistrictId: e.target.value
        })
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
        let filteredPitches;
        if (this.props.user) {
            filteredPitches = this.state.selectedDistrictId === "favourite"
                ? this.state.favouitePitches
                : this.state.pitches.filter(pitch => pitch.district.id === this.state.selectedDistrictId)
            filteredPitches.forEach(pitch=> {
                pitch['favourite']=this.state.favouitePitches.map(favouitePitch=>favouitePitch.id).includes(pitch.id)
            })
        } else {
            filteredPitches = []
        }
        
        return (
            <div className="background pitch-background">
                <div className="pitches-district-select-container">
                    <DistrictSelect class="pitches-distrist-select" page="pitches" language={this.props.language} handleChange={this.handleDistrictChange} />
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
                <PitchCardGroup handleClickLike={this.handleClickLike} updateUser={this.props.updateUser} language={this.props.language} pitches={filteredPitches} user={this.props.user} handleGoBackground={this.handleGoBackground} />
            </div>
        );
    }
}

export default Pitches;