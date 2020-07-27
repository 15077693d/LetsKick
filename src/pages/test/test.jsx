import './test.scss'
import React, { Component } from 'react';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scroll_value: 0
        }
    }


    render() {
        return (
            <div className="test-background">
            </div>
        )
    }
}
export default Test;