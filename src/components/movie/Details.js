import React, { Component } from 'react';
import './Details.css';

class Details extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        // let id = this.props.match.params.id;
        // console.log(id);
        let urlcourante = document.location.href; 
        console.log(urlcourante);
        return(
            <div className="container">
                <h1 className="mt-5">Detail</h1>
            </div>
        );
    }
}

export default Details