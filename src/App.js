import React from 'react';
import './App.css';
import {Container} from 'semantic-ui-react'

import PlotGenerator from "./components/PlotGenerator/PlotGenerator"; 
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";


function App() {
  
  return (
    <div className="App">
      <Header />
      <Container>
        <PlotGenerator />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
