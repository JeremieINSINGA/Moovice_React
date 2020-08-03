import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from './movie/Card';
import './MyList.css';

class MyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesList: [],
            idMoviesList: this.getLocalStorage(),
        }
    }

    componentDidMount() {
        const idMoviesList = this.state.idMoviesList;

        const fetchMovie = (idMovie) => 
        fetch(`https://api.themoviedb.org/3/movie/${idMovie}?api_key=d15480851b1c788638106a997f9e5127&language=${this.props.language}`)
            .then(res => res.json())
            .then(data => data);
        
        let movieTemp = {};
        let movies = [];

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

    componentDidUpdate() {

    }

    getLocalStorage() {
        let idMoviesList = localStorage.getItem('myList');
        idMoviesList = JSON.parse(idMoviesList);
        return idMoviesList
    }

    render() {
        const { language } = this.props;
        console.log(this.props.language)
        let title           = "";
        if (language === 'en') {
            title           = "My List";
        } else if (language === 'fr') {
            title           = "Ma Liste";
        }
        return(
            <div className="container">
                <h1 className="text-center">{title}</h1>
                <div className="row text-center">
                        {this.state.moviesList.map((movie) => {
                            return(
                                <div className="col-12 col-lg-3">
                                    <Link to={`/movie_detail/${movie.id}`}>
                                        <Card 
                                            movie={movie} 
                                            key={movie.id}
                                            onClickCard={this.onClickCard}
                                            language={this.props.language}                                        
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

export default MyList;