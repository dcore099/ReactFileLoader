import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HelloWorld } from './components/HelloWorld';
import "bootstrap/dist/css/bootstrap.min.css";
import { UploadComponent } from './components/UploadComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />


        <HelloWorld></HelloWorld>
        <UploadComponent></UploadComponent>

      </header>
    </div>
  );
}

export default App;
