// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import the default CSS file
import App from './app'; // Import the root App component

// Render the app into the 'root' div in index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // This should match the id in index.html
);
