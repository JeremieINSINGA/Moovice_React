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
      value: false,
    }
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
  }

  componentDidMount() {
    console.log('App#componentDidMount');
  }

  componentDidUpdate() {
    console.log('App#componentDidUpdate');
  }

  componentDidCatch() {
    console.log('App#componentDidCatch');
  }

  onChangeLanguage(language) {
    this.setState({
      language
    });
    this.setState(({ value }) => ({ value: !value }))
  }
  

  render() {
    const { language, value } = this.state;
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
                <Popular language={language} value={value}/>
              </Route>
              <Route exact path="/popular_battle">
                <PopularBattle language={language} value={value}/>
              </Route>
              <Route exact path="/my_list">
                <MyList language={language} value={value}/>
              </Route>
              <Route path="/movie_detail/:id">
                <Details language={language} value={value}/>
              </Route>
              <Route component={NotFound} />           
            </Switch>
          </Router>
        </>
      
    );
  }
}

export default App;