import React, { Component } from 'react';
import Card from './movie/Card';
import './MyList.css';

class MyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesList: [],
            idMoviesList: this.getLocalStorage(),
        }
        this.onClickCard = this.onClickCard.bind(this);
    }

    componentDidMount() {
        const idMoviesList = this.state.idMoviesList;

        const fetchMovie = (idMovie) => 
        fetch(`https://api.themoviedb.org/3/movie/${idMovie}?api_key=d15480851b1c788638106a997f9e5127&language=${this.props.language}`)
            .then(res => res.json())
            .then(data => data);
        
        let movieTemp = {};
        let movies = [];

        if (idMoviesList) {
            Promise.all(this.state.idMoviesList.map(movie => fetchMovie(movie))).then((moviesList) => {
                moviesList.forEach(movie => {
                    movieTemp                = {};
                    movieTemp.id             = movie.id;
                    movieTemp.title          = movie.title;
                    movieTemp.poster         = movie.poster_path;
                    movieTemp.date           = movie.release_date;
                    movies.push(movieTemp);
                    this.setState({
                        moviesList: movies,
                    })
                });  
            });
        }        
    }

    componentDidUpdate() {

    }

    getLocalStorage() {
        let idMoviesList = localStorage.getItem('myList');
        idMoviesList = JSON.parse(idMoviesList);
        return idMoviesList
    }

    onClickCard(idClicked) {
        this.idClicked = idClicked;
    }

    render() {
        const { language }      = this.props;
        const { moviesList,idMoviesList }    = this.state;
        let isLink              = true;
        let title               = "";
        let notFavorite         = "";
        if (language === 'en') {
            title       = "My List";
            notFavorite = "You don't have any favorites yet"
        } else if (language === 'fr') {
            title       = "Ma Liste";
            notFavorite = "Vous n'avez pas encore de favoris";
        }
        return(
            <div className="container">
                <h1 className="text-center">{title}</h1>
                <div className="row text-center">
                    {idMoviesList ?
                        (moviesList.map((movie, index) => {
                            return(
                                <div className="col-12 col-lg-3" key={index}>
                                    <Card 
                                        isLink={isLink}
                                        movie={movie} 
                                        key={movie.id}
                                        onClickCard={this.onClickCard}
                                        language={language}                 
                                    />
                                </div>
                                )
                            })
                        ) : (
                            <div className="col-12 text-center">
                                <h2>{notFavorite}</h2>                                                                     
                            </div>
                        )                    
                    }                
                </div>                
            </div>
        );
    }
}

export default MyList;