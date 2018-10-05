import React, { Component } from "react";
import getImageSrc from "./getImageSrc";
import "./index.css";

class Chessman extends Component {
  state = {
    isDragging: false,
    activeTurn: this.props.activeTurn,
    originalX: 0,
    originalY: 0,

    translateX: 0,
    translateY: 0,

    lastTranslateX: 0,
    lastTranslateY: 0
  };

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  }

  onMouseDown({ clientX, clientY }) {
    if (this.props.activeTurn !== this.props.color) {
      return
    }
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
    this.setState({
      originalX: clientX,
      originalY: clientY,
      isDragging: true,
      zIndex: 100
    });
    this.props.onMouseDown();
  }

  handleMouseMove = ({ clientX, clientY }) => {
    const { isDragging } = this.state;
    const { onDrag } = this.props;

    if (!isDragging) {
      return;
    }

    this.setState(
      {
        translateX: clientX - this.state.originalX,
        translateY: clientY - this.state.originalY
      },
      () => {
        if (onDrag) {
          this.props.onDrag();
        }
      }
    );
  };

  handleMouseUp = ({ clientX, clientY }) => {

    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);

    this.setState(
      {
        translateX: 0,
        translateY: 0,
        isDragging: false,
        zIndex: 0
      },
      () => {
        if (this.props.onDragEnd) {
          this.props.onDragEnd({
            x: clientX,
            y: clientY
          });
        }
      }
    );
  };

  onDragStart(e) {
    e.preventDefault();
  }
  render() {
    const chessmanPosition = () => {
      const { posX, posY } = this.props;
      return {
        zIndex: this.state.zIndex,
        transform: `translate(
          ${this.state.translateX}px,
          ${this.state.translateY}px
          )`,
        top: 12.5 * posY - 12.5 + "%",
        left: 12.5 * posX - 12.5 + "%"
      };
    };

    return (
      <div
        className="Chessman"
        onMouseDown={e => this.onMouseDown(e)}
        onMouseUp={e => this.handleMouseUp(e)}
        onDragStart={e => this.onDragStart(e)}
        style={{ ...this.props.style, ...chessmanPosition() }}
      >
        <img
          src={getImageSrc(this.props.color, this.props.figure)}
          alt={`${this.props.figure}_${this.props.color}`}
        />
      </div>
    );
  }
}

Chessman.defaultProps = {
  style: {
    position: "absolute",
    width: "12.5%",
    height: "12.5%"
  }
};

export default Chessman;
