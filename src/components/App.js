import React, { Component } from "react";
import ChatContainer from "./ChatContainer";
import Navbar from "./Navbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <ChatContainer />
      </div>
    );
  }
}

export default App;
