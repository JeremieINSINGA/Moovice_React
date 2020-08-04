import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Card from './movie/Card';
import Config from '../Config';

import './Discover.css';

const TODAY = moment().format('YYYY-MM-DD')
const NEXT_WEEK = moment().add(7, 'days').format('YYYY-MM-DD');

class Discover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [], 
            value: false,
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
        const url = `${Config.API_ROOT}discover/movie?primary_release_date.gte=${TODAY}&primary_release_date.lte=${NEXT_WEEK}&language=${this.props.language}&api_key=${Config.API_KEY}`;
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


    onClickCard(idClicked) {
        this.goToDetails = true;
        this.idClicked = idClicked;
    }

    render() {
        const { language } = this.props;
        let title = "";
        if (language === 'en') {
            title = "Discover";
        } else if (language === 'fr') {
            title = "Sortie de la Semaine";
        }
        return(
            <div className="container">
                <h1 className="text-center">{title}</h1>
                <div className="row text-center">
                        {this.state.movies.map((movie) => {
                            return(
                                <div className="col-12 col-lg-3">                                    
                                    <Link to={`/movie_detail/${movie.id}`}>
                                        <Card 
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

export default Discover;