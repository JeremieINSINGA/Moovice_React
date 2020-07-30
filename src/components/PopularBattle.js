import React, { Component } from 'react'

class PopularBattle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        }
    }

    componentDidMount() {
        const url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d15480851b1c788638106a997f9e5127';
        fetch(url).then((response) => response.json()).then(json => {
            console.log('movie 1', json.results[0].title);
        })
    }
    
    render() {
        return(
            <div>
                <h1>Popular Battle</h1>
            </div>
        );
    }
}

export default PopularBattle;