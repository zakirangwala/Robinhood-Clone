import React from "react";
import Header from "./Header.js";
import Newsfeed from "./Newsfeed.js";
import Stats from "./Stats.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="app__header">
        <Header />
      </div>
      <div className="app__body">
        <div className="app__container">
          <Newsfeed />
          <Stats />
        </div>
      </div>
    </div>
  );
}

export default App;
