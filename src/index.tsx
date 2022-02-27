import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router, 
  Routes,
  Route
} from "react-router-dom";
import { Sources } from './routes/Sources/Sources';
import { SourceDetail } from './routes/SourceDetail/SourceDetail';

ReactDOM.render(
  <React.StrictMode>
    <Router basename={'/homedevnews'}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sources" element={<Sources />} />
        <Route path="/sources/:id" element={<SourceDetail />} />
        <Route path="*" element={<h2 className='p-3'>Pagina non trovata</h2>} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
