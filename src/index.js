import React from 'react';
import ReactDOM from 'react-dom/client';
import { LocationProvider } from '@reach/router';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import './index.css';
import './style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LocationProvider>
    <App />
  </LocationProvider>
);