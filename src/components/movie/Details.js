import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../core/Button';
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
        this.chargedDetailsMovie(idMovie)
    }

    componentDidUpdate(prevProps) {
        console.log('componentDidUpdate');
        if (prevProps.value !== this.props.value) {
            this.chargedDetailsMovie(this.state.idMovie)
        }
    }

    chargedDetailsMovie(idMovie) {
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

    render(){
        const src = 'https://image.tmdb.org/t/p/w300/' + this.state.detailsMovie.poster;
        const alt = 'Poster of ' + this.state.detailsMovie.title;
        const urlTrailer = 'https://www.youtube.com/embed/' + this.state.trailerMovie.key;
        let releaseDate = '';
        if (this.props.language === "en") {
            releaseDate = 'Release Date : ';
        } else if (this.props.language === "fr") {
            releaseDate = 'Date de Sortie : ';
        }

        return(
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-12 col-lg-3">
                        <img src={src} alt={alt} />
                        <Link to={'/popular'}>
                            <Button>
                                Retour Details
                            </Button>
                        </Link>
                        
                    </div>
                    <div className="col-12 col-lg-8">
                        <h1 className="text-center">{this.state.detailsMovie.title}</h1>
                        <h4 className="text-center">{this.state.detailsMovie.originalTitle}</h4>
                        <p>{this.state.detailsMovie.description}</p>
                        <h6 className="text-center">{releaseDate}{this.state.detailsMovie.date}</h6>
                        <button type="button" className="btn btn-primary video-btn" data-toggle="modal" data-src={urlTrailer} data-target="#myModal">
                            {this.props.language === 'fr' ? 'Voir la bande annonce' : 'See the trailer'}
                        </button>
                    </div>
                </div>         
                
                {/* -- Modal -- */}
                <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>        
                                {/* -- 16:9 aspect ratio -- */}
                                <div className="embed-responsive embed-responsive-16by9">
                                    <iframe className="embed-responsive-item" src={urlTrailer} id="video"  allowscriptaccess="always" allow="autoplay"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* <iframe width="560" height="315" src={urlTrailer} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
            </div>
        );
    }
}

export default Details