import React from "react";

class Spinner extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    );
  }
}

export default Spinner;
