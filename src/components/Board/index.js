import React, { Component } from "react";
import Chessman from "../Chessman";
import defaultPositions from "../../defaultPositions";
import getChessmanPosition from "../../helpers/getXY";
import getRealFigureNum from "../../helpers/getRealFigureNum";
import getAllowedTurns from "../../helpers/getAllowedTurns";
import "./index.css";

const boardSquareColors = (x, y) => {
  const darkColor = "#87723f";
  const whiteColor = "#f7f7f7";
  if (y % 2) {
    return { backgroundColor: x % 2 ? whiteColor : darkColor };
  }
  return { backgroundColor: x % 2 ? darkColor : whiteColor };
};

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTurn: this.props.activeTurn,
      allowedMoves: [],
      draggedItem: null,
      activeSquare: null,
      positions: this.props.defaultPositions,
      intersectionBoxes: null
    };
  }
  onDragEnd(e) {
    const { intersectionBoxes } = this.state;
    const { x, y } = e;
    for (let el of intersectionBoxes) {
      if (x >= el.left && x <= el.right) {
        if (y >= el.top && y <= el.bottom) {
          const newUpdateAt = getRealFigureNum(el.pos);
          const newPositions = this.state.positions.filter(obj => {
            return (
              obj.position !== newUpdateAt &&
              obj.position !== this.state.draggedItem.position
            );
          });
          const newChessItem = getChessmanPosition([
            { ...this.state.draggedItem, ...{ position: newUpdateAt } }
          ]);
          newPositions.push(newChessItem[0]);
          this.setState({
            activeTurn: this.state.activeTurn === "white" ? "black" : "white",
            positions: newPositions
          });
        }
      }
    }
    this.setState({
      draggedItem: null,
      allowedMoves: [],
      intersectionBoxes: []
    });
  }
  onMouseDown(e, item) {
    const allyes = this.state.positions.filter(obj => {
      return obj.color === item.color;
    });
    const allowedMoves = getAllowedTurns(item, allyes);

    this.setState(
      {
        draggedItem: item,
        allowedMoves: allowedMoves
      },
      () => {
        const activeEls = document.getElementsByClassName("Board--allow");
        const activeSqCoordinates = [];
        [...activeEls].forEach(element => {
          let box = element.getBoundingClientRect();
          activeSqCoordinates.push({
            pos: element.dataset.pos,
            left: box.left,
            top: box.top,
            right: box.left + box.width,
            bottom: box.top + box.height
          });
          this.setState({
            intersectionBoxes: activeSqCoordinates
          });
        });
      }
    );
  }
  render() {
    const squares = [];
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        let isHighligted = [];
        if (this.state.allowedMoves) {
          isHighligted = this.state.allowedMoves.filter(o => {
            return o.y === y + 1 && o.x === x + 1;
          });
        }
        squares.push(
          <div
            key={`${x}-${y}`}
            data-pos={[x + 1, y + 1].join("")}
            className={`Board ${isHighligted.length ? "Board--allow" : ""}`}
            onMouseOver={e => {
              if (this.state.draggedItem && isHighligted.length) {
                this.setState({
                  activeSquare: [x + 1, y + 1]
                });
              }
            }}
            style={boardSquareColors(x, y)}
          />
        );
      }
    }

    const chessman = this.state.positions.map((item, index) => {
      return (
        <Chessman
          onDragEnd={e => this.onDragEnd(e, item)}
          onMouseDown={e => this.onMouseDown(e, item)}
          activeTurn={this.state.activeTurn}
          key={index}
          posY={item.y}
          posX={item.x}
          color={item.color}
          figure={item.chessman}
        />
      );
    });
    return squares.concat(chessman);
  }
}

Board.defaultProps = {
  activeTurn: "white",
  defaultPositions: getChessmanPosition(defaultPositions)
};

export default Board;
