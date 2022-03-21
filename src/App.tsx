import React from 'react';
import './App.scss';
import GameCard from './components/GameCard/GameCard';
import Header from './components/Header.tsx/Header';
import Panel from './components/Panel/Panel';

const App: React.FC = (props) => {
  return (
    <div className="app-wrapper">
      <Header/>
      <GameCard/>
      <Panel/>
    </div>
  );
}

export default App;
