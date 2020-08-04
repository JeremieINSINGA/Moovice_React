import React, { Component } from 'react';
import moment from 'moment';

import Card from './movie/Card';
import Config from '../Config';

import './DiscoverBattle.css';

const TODAY = moment().format('YYYY-MM-DD')
const NEXT_WEEK = moment().add(7, 'days').format('YYYY-MM-DD');

class DiscoverBattle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            currentMovie: 0,
        }
        this.onClickCardBattle = this.onClickCardBattle.bind(this);
    }

    componentDidMount() {
        this.chargedMovies();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.chargedMovies()
        }        
    }

    chargedMovies() {
        const url = `${Config.API_ROOT}discover/movie?primary_release_date.gte=${TODAY}&primary_release_date.lte=${NEXT_WEEK}&language=${this.props.language}&api_key=${Config.API_KEY}`;
        fetch(url).then((response) => response.json()).then(json => {
            let itemTemp = {};
            let movies = [];
            json.results.map((item) => {
                itemTemp                = {};
                itemTemp.id             = item.id;
                itemTemp.title          = item.title;
                itemTemp.poster         = item.poster_path;
                itemTemp.date           = item.release_date;
                movies.push(itemTemp);
            })
            this.setState({
                movies
            })
        })
    }

    onClickCardBattle(idMovie) {
        // console.log('PopularBattle#onClickCardBattle', idMovie);
        let currentMovie = this.state.currentMovie + 2;
        this.setState({
            currentMovie
        });
        this.saveToLocalStorage(idMovie);
    }

    saveToLocalStorage(idMovie) {
        const storageStr = localStorage.getItem('myList');
        let myList = [];
        if (storageStr !== null) {
            myList = JSON.parse(storageStr);
        }
        if (myList.includes(idMovie) === false) {
            myList.push(idMovie);
        } 
        localStorage.setItem("myList", JSON.stringify(myList))
    }
    
    render() {
        const { language }  = this.props;
        const { movies, currentMovie } = this.state;
        let displayMovies   = movies.slice((currentMovie),(currentMovie + 2))
        let favoriteChoose  = "";
        let title           = "";
        if (language === 'en') {
            favoriteChoose  = "Choose your favorite movie";
            title           = "Popular Battle";
        } else if (language === 'fr') {
            favoriteChoose  = "Choisissez votre film favori";
            title           = "Battle de films populaires";
        }

        return(
            <div className="container">
                <h1 className="text-center">{title}</h1>
                <h5 className="text-center mt-5">{favoriteChoose}</h5>
                <div className="row">                    
                    {displayMovies.map((movie, i) => {
                        return(
                            <Card 
                                movie={movie} 
                                key={movie.id}
                                onClickCard={this.onClickCardBattle}
                                language={language}
                            />
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default DiscoverBattle;