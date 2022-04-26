import './App.css';
import React  from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Population from './Population/Population';
import IpInfo from './IpInfo/IpInfo';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/ipinfo">IP Info</Link>
            </li>
            <li>
              <Link to="/population">Population</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/ipinfo" element={<IpInfo />} />
          <Route path="/population" element={<Population />}/>
          <Route path="/" element={<IpInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
