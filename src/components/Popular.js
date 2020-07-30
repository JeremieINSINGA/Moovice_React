import React, { Component } from 'react';
import Card from './movie/Card';

class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
        }
    }

    componentDidMount() {
        const url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&language=fr&api_key=d15480851b1c788638106a997f9e5127';
        fetch(url).then((response) => response.json()).then(json => {
            let itemTemp = {};
            let movies = [];
            console.log('movie 1', json.results.length);
            json.results.map((item) => {
                itemTemp = {};
                itemTemp.title = item.title;
                itemTemp.poster = item.poster_path;
                itemTemp.description = item.overview;
                itemTemp.date = item.release_date;
                movies.push(itemTemp);
            })
            console.log('movies', movies);
            this.setState({
                movies
            })
        })
    }

    onClick() {
        console.log('Click Card')
    }

    render() {        
        return(
            <div className="container">
                <h1 className="text-center">Popular</h1>
                <div className="row text-center">
                        {this.state.movies.map((item, key) => {
                            return(
                                <div className="col-12 col-lg-4">
                                    <Card 
                                        item={item} 
                                        key={key}
                                        onClick={() => this.onClick(key)}/>
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