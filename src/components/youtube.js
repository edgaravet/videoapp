import React from "react";
import fire from "./config";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Youtube extends React.Component {
  constructor(props) {
    super(props);
    this.state = { videos: [], loading: true, user: {} };
  }

  componentDidMount() {
    this.authListener();
  }
  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: " " });
      }
    });
  }

  followFunc = (e) => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
      } else {
  
      }
    });
  };

  componentDidMount() {
    var that = this;
    var API_key = "AIzaSyCQqqyHQ6JfQ-9uhfxp_ze_pzvDHhJrX4M";
    var channelID = "UC17pt_Hz-hrpgtX8QS7zdPg";
    var maxResults = 20;
    var url =
      "https://www.googleapis.com/youtube/v3/search?key=" +
      API_key +
      "&channelId=" +
      channelID +
      "&part=snippet,id&order=date&maxResults=" +
      maxResults;

    fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        that.setState({ videos: data.items, loading: false });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return null;
    }

    return this.state.videos.map((item, index) => (
      <div className="col-4">
        <div className="thumbnail">
          <div className="youtube">
            <iframe
              title="myFrame"
              width="420"
              height="315"
              src={`https://www.youtube.com/embed/${item.id.videoId}`}
            />
          </div>
          <div className="caption">
            <div className="row">
              <div className="col-xs-12 col-md-6">
                <button
                  className="btn btn-success"
                  onClick={this.followFunc.bind(this)}
                >
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  }
}

export default Youtube;
