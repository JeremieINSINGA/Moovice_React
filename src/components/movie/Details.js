import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CardActor from '../actor/CardActor';
import Button from '../core/Button';
import Icon from '../core/Icon';
import Config from '../../Config';

import './Details.css';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idMovie: 0,
            detailsMovie: {},
            trailerMovie: {},
            actors: [],
            idMoviesList: this.getLocalStorage(),
        }
        this.onClickFavorite = this.onClickFavorite.bind(this);
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
        this.chargedDetailsMovie(idMovie);
        this.chargedActors(idMovie);
    }

    componentDidUpdate(prevProps) {
        console.log('Details#componentDidUpdate');
        if (prevProps.value !== this.props.value) {
            this.chargedDetailsMovie(this.state.idMovie)
        }
    }

    chargedDetailsMovie(idMovie) {
        const url = `${Config.API_ROOT}movie/${idMovie}?api_key=${Config.API_KEY}&language=${this.props.language}`;
        fetch(url).then((response) => response.json()).then(json => {
            let detailsMovie = {};
            detailsMovie.id             = json.id;
            detailsMovie.title          = json.title;
            detailsMovie.originalTitle  = json.original_title;
            detailsMovie.poster         = json.poster_path;
            detailsMovie.description    = json.overview;
            detailsMovie.date           = json.release_date;
            detailsMovie.genres         = json.genres;
            this.setState({
                detailsMovie
            })
        })
        const urlTrailer = `${Config.API_ROOT}movie/${idMovie}/videos?api_key=${Config.API_KEY}&language=${this.props.language}`;
        fetch(urlTrailer).then((response) => response.json()).then(json => {
            let trailerMovie = {};
            trailerMovie.id = json.id;
            if (json.results[0] !== undefined) {
                trailerMovie.key = json.results[0].key;
                this.setState({
                    trailerMovie
                })
            }
        })
    }

    chargedActors(idMovie) {
        const urlActor = `${Config.API_ROOT}movie/${idMovie}/casts?api_key=${Config.API_KEY}`;
        fetch(urlActor).then((response) => response.json()).then(json => {
            let actorTemp = {};
            let actors = [];
            json.cast.map((actor) => {
                actorTemp                = {};
                actorTemp.character      = actor.character;
                actorTemp.name           = actor.name;
                actorTemp.profile        = actor.profile_path;
                actorTemp.gender         = actor.gender;
                actors.push(actorTemp);
                this.setState({
                    actors
                })
            })
        })
    }

    getLocalStorage() {
        let idMoviesList = localStorage.getItem('myList');
        idMoviesList = JSON.parse(idMoviesList);
        return idMoviesList
    }

    onClickFavorite(idMovie) {
        if (this.state.idMoviesList) {
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

    render(){        
        const { language } = this.props;
        const { detailsMovie, idMoviesList, trailerMovie, actors } = this.state;
        let genres = {...detailsMovie};
        genres = genres.genres;
        const src = Config.IMG_ROOT + detailsMovie.poster;
        const alt = 'Poster of ' + detailsMovie.title;
        const urlTrailer = Config.TRAILER_ROOT + trailerMovie.key;
        let releaseDate = '';
        let returnButton = '';
        if (language === "en") {
            releaseDate = 'Release Date : ';
            returnButton = 'Return';
        } else if (language === "fr") {
            releaseDate = 'Date de Sortie : ';
            returnButton = 'Retour';
        }
        let icon = '';
        if (idMoviesList) {
            if (idMoviesList.includes(detailsMovie.id)) {
                icon = 'favorite'
            } else {
                icon = 'favorite_border'
            }
        } else {
            icon = 'favorite_border'
        }
        

        return(
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-12 col-lg-3">
                        <img className="img_details" src={src} alt={alt} />
                        <Link to={'/popular'}>
                            <Button>
                                {returnButton}
                            </Button>
                        </Link>
                        
                    </div>
                    <div className="col-12 col-lg-8">
                        <h1 className="text-center">{detailsMovie.title}</h1> 
                        <Icon 
                            onClickFavorite = {this.onClickFavorite}
                            icon = {icon}
                            id = {detailsMovie.id }
                        />                       
                        <h4 className="text-center mt-3">{detailsMovie.originalTitle}</h4>
                        <div className="row mb-3">
                            {genres === undefined ? '' : genres.map((genre, i) => <div className="col-2 movie-genre text-center" key={i}>{genre.name}</div>)}
                        </div>
                        <h5>Synopsie : </h5>
                        <p>{detailsMovie.description}</p>
                        <h6>{releaseDate}{detailsMovie.date}</h6>
                        {trailerMovie.key === undefined ? '' : 
                            <button type="button" className="btn btn-primary video-btn mt-5" data-toggle="modal" data-src={urlTrailer} data-target="#myModal">
                                {language === 'fr' ? 'Voir la bande annonce' : 'See the trailer'}
                            </button>
                        }
                    </div>
                </div>
                <h2>Actors</h2>
                <div className="row justify-content-between">                    
                    {actors.map((actor, index) => {
                        return(
                            <CardActor 
                                actor={actor}
                                language={language}
                                key={index}
                            />
                        )
                    })}
                </div>
                {/* -- Modal -- */}
                <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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