import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Button from './core/Button';

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
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">Moovice</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <NavLink exact className="nav-link" activeClassName="active" to="/"> 
                                {thisWeek}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact className="nav-link" activeClassName="active" to="/week_battle"> 
                                {thisWeekBattle}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact className="nav-link" activeClassName="active" to="/popular"> 
                                {popular}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact className="nav-link" activeClassName="active" to="/popular_battle"> 
                                {popularBattle}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact className="nav-link" activeClassName="active" to="/my_list"> 
                                {myList}
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="nav navbar-nav navbar-right">
                        <Button
                            onClick={this.onClickButtonLanguage}
                        >
                            {language}
                        </Button>
                    </ul>
                </div>                
            </nav>
        );
    }
}

export default Navbar