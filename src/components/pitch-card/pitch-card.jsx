import React, { Component } from 'react';
import './pitch-card.scss'
import img from './image'
const width = document.body.offsetWidth
const threshold = 0.4

class PitchCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardX: "",
            left: "",
            isEnd: false,
            isStart:false,
        }
    }

    displayOption =(left) => {
        let direction;
        if(left>0){
            direction="right"
        }else{
            direction="left"
        }

        let total = width*threshold
        let percentage = Math.abs(left)/total
        if (Math.abs(left)>total){
            this.props.handleGoBackground(1,direction)
            window.location.reload()
        }else if (this.state.left!==""){
            this.props.handleGoBackground(percentage,direction)
        }
    }

    handleCardMove = (e) => {
        if (!this.props.handleActiveCard(this.props.name, "check") && this.state.left !== "") {
            this.setState({
                left: ""
            })
            if(e.type === "mousemove") {
                document.body.removeEventListener('mousemove', this.handleCardMove)
            }else{
                document.body.removeEventListener('touchmove', this.handleCardMove)
            }
        }else{
            if(e.type === "mousemove") {
                this.setState((state) => ({
                    left: e.clientX - state.cardX
                }),()=> {this.displayOption(this.state.left)})
            }else{
                this.setState((state) => ({
                    left: e.touches[0].clientX - state.cardX
                }),()=> {this.displayOption(this.state.left)})
            }
        }
    }

    handleCardStart = (e) => {
        this.props.handleActiveCard(this.props.name, "set");
        if (e.type === "mousedown") {
            this.setState({ cardX: e.clientX, left: this.props.leftBase ,isEnd:false,isStart:true })
            document.body.addEventListener('mousemove', this.handleCardMove)
        } else {
            this.setState({ cardX: e.touches[0].clientX, left: this.props.leftBase ,isEnd:false,isStart:true })
            document.body.addEventListener('touchmove', this.handleCardMove)
        }
    }

    handleCardEnd = (e) => {
        if (e.type === "mouseup") {
            document.body.removeEventListener('mousemove', this.handleCardMove)
        } else {
            document.body.removeEventListener('touchmove', this.handleCardMove)
        }

        let direction;
        if(this.state.left>0){
            direction="right"
        }else{
            direction="left"
        }

        if (Math.abs(this.state.left)<width*threshold){
            this.props.handleGoBackground(0,direction,true)
        }

        this.setState({
            left: "",
            isEnd:true,
            isStart:false
        })
    }

    render() {
        let styleCard = {}
        for (const [key, value] of Object.entries(this.props.style)) {
            styleCard[key] = value
        }
        if (this.state.isStart){
            styleCard.zIndex = 9
            styleCard.opacity = 1
            styleCard.width = width < 768 ?width*0.8:width*0.4
        }
        if (this.state.left !== "") {
            styleCard.left = this.state.left
        }
        const name = this.props.pitch[`name_${this.props.language}`]
        const type = `${this.props.pitch["type"]} vs ${this.props.pitch["type"]}`
        const numberOfPlayer = this.props.pitch.users.length
        const styleImg =  {
            backgroundImage: `url(${this.props.pitch.image})`
        } 
        return (
            <div onMouseDown={this.handleCardStart} onMouseUp={this.handleCardEnd} onTouchStart={this.handleCardStart} onTouchEnd={this.handleCardEnd}
                style={styleCard} className="pitch-card" id={this.props.name}>
                <div className="pitch-card-top">
                    <span>{name}</span>
                    <div className="pitch-card-heart-active">
                        {/* <i className="fas fa-heart"></i> */}
                        <i className="far fa-heart"></i>
                    </div>
                </div>
                <div className="pitch-card-img-parent">
                    <div style={styleImg} className="pitch-card-img">{numberOfPlayer}</div>
                </div>

                <div className="pitch-card-status">
                    <span>{type}</span>
                </div>
            </div>
        );
    }
}

export default PitchCard;