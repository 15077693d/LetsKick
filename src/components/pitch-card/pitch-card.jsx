import React, { Component } from 'react';
import './pitch-card.scss'
import img from './image'
const width = document.body.offsetWidth

class PitchCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardX: "",
            left: "",
        }
    }

    displayOption =(left) => {
        let option;
        if (left>0){
            option = "Let's Chat!"
        }else{
            option = "Let's Kick!"
        }

        if (this.state.left!==""){
            this.props.handleGoBackground(Math.abs(left)/(width*0.4))
            console.log(Math.abs(left)/width)
        }
        
        if (Math.abs(left)>width*0.4){
            console.log(option+" Go!")
        }
        // if(>(document.getElementById(this.props.name).offsetWidth/1.8)){
        //     
        // }else if (Math.abs(left)>(document.getElementById(this.props.name).offsetWidth/3)){
        //     console.log(option)
        // } 
    }

    handleCardMove = (e) => {
        if (!this.props.handleActiveCard(this.props.name, "check") && this.state.left !== "") {
            this.setState({
                left: ""
            })
            if (e.type === "mousemove") {
                document.body.removeEventListener('mousemove', this.handleCardMove)
            } else {
                document.body.removeEventListener('touchmove', this.handleCardMove)
            }
        } else {
            if (e.type === "mousemove") {
                this.setState((state) => ({
                    left: e.clientX - state.cardX
                }),()=> {this.displayOption(this.state.left)})
            } else {
                this.setState((state) => ({
                    left: e.touches[0].clientX - state.cardX
                }),()=> {this.displayOption(this.state.left)})
            }
        }
    }

    handleCardStart = (e) => {
        this.props.handleActiveCard(this.props.name, "set");
        if (e.type === "mousedown") {
            this.setState({ cardX: e.clientX, left: this.props.leftBase })
            document.body.addEventListener('mousemove', this.handleCardMove)
        } else {
            this.setState({ cardX: e.touches[0].clientX, left: this.props.leftBase })
            document.body.addEventListener('touchmove', this.handleCardMove)
        }
    }

    handleCardEnd = (e) => {
        if (e.type === "mouseup") {
            document.body.removeEventListener('mousemove', this.handleCardMove)
        } else {
            console.log("touched")
            document.body.removeEventListener('touchmove', this.handleCardMove)
        }
        this.setState({
            left: ""
        })
    }

    render() {
        let styleImg = this.props.i === 3 ? {
            backgroundImage: img['backgroundImage'],
        } : { backgroundColor: "white" }

        let styleCard = {}
        for (const [key, value] of Object.entries(this.props.style)) {
            styleCard[key] = value
        }
        if (this.state.left !== "") {
            styleCard.left = this.state.left
            console.log(this.state.left)
        }

        return (
            <div onMouseDown={this.handleCardStart} onMouseUp={this.handleCardEnd} onTouchStart={this.handleCardStart} onTouchEnd={this.handleCardEnd}
                style={styleCard} className="pitch-card" id={this.props.name}>
                <div className="pitch-card-top">
                    <span>A Kung Kok Playground {this.props.name}</span>
                    <div className="pitch-card-heart-active">
                        {/* <i className="fas fa-heart"></i> */}
                        <i className="far fa-heart"></i>
                    </div>
                </div>
                <div className="pitch-card-img-parent">
                    <div style={styleImg} className="pitch-card-img">10</div>
                </div>

                <div className="pitch-card-status">
                    <span>7 vs 7</span>
                </div>
            </div>
        );
    }
}

export default PitchCard;