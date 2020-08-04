import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Icon from '../core/Icon';
import placeholder from '../../placeholder.png';
import Config from '../../Config';

import './Card.css';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idMoviesList: this.getLocalStorage(),
        }
        this.onClick = this.onClick.bind(this);
    }

    getLocalStorage() {
        let idMoviesList = localStorage.getItem('myList');
        idMoviesList = JSON.parse(idMoviesList);
        return idMoviesList
    }
    
    onClick() {
        console.log(this.props.movie.id);
        this.props.onClickCard(this.props.movie.id);
    }

    onClickFavorite() {
        console.log('Card#onClickFavorite')
    }

    render() {
        const { movie, language} = this.props;
        const { idMoviesList } = this.state;
        let src = '';
        let alt = '';
        console.log('IMG', movie.poster);
        if (movie.poster !== null) {
            console.log('movie.poster', movie.poster)
            src = Config.IMG_ROOT + movie.poster;
            alt = 'Poster of ' + movie.title;
        } else {
            console.log('null')
            src = placeholder
            alt = 'Poster of DVD'
        }
        let releaseDate = '';
        if (language === "en") {
            releaseDate = 'Release Date : ';
        } else if (language === "fr") {
            releaseDate = 'Date de Sortie : ';
        }
        let icon = '';
        if (idMoviesList.includes(movie.id)) {
            icon = 'favorite'
        } else {
            icon = 'favorite_border'
        }

        return(
            <div className="card" onClick={this.onClick} key={movie.id}>
                <Icon 
                    onClick = {this.onClickFavorite}
                    icon = {icon}
                />
                <Link to={`/movie_detail/${movie.id}`}>
                    <img src={src} className="card-img-top" alt={alt} />
                    <div className="card-body">
                        <h6 className="card-title">{movie.title}</h6>
                        <p className="card-text">{releaseDate}{movie.date}</p>
                    </div>
                </Link>   
            </div>
        );
    }    
}

export default Card;