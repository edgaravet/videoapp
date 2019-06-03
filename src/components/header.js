import React from "react";
import "../App.css";
import Registration from './registration';

class Header extends React.Component {
  render() {
    return (
      <div>
        <div>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Follows</a>
            </li>
            <li>
              <a href={'/registration'}>Registration</a>
            </li>
          </ul>
        </div>

        <div align="right" className="search">
          <input />
          <button type="submit">search</button>
        </div>
        
      </div>

    );
  }
}

export default Header;
