import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from './components/Navbar';
import Discover from './components/Discover';
import DiscoverBattle from './components/DiscoverBattle';
import Popular from './components/Popular';
import PopularBattle from './components/PopularBattle';
import MyList from './components/MyList';

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
      <Router>
        <div>
          <Navbar onChangeLanguage={this.onChangeLanguage} language={language}/>
          <Switch>
            <Route path="/week_battle">
              <DiscoverBattle />
            </Route>
            <Route path="/popular">
              <Popular language={language}/>
            </Route>
            <Route path="/popular_battle">
              <PopularBattle />
            </Route>
            <Route path="/my_list">
              <MyList />
            </Route>            
            <Route path="/">
              <Discover />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;