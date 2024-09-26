import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize = 25;
  apiKey = 'a434e38d7622419b90c6f568921655d0';
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/"              element={<News pageSize={this.pageSize} key="general" apiKey={this.apiKey} category={'general'} country='us' />} />
            <Route exact path="/business"      element={<News pageSize={this.pageSize} key="business" apiKey={this.apiKey} category={'business'} country='us' />} />
            <Route exact path="/entertainment" element={<News pageSize={this.pageSize} key="entertainment" apiKey={this.apiKey} category={'entertainment'} country='us' />} />
            <Route exact path="/science"       element={<News pageSize={this.pageSize} key="science" apiKey={this.apiKey} category={'science'} country='us' />} />
            <Route exact path="/health"        element={<News pageSize={this.pageSize} key="health" apiKey={this.apiKey} category={'health'} country='us' />} />
            <Route exact path="/sports"        element={<News pageSize={this.pageSize} key="sports" apiKey={this.apiKey} category={'sports'} country='us' />} />
            <Route exact  path="/technology"   element={<News pageSize={this.pageSize} key="technology" apiKey={this.apiKey} category={'technology'} country='us' />} />
          </Routes>
        </Router>
      </div> 
    );
  }
}

