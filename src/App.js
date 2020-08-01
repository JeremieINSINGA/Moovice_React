import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from './components/Navbar';
import Discover from './components/Discover';
import DiscoverBattle from './components/DiscoverBattle';
import Popular from './components/Popular';
import PopularBattle from './components/PopularBattle';
import MyList from './components/MyList';
import Details from './components/movie/Details';
import NotFound from './components/NotFound';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'en',
    }
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
  }

  componentDidMount() {
    console.log('App#componentDidMount');
    localStorage.getItem('language', this.state.language);
  }

  componentDidUpdate() {
    console.log('App#componentDidUpdate');
    localStorage.getItem('language', this.state.language);
  }

  componentDidCatch() {
    console.log('App#componentDidCatch');
    localStorage.getItem('language', this.state.language);
  }

  onChangeLanguage(language) {
    this.setState({
      language
    });
  }
  

  render() {
    const { language } = this.state;
    return(
      
        <>
          <Navbar onChangeLanguage={this.onChangeLanguage} language={language}/>
          <Router>
            <Switch>
              <Route exact path="/" component={Discover}/>
              <Route exact path="/week_battle">
                <DiscoverBattle />
              </Route>
              <Route exact path="/popular">
                <Popular language={language}/>
              </Route>
              <Route exact path="/popular_battle">
                <PopularBattle />
              </Route>
              <Route exact path="/my_list" component={MyList} />
              <Route path="/movie_detail/:id">
                <Details language={language}/>
              </Route>
              <Route component={NotFound} />           
            </Switch>
          </Router>
        </>
      
    );
  }
}

export default App;