import React, { Component } from 'react';
import logo from './img/logo.png';
import {words} from './utils/words'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // state
    this.state = {
      word: null,
      finishedWords: [],
      skippedWords: [],
      gameFinished: false,
    };

    // binding methods
    this.getNextWord = this.getNextWord.bind(this);
    this.startGame = this.startGame.bind(this);
    this.nextWord = this.nextWord.bind(this);
    this.skipWord = this.skipWord.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.readyToStart = this.readyToStart.bind(this);

    this.getNextWord();
  }

  startGame() {
    this.setState({word: this.getNextWord()})
    this.setState({finishedWords: []})
    this.setState({skippedWords: []})
    this.setState({gameFinished: false})
  }

  readyToStart() {
    this.setState({word: null})
    this.setState({finishedWords: []})
    this.setState({skippedWords: []})
    this.setState({gameFinished: false})
  }

  nextWord() {
    this.state.finishedWords.push(this.state.word);
    this.setState({word: this.getNextWord()})
  }

  skipWord() {
    this.state.skippedWords.push(this.state.word);
    this.setState({word: this.getNextWord()})
  }

  stopGame() {
    this.setState({gameFinished: true})
  }

  getNextWord() {
    const randomIndex = parseInt(Math.random() * words.length);
    return words[randomIndex];
  }

  render() {
    const word = this.state.word;
    const gameIsRunning = this.state.word !== null && !this.state.gameFinished;
    const gameFinished = this.state.gameFinished;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="Vef Alias" />
          <h1 className="App-title">Vef Alias</h1>
        </header>
        <div>
          <div className="number-of-finished">Orð kláruð: {this.state.finishedWords.length}</div>
          <div className="number-of-skipped">Orð sleppt: {this.state.skippedWords.length}</div>
        </div>
        <div className="action-container">
          {gameIsRunning ?
            <div className="game-container">
              <div className="word-header">orð:</div>
              <div className="word">{this.state.word}</div>
              <div className="button positive-btn button-margin-top" onClick={this.nextWord}>Næsta</div>
              <div className="button negative-btn button-margin-top" onClick={this.skipWord}>Sleppa</div>
              <div className="button neutral-btn button-margin-top" onClick={this.stopGame}>Stoppa</div>
            </div>
          : !gameIsRunning && !gameFinished ?
            <div>
              <button className="button positive-btn" onClick={this.startGame}>Byrja</button>
            </div>
          : null
          }
          {gameFinished ?
            <div className="game-container">

              <div className="word-header">Kláruð orð</div>
              {this.state.finishedWords.map(function(word){
                   return <div className="word-final" key={ word }>{word}</div>;
                 })}

              <br />

              <div className="word-header">Ókláruð orð</div>
              {this.state.skippedWords.map(function(word){
                   return <div className="word-final" key={ word }>{word}</div>;
                 })}

              <button className="button positive-btn button-margin-top" onClick={this.readyToStart}>Byrja aftur</button>
            </div> : null
          }
        </div>


      </div>
    );
  }
}

export default App;
