//Importing Dependencies
import React from 'react';
import Header from './Header';
import Login from './Login';
import '../styles/App.css';
import { Switch, Route } from 'react-router-dom';

//Class initialization
class App extends React.Component{
  render(){
    return(
          <Switch>
            <Route exact path='/'><Login /></Route>
            <Route exact path='/home'><Header /></Route>
            <Route exact path='/create'><Header /></Route>
          </Switch>
    )
  }
}

export default App;
