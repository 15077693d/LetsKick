import React, { Component } from 'react';
import PitchCard from '../../components/pitch-card/pitch-card';
import './pitch-card-group.scss'
import { head2Tail } from '../../utils/util';
import  { ReactComponent as DownIcon} from './down.svg'

let timeOut;
class PitchCardGroup extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            zIndex: [0, 1, 2, 3, 4, 3, 2],
            name: [0, 1, 2, 3, 4, 5, 6],
            width:["68vw","71vw","74vw","77vw","80vw","71vw","68vw"],
            opacity: [0.2, 0.3, 0.5, 0.6,1, 0.3, 0.1],
            top: [0, 50, 100, 150, 200, 230,260],
            flag:true,
            count:0
        }
    }

    handleNext = () => {
        if(this.state.flag){
            const sec = this.state.count===0?0:700;
            timeOut = setTimeout(()=>{
                const total = this.state.zIndex.length;
            this.setState((state) => (
            {   
                count:state.count+=1,
                zIndex: head2Tail(state.zIndex, total),
                opacity: head2Tail(state.opacity, total),
                top: head2Tail(state.top, total),
                width: head2Tail(state.width, total)
            }
            ))
            this.handleNext();
            },sec)
            
        }
    }

    handleEnd = () =>{
        clearTimeout(timeOut)
        this.setState({flag:false,count:0})
    }

    render() {
        let pitchCards = this.state.name.map((name, i) => <PitchCard key={i} name={name}
            style={{
                width:this.state.width[i],
                zIndex: this.state.zIndex[i],
                position: "absolute",
                top: `${this.state.top[i]}px`,
                opacity: this.state.opacity[i],
            }} />)
        return (
            <div  className="pitch-card-container">
                {pitchCards}
                    <DownIcon id="next"  onTouchStart={()=>this.setState({flag:true},()=>this.handleNext())} 
                    onTouchEnd={this.handleEnd} onMouseDown={()=>this.setState({flag:true},()=>this.handleNext())} onMouseUp={this.handleEnd}/>
            </div>
        );
    }
}

export default PitchCardGroup;