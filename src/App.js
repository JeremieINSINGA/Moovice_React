import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
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
  }

  

  render() {
    return(
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/week_battle">
              <DiscoverBattle />
            </Route>
            <Route path="/popular">
              <Popular />
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