import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { publicRoutes } from './routes'

import './App.css'


export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />
          })}
        </Routes> 
      </div>
    </Router>
  );
}


