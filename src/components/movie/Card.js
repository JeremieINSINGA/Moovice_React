import React, { Component } from 'react';
import './Card.css';
import Icon from '../core/Icon';

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

    render() {
        const { movie, language} = this.props;
        const src = 'https://image.tmdb.org/t/p/w300/' + movie.poster;
        const alt = 'Poster of ' + movie.title;
        let releaseDate = '';
        if (language === "en") {
            releaseDate = 'Release Date : ';
        } else if (language === "fr") {
            releaseDate = 'Date de Sortie : ';
        }
        let icon = '';
        if (this.state.idMoviesList.includes(movie.id)) {
            icon = 'favorite'
        } else {
            icon = 'favorite_border'
        }

        return(
            <div className="card" onClick={this.onClick} key={movie.id}>
                <Icon 
                    icon = {icon}
                />
                <img src={src} className="card-img-top" alt={alt} />
                <div className="card-body">
                    <h6 className="card-title">{movie.title}</h6>
                    <p className="card-text">{releaseDate}{movie.date}</p>
                </div>
            </div>
        );
    }    
}

export default Card;