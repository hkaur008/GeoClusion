import React, { Component } from "react";
import "./Header.css";

export default class Header extends Component {
  render() {
    return (
      <div>
        <div className="head">
          <div className="container-left">
          </div>
          <div className="container-center">
            <p>
              <span className="color2">
                Around the World
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
