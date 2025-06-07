import React from 'react';
import Squares from './components/Squares';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Squares 
        direction="horizontal" 
        speed={1} 
        borderColor="#000" 
        squareSize={50} 
        hoverFillColor="#ffcc00" 
        className="squares-background" 
      />
    </div>
  );
}

export default App;