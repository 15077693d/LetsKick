import React, { Component } from 'react';
import './pitches.scss'
import PitchCardGroup from '../../components/pitch-card-group/pitch-card-group';
class Pitches extends Component {
    render() {
        return (
            <div className="background pitch-background">
                <PitchCardGroup/>
            </div>
        );
    }
}

export default Pitches;