import React from "react";
import Header from "./Header.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="app__header">
        <Header />
      </div>
      <div className="app__body"></div>
    </div>
  );
}

export default App;
