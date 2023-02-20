import React from "react"
import './App.css';
import Card from "./componenets/Card";
import {BrowserRouter as Router,Routes,Route, BrowserRouter} from 'react-router-dom'
import Details from "./componenets/Detail";


function App() {
  return (
    <div className="App">
      <Router>
    <Routes>
        <Route index element={<Card/>}></Route>
        <Route exact path="movie/:id" element={<Details/>}></Route>
 </Routes>
     </Router>
    </div>
  );
}

export default App;
