import React, { Component } from 'react';
import './pitch-card.scss'
import {getRef} from '../../utils/dataProcessor'
const width = document.body.offsetWidth
const threshold = 0.4

class PitchCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardX: "",
            isEnd: false,
            isStart: false,
            left: "",
        }
    }

    displayOption = (left) => {
        let direction;
        if (left > 0) {
            direction = "right"
        } else {
            direction = "left"
        }
        let total = width * threshold
        let percentage = Math.abs(left) / total
        if (Math.abs(left) > total) {
            this.props.handleGoBackground(1, direction)
            window.location.reload()
        } else if (this.state.left !== "") {
            this.props.handleGoBackground(percentage, direction)
        }
    }

    handleCardMove = (e) => {
        if (e.type === "mousemove") {
            this.setState((state) => ({
                left: e.clientX - state.cardX
            }), () => { this.displayOption(this.state.left) })
        } else {
            this.setState((state) => ({
                left: e.touches[0].clientX - state.cardX
            }), () => { this.displayOption(this.state.left) })
        }
    }

    handleCardStart = (e) => {
        if (e.type === "mousedown") {
            this.setState({ cardX: e.clientX, left: 0, isEnd: false, isStart: true })
            document.body.addEventListener('mousemove', this.handleCardMove)
        } else {
            this.setState({ cardX: e.touches[0].clientX, left: 0, isEnd: false, isStart: true })
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
        if (this.state.left > 0) {
            direction = "right"
        } else {
            direction = "left"
        }

        if (Math.abs(this.state.left) < width * threshold) {
            this.props.handleGoBackground(0, direction, true)
        }

        this.setState({
            left: "",
            isEnd: true,
            isStart: false
        })
    }

    handleClickLike = (e) => {
        const pitchId = e.target.id
        const pitchClass = e.target.className
        if (pitchClass.includes("active")) {
            let user =  this.props.user
            user.favourite_pitches=user.favourite_pitches.filter(ref=>ref.id!==pitchId)
            this.props.updateUser(user)
            this.props.handleClickLike(pitchId,"-")
        } else {
            let user =  this.props.user
            let pitchRef = getRef(`pitch/${pitchId}`)
            user.favourite_pitches.push(pitchRef)
            this.props.updateUser(user)
            this.props.handleClickLike(pitchId,"+")
        }
    }

    render() {
        let styleCard = {}

        if (this.state.left !== "") {
            styleCard.left = this.state.left
        }

        const name = this.props.pitch[`name_${this.props.language}`]
        const type = this.props.pitch["type"] === "both" ? "5 vs 5 / 7 vs 7" : `${this.props.pitch["type"]} vs ${this.props.pitch["type"]}`
        const numberOfPlayer = this.props.pitch.users.length
        const styleImg = {
            backgroundImage: `url(${this.props.pitch.image})`
        }
        
        const favouriteIcon = this.props.pitch.favourite ?<i onClick={this.handleClickLike} id={this.props.pitch.id} className="fas fa-heart pitch-card-heart-active"></i>
                                                        :<i onClick={this.handleClickLike} id={this.props.pitch.id} className="far fa-heart pitch-card-heart"></i>
        return (
            <div onMouseDown={this.handleCardStart} onMouseUp={this.handleCardEnd} onTouchStart={this.handleCardStart} onTouchEnd={this.handleCardEnd}
                style={styleCard} className="pitch-card" id={this.props.name}>
                <div className="pitch-card-top">
                    <span>{name}</span>
                    {favouriteIcon}
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