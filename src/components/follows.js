import React from "react";
import "../App.css";
import fire from "./config";

class Follows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      user: {},
      loading: true
    };
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        fire
          .database()
          .ref("/")
          .on("value", snapshot => {
            if (snapshot.val() != undefined) {
              Object.keys(snapshot.val().videos).map((key, index) =>
                this.setState({
                  videos: snapshot.val().videos[user.uid],
                  loading: false
                })
              );
            }
          });
      }
    });
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return null;
    }
    return (
      <div className="container">
        <div className="row">
          {this.state.videos.map((item, index) => (
            <div key={index} className="col-4">
              <div className="thumbnail">
                <div className="youtube">
                  <iframe
                    title="myFrame"
                    width="100%"
                    height="250"
                    src={`https://www.youtube.com/embed/${item.v_id}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Follows;
