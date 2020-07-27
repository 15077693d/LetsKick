import React, { Component } from 'react';
import './pitch-card.scss'
import img from './image'

class PitchCard extends Component {
    render() {
        let styleImg = this.props.i===3?{
            backgroundImage: img['backgroundImage'],
        }:{backgroundColor:"white"}


        return (
            <div style={this.props.style} className="pitch-card">
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