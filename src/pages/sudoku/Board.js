import React from 'react';
import { ButtonBase } from "@material-ui/core";
import * as sg from './sudokuGenerator.js';
var _ = require('lodash');


export default class Board extends React.Component {
  constructor(props) {
    super(props);
    let startingBoard = sg.generateStartingBoard(this.props.initial);
    this.state = {
      showAlert: false,
      squares: startingBoard,
      status: {
        msg: '',
        color: 'blue',
        display: 'none',
      }
    };
  }

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  }

  handleSubmit(e, i) {
    const squares = this.state.squares.slice();
    squares[i].value = e.target.value;
    this.setState({ squares: squares });
  }

  handleValidation(squares) {
    const cells = sg.elementsToPositions(squares.slice());
    let emptyCells = cells.map(cell => cell.value === '').filter(v => v).length;
    let msg = emptyCells + ' گزینه باقی مانده';
    let color = 'blue';

    let neighbours;
    cells.forEach((cell) => {
      cell.classes.delete(" conflict");
      if (cell.value) {
        neighbours = sg.getNeighbours(cell.coords, cells);
        neighbours.forEach((neighbour, i) => {
          if (neighbour) {
            if (String(neighbour.value) === String(cell.value)) {
              cell.classes.add(" conflict");
              msg = 'مغایرت در اعداد';
              color = 'red';
            }
          }
        });
      }
    });
    let newSquares = sg.elementsToPositions(cells);
    this.setState({
      squares: newSquares,
      status: {
        msg: msg,
        color: color
      }
    });

    // Check for win
    let hasConflict = cells.map(cell => cell.classes).map(set => set.has(" conflict")).includes(true);
    let hasEmpty = cells.map(cell => cell.value).includes('');
    if (!hasEmpty && !hasConflict) {
      this.setState({
        status: {
          msg: 'پازل حل شد!!!',
          color: 'green'
        }
      });
    }
  }

  createBoard() {
    let board = [];
    let row;
    let block;
    // Generate blocks
    for (let i = 0; i < 9; i++) {
      block = [];
      for (let j = 0; j < 3; j++) {
        row = [];
        for (let k = 0; k < 3; k++) {
          row.push(this.renderSquare(i * 9 + j * 3 + k));
        }
        block.push(<div className="board-row" key={j}>{row}</div>);
      }
      board.push(<div className="block" key={i}>{block}</div>);
    }
    board.push(<div className={"button-wrapper"}><ButtonBase className="validation" onClick={() => {
      this.handleValidation(this.state.squares)
      setTimeout(() => {
        this.setState({
          status: {
            display:"none"
          }
        }); }, 3000);
      }} key={"v-" + _.random(0, 1000)}>اتمام</ButtonBase></div>);
    // board.push(<span className="status" key="stats" style={{
    //   color: this.state.status.color,
    // }}>{this.state.status.msg}</span>);
    return (board);
  }

  renderSquare(i) {
    let disabled = false;
    if (this.state.squares[i].initial) {
      disabled = true;
    }

    let className = "";
    this.state.squares[i].classes.forEach((element) => className += element);

    return (<Square value={this.state.squares[i].value} disabled={disabled} className={className} key={i} onKeyDown={this.handleKeyPress} onChange={(e) => this.handleSubmit(e, i)} />);
  }

  render() {
    return (<div className={"game-wrapper"}><h2 className="title">سودوکو</h2>
      {this.createBoard()}
      <div className="status" style={{ display: this.state.status.display }}>{this.state.status.msg}</div>
    </div>);
  }
}

class Square extends React.Component {
  render() {
    return (<input value={this.props.value} type="text" disabled={this.props.disabled} pattern="[1-9]" maxLength="1" className={this.props.className} onChange={this.props.onChange} onKeyDown={this.props.onKeyDown} />);
  }
}
