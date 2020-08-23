import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom"
import HomePage from './component/homePage';
import MainPage from './component/mainPage';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/to_do" component={MainPage}></Route>

        <Route path="/" component={HomePage}></Route>
      </Switch>
    </div>
  );
}

export default App;
