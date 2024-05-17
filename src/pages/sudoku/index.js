import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board.js';
import Menu from './Menu.js';
import Header from '../../components/Header'
var _ = require('lodash');

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: 33
    };
  }
  handleGeneration = (initial) => {
    this.setState({ initial: initial });
  };

  render() {
    return (<div className="game">
      <Header component="link" to="/evolution" />
      <div className="game-board">
        <Board key={_.random(0, 10000)} initial={this.state.initial} />
        <div className="game-menu">
          <Menu onGenerate={this.handleGeneration} />
        </div>
      </div>
    </div>);
  }
}

