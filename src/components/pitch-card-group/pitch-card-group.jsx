import React from 'react';
import PitchCard from '../../components/pitch-card/pitch-card';
import './pitch-card-group.scss'


const PitchCardGroup = (props) => {
    let pitchCards = props.pitches.map((pitch, i) => <PitchCard
        updateUser={props.updateUser}
        user={props.user}
        handleGoBackground={props.handleGoBackground}
        key={pitch.id}
        pitch={pitch}
        language={props.language}
        handleClickLike={props.handleClickLike}
        />)
    return (
        <div className="pitch-card-container">
            {pitchCards}
        </div>
    );
}

export default PitchCardGroup;