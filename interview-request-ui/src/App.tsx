import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navigation from './components/navigation/navigation';
import Home from "./components/home/home";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
      <React.Fragment>
        <Router>				
          <div className="App">
            <Navigation/>
            <Switch>
              <Route exact path="/" component={Home}/>
            </Switch>
          </div>
        </Router>
      </React.Fragment>
  	);
}

export default App;
