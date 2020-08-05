import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Card from './movie/Card';
import Config from '../Config';

import './Popular.css';

class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [], 
            value: false,
            idMoviesList: this.getLocalStorage(),
        }
        this.onClickCard = this.onClickCard.bind(this);
    }

    componentDidMount() {
        this.chargedMovies()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.chargedMovies()
        }        
    }

    chargedMovies() {
        const url = `${Config.API_ROOT}discover/movie?sort_by=popularity.desc&language=${this.props.language}&api_key=${Config.API_KEY}`;
        fetch(url).then((response) => response.json()).then(json => {
            let movieTemp = {};
            let movies = [];
            json.results.map((movie) => {
                movieTemp                = {};
                movieTemp.id             = movie.id;
                movieTemp.title          = movie.title;
                movieTemp.poster         = movie.poster_path;
                movieTemp.date           = movie.release_date;
                movies.push(movieTemp);
            })
            this.setState({
                movies
            })
        })
    }

    getLocalStorage() {
        let idMoviesList = localStorage.getItem('myList');
        idMoviesList = JSON.parse(idMoviesList);
        return idMoviesList
    }

    onClickCard(idClicked) {
        this.idClicked = idClicked;
    }

    onClickFavorite(idMovie) {
        if (this.state.idMoviesList.indexOf(idMovie) !== -1) {
            console.log('this.state.idMoviesList.indexOf(idMovie)', this.state.idMoviesList.indexOf(idMovie))
            const result = this.state.idMoviesList.filter(id => id !== idMovie);
            this.setState ({
                idMoviesList : result
            })
            localStorage.setItem("myList", JSON.stringify(result));
        } else {
            console.log('onClickFavorite else')
            const storageStr = localStorage.getItem('myList');
            let myList = [];
            if (storageStr !== null) {
                myList = JSON.parse(storageStr);
            }
            myList.push(idMovie);
            localStorage.setItem("myList", JSON.stringify(myList))
        }
    }

    render() {
        const { language } = this.props;
        const { movies } = this.state;
        let isLink  = true;
        let title   = "";
        if (language === 'en') {
            title = "Popular";
        } else if (language === 'fr') {
            title = "Films Populaires";
        }
        return(
            <div className="container">
                <h1 className="text-center">{title}</h1>
                <div className="row text-center">
                        {movies.map((movie) => {
                            return(
                                <div className="col-12 col-lg-3">
                                    <Link to={`/movie_detail/${movie.id}`}>
                                        <Card 
                                            isLink={isLink}
                                            movie={movie} 
                                            key={movie.id}
                                            onClickCard={this.onClickCard}
                                            language={language}                                        
                                        /> 
                                    </Link>                                                           
                                </div>
                                )
                            })
                        }
                </div>
            </div>
        );
    }
}

export default Popular;