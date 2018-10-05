import React, { Component } from "react";
import Board from "./components/Board";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-wrap">
          <Board />
        </div>
      </div>
    );
  }
}

export default App;
