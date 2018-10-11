import React, { Component } from 'react';
import Login from './components/Login';
import GameList from './components/GameList';
import GameScreen from './components/GameScreen';
import './semantic.css';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import { connect } from 'react-redux';
import logo from './logo.svg';
class App extends Component {
  
  render() {
    return (
    <Router>
      <div className="App">
            <div className="ui one column center aligned page grid">
                <div className="column twelve wide">
                    <img src={logo} alt="logo"/>
                </div>
            </div>
            <div className="main container">
              <Route path='/' render={() => {return <Login store={this.props.store} />}} exact />
              <Route path='/gameList' render={() => {return <GameList store={this.props.store} />}} exact />
              <Route path='/gameScreen' render={() => {return <GameScreen store={this.props.store} />}} exact />
            </div>
      </div>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        credentials : state.credentials
    };
};

export default connect(mapStateToProps)(App);
