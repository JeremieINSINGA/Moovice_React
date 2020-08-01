import React, { Component } from 'react';
import './Details.css';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idMovie: 0,
            detailsMovie: {},
            trailerMovie: {},
        }
    }

    componentDidMount() {
        // let id = this.props.match.params.id;
        // console.log(id);
        let urlCourante = document.location.href;
        let arrUrl = urlCourante.split('/');
        let idMovie = arrUrl[arrUrl.length-1];
        this.setState({
            idMovie
        })
        const url = `https://api.themoviedb.org/3/movie/${idMovie}?api_key=d15480851b1c788638106a997f9e5127&language=${this.props.language}`;
        fetch(url).then((response) => response.json()).then(json => {
            let detailsMovie = {};
            detailsMovie.id             = json.id;
            detailsMovie.title          = json.title;
            detailsMovie.originalTitle  = json.original_title;
            detailsMovie.poster         = json.poster_path;
            detailsMovie.description    = json.overview;
            detailsMovie.date           = json.release_date;
            this.setState({
                detailsMovie
            })
        })
        const urlTrailer = `https://api.themoviedb.org/3/movie/${idMovie}/videos?api_key=d15480851b1c788638106a997f9e5127&language=${this.props.language}`;
        fetch(urlTrailer).then((response) => response.json()).then(json => {
            let trailerMovie = {};
            trailerMovie.id = json.id;
            trailerMovie.key = json.results[0].key;
            this.setState({
                trailerMovie
            })
        })
    }

    componentDidUpdate() {
        const url = `https://api.themoviedb.org/3/movie/${this.state.idMovie}?api_key=d15480851b1c788638106a997f9e5127&language=${this.props.language}`;
        fetch(url).then((response) => response.json()).then(json => {
            let detailsMovie = {};
            detailsMovie.id             = json.id;
            detailsMovie.title          = json.title;
            detailsMovie.originalTitle  = json.original_title;
            detailsMovie.poster         = json.poster_path;
            detailsMovie.description    = json.overview;
            detailsMovie.date           = json.release_date;
            this.setState({
                detailsMovie
            })
        })
        const urlTrailer = `https://api.themoviedb.org/3/movie/${this.state.idMovie}/videos?api_key=d15480851b1c788638106a997f9e5127&language=${this.props.language}`;
        fetch(urlTrailer).then((response) => response.json()).then(json => {
            let trailerMovie = {};
            trailerMovie.id = json.id;
            trailerMovie.key = json.results[0].key;
            this.setState({
                trailerMovie
            })
        })
        
    }

    render(){
        const src = 'https://image.tmdb.org/t/p/w300/' + this.state.detailsMovie.poster;
        const alt = 'Poster of ' + this.state.detailsMovie.title;
        const urlTrailer = 'https://www.youtube.com/embed/' + this.state.trailerMovie.key;
        return(
            <div className="container">
                <h1 className="text-center">{this.state.detailsMovie.title}</h1>
                <h4 className="text-center">{this.state.detailsMovie.originalTitle}</h4>
                <img src={src} alt={alt} />
                <p>{this.state.detailsMovie.description}</p>
                <h6 className="text-center">{this.state.detailsMovie.date}</h6>
                <iframe width="560" height="315" src={urlTrailer} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        );
    }
}

export default Details