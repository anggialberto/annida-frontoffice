import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.scss';
// import './normalize.css';
// import 'antd/dist/antd.css';
import 'antd/dist/antd.min.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
  </React.StrictMode>
);
