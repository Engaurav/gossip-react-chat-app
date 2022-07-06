import React, { Component } from "react";
import ChatContainer from "./ChatContainer";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "../pages/Login";
import Register from "../pages/Register";
import { ToastContainer } from 'react-toastify';


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
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

export default App;
