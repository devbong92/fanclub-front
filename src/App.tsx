import React from 'react';
import logo from './logo.svg';
import './App.css';

// add 
import Container from 'react-bootstrap/Container';
import BoardList from './components/BoardList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Container className="p-3">
        <BoardList></BoardList>
      </Container>

    </div>
  );
}

export default App;
