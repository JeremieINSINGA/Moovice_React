import React, { Component } from 'react';
import Card from './movie/Card';
import { Link } from 'react-router-dom';
import './Popular.css';

class Popular extends Component {
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
        const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&language=${this.props.language}&api_key=d15480851b1c788638106a997f9e5127`;
        fetch(url).then((response) => response.json()).then(json => {
            let itemTemp = {};
            let movies = [];
            json.results.map((item) => {
                itemTemp                = {};
                itemTemp.id             = item.id;
                itemTemp.title          = item.title;
                itemTemp.originalTitle  = item.original_title;
                itemTemp.poster         = item.poster_path;
                itemTemp.description    = item.overview;
                itemTemp.date           = item.release_date;
                movies.push(itemTemp);
            })
            this.setState({
                movies
            })
        })
    }


    onClickCard(idClicked) {
        this.goToDetails = true;
        console.log(this.goToDetails);
        this.idClicked = idClicked;
    }

    render() {
        return(
            <div className="container">
                <h1 className="text-center">Popular</h1>
                <div className="row text-center">
                        {this.state.movies.map((item, i) => {
                            return(
                                <div className="col-12 col-lg-3">
                                    <Link to={`/movie_detail/${item.id}`}>
                                        <Card 
                                            item={item} 
                                            key={i}
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

export default Popular;