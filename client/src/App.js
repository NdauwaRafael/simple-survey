import { HashRouter as Router } from 'react-router-dom';
import React, { Fragment } from 'react';
import "./assets/sass/main.scss";
import Heaer from "./Pages/Layout/Heaer";
import AppRoutes from './Routes';


export default function App() {
  return (
    <Router>
    <Fragment>
        <Heaer/>
        <div className="container mt-5">
        {AppRoutes}
        </div>
    </Fragment>
    </Router>
  );
}
