import React, { Component } from 'react';
import './Discover.css';

class NotFound extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="container">
                <h1 className="mt-5">Not Found</h1>
            </div>
        );
    }
}

export default NotFound