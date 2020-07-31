import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    
    onClick() {
        console.log(this.props.item.id);
        this.props.onClickCard(this.props.item.id);
    }

    render() {
        const { item } = this.props;
        const src = 'https://image.tmdb.org/t/p/w300/' + item.poster;
        const alt = 'Poster of ' + item.title;

        return(
            <div className="card" onClick={this.onClick}>
                <img src={src} className="card-img-top" alt={alt} />
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p>{item.description}</p>
                    <p className="card-text">{item.id}</p>
                </div>
            </div>
        );
    }    
}

export default Card;