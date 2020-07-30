import React, { Component } from 'react';
import './Card.css'

const Card = ({ item, key, onClick }) => {
    const src = 'https://image.tmdb.org/t/p/w300/' + item.poster;
    const alt = 'Poster of ' + item.title;
    return(
        <div className="card">
            <img src={src} className="card-img-top" alt={alt} />
            <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
            </div>
        </div>
    );
}

export default Card;