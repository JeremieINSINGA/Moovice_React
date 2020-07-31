import React, { Component } from 'react';
import Button from './core/Button'

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.onClickButtonLanguage = this.onClickButtonLanguage.bind(this);
    }
    

    onClickButtonLanguage() {
        console.log("Navbar#OnClick")
        let language = ''
        if (this.props.language === 'en') {
            language = 'fr'
        } else if (this.props.language === 'fr') {
            language = 'en'
        }
        this.props.onChangeLanguage(language)
    }

    render() {
        let { language } = this.props;
        let thisWeek = '';
        let thisWeekBattle = '';
        let popular = '';
        let popularBattle = '';
        let myList = '';
        if (language === "fr") {
            language = 'en';
            thisWeek = 'Cette Semaine';
            thisWeekBattle = 'Battle de la semaine';
            popular = 'Populaire';
            popularBattle = 'Battle populaire';
            myList = 'Ma Liste';
        } else if (language === 'en') {
            language = 'fr';
            thisWeek = 'This Week';
            thisWeekBattle = 'This Week Battle';
            popular = 'Popular';
            popularBattle = 'Popular Battle';
            myList = 'My List';
        }

        return(
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Moovice</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">{thisWeek} <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/week_battle">{thisWeekBattle}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/popular">{popular}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/popular_battle">{popularBattle}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/my_list">{myList}</a>
                        </li>
                    </ul>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <Button
                        onClick={this.onClickButtonLanguage}
                    >
                        {language}
                    </Button>
                </ul>
            </nav>
        );
    }
}

export default Navbar