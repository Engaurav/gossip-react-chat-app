import React, { Component } from "react";
import ChatContainer from "./ChatContainer";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "../pages/Login";
import Register from "../pages/Register";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          
          <Routes>
            <Route exact path="/" element={<ChatContainer/>}/>
            <Route exact path="/login" element={ <Login /> } />
            <Route exact path="/register" element ={<Register /> }/>
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
