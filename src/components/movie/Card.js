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
        this.onClick            = this.onClick.bind(this);
        this.onClickFavorite    = this.onClickFavorite.bind(this);
    }

    getLocalStorage() {
        let idMoviesList    = localStorage.getItem('myList');
        idMoviesList        = JSON.parse(idMoviesList);
        return idMoviesList
    }
    
    onClick() {
        // console.log(this.props.movie.id);
        this.props.onClickCard(this.props.movie.id);
    }

    onClickFavorite(idMovie) {
        // console.log('Details#onClickFavortie idMovie', idMovie);
        const result = this.state.idMoviesList.filter(id => id !== idMovie);
        // console.log('Details#onClickFavorite result', result)

        this.setState ({
            idMoviesList : result
        })
        localStorage.setItem("myList", JSON.stringify(result));

    }

    render() {
        const { movie, language, isLink } = this.props;
        // console.log("Card isLink", isLink);
        const { idMoviesList } = this.state;
        let src = '';
        let alt = '';
        if (movie.poster !== null) {
            src = Config.IMG_ROOT + movie.poster;
            alt = 'Poster of ' + movie.title;
        } else {
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
        if (idMoviesList) {
            if (idMoviesList.includes(movie.id)) {
                icon = 'favorite'
            } else {
                icon = 'favorite_border'
            }
        } else {
            icon = 'favorite_border'
        }    

        return(
            <div className="card-favorite">
                <Icon 
                    onClickFavorite = {this.onClickFavorite}
                    icon = {icon}
                    id = {movie.id}
                /> 
                {isLink ? (
                    <Link to={`/movie_detail/${movie.id}`}>
                        <div className="card" onClick={this.onClick} key={movie.id}>
                            <img src={src} className="card-img-top" alt={alt} />
                            <div className="card-body">
                                <h6 className="card-title">{movie.title}</h6>
                                <p className="card-text">{releaseDate}{movie.date}</p>
                            </div>  
                        </div>
                    </Link> 
                ):(
                    <div className="card" onClick={this.onClick} key={movie.id}>
                        <img src={src} className="card-img-top" alt={alt} />
                        <div className="card-body">
                            <h6 className="card-title">{movie.title}</h6>
                            <p className="card-text">{releaseDate}{movie.date}</p>
                        </div>  
                    </div>
                )}
            </div>
        );
    }    
}

export default Card;