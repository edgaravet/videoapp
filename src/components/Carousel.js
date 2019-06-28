import React from "react";
import { Carousel } from "react-responsive-carousel";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: []
    };
  }

  render() {
    return (
      <Carousel autoPlay>
        {this.props.imgUrl.map((item, index) => (
          <div className="slider">
            <img src={item.snippet.thumbnails.high.url} />
            <p className="legend">{item.snippet.title}</p>
          </div>
        ))}
      </Carousel>
    );
  }
}

export default Slider;
