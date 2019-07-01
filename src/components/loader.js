import React from "react";

class Spinner extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only"></span>
      </div>
    );
  }
}

export default Spinner;
