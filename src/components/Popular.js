import React, { Component } from 'react';
import Card from './movie/Card';
import { Redirect } from 'react-router-dom';
import './Popular.css';

class Popular extends Component {
    _goToDetails = false;
    idClicked = 0; 
    constructor(props) {
        super(props);
        this.state = {
            movies: [], 
        }
        this.onClickCard = this.onClickCard.bind(this);
    }

    // componentDidMount() {
    //     const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&language=${this.props.language}&api_key=d15480851b1c788638106a997f9e5127`;
    //     fetch(url).then((response) => response.json()).then(json => {
    //         let itemTemp = {};
    //         let movies = [];
    //         json.results.map((item) => {
    //             itemTemp                = {};
    //             itemTemp.id             = item.id;
    //             itemTemp.title          = item.title;
    //             itemTemp.originalTitle  = item.original_title;
    //             itemTemp.poster         = item.poster_path;
    //             itemTemp.description    = item.overview;
    //             itemTemp.date           = item.release_date;
    //             movies.push(itemTemp);
    //         })
    //         this.setState({
    //             movies
    //         })
    //     })
    // }

    async componentDidMount(movies) {
        // Test pour voir si l'url est bien récupérée sinon balance une erreur
        try {
            const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&language=${this.props.language}&api_key=d15480851b1c788638106a997f9e5127`;
            if (!url.ok) {
                const res = await fetch(url);
                const data = await res.json();
        
                // On retourne un map des résultats en utilisant le paramètre "movies"
                movies = data.results.map((data) => ({
                    id: data.id,
                    title: data.title,
                    originalTitle: data.original_title,
                    poster: data.poster_path,
                    description: data.overview,
                    date: data.release_date
                }));
                
                // On retourne le résultat dans setStates
                    this.setState({
                        movies
                    });
            }
        } catch (error) {
          console.log(error);
        }
    }

    async componentDidUpdate(movies) {
        // Test pour voir si l'url est bien récupérée sinon balance une erreur
        try {
            const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&language=${this.props.language}&api_key=d15480851b1c788638106a997f9e5127`;
            if (!url.ok) {
                const res = await fetch(url);
                const data = await res.json();
        
                // On retourne un map des résultats en utilisant le paramètre "movies"
                movies = data.results.map((data) => ({
                    id: data.id,
                    title: data.title,
                    originalTitle: data.original_title,
                    poster: data.poster_path,
                    description: data.overview,
                    date: data.release_date
                }));
                
                // On retourne le résultat dans setStates
                    this.setState({
                        movies
                    });
            }
        } catch (error) {
          console.log(error);
        }
    }

    onClickCard(idClicked) {
        this._goToDetails = true;
        this._idClicked = idClicked;
    
    }

    render() {
        if (this._goToDetails) {
            return <Redirect to={`/movie_detail/${this._idClicked}`} />
        }
        return(
            <div className="container">
                <h1 className="text-center">Popular</h1>
                <div className="row text-center">
                        {this.state.movies.map((item) => {
                            return(
                                <div className="col-12 col-lg-4">
                                    <Card 
                                        item={item} 
                                        key={item.id}
                                        onClickCard={this.onClickCard}
                                    />
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