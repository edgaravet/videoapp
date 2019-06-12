import React, { Component } from "react";
import fire from "./config";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Login from "./login";

class Youtube extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      fVideos: [],
      loading: true,
      user: {},
      modal: false
    };
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
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  log = () => {
    return (window.location.href = "/login");
  };

  signUp = () => {
    return (window.location.href = "/registration");
  };

  createFollow = event => {
    if (this.state.user.uid != null) {
      this.state.fVideos.push({
        u_id: this.state.user.uid,
        v_id: event.target.id
      });

      fire
        .database()
        .ref("/videos/" + this.state.user.uid)
        .set(this.state.fVideos);
    } else {
      this.setState({
        modal: !this.state.modal
      });
    }
  };

  componentDidMount() {
    this.authListener();
    var that = this;
    var API_key = "AIzaSyCE6VhWsBQuikKPh0jsdrixVDOMq_1GxGk";
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
    const { auth } = this.props;
    if (loading) {
      return null;
    }
    return (
      <div className="row">
        {this.state.videos.map((item, index) => (
          <div className="col-4">
            <div className="thumbnail">
              <div className="border">
                <iframe
                  title="myFrame"
                  width="100%"
                  src={`https://www.youtube.com/embed/${item.id.videoId}`}
                />
              </div>
              <div className="caption">
                <div className="row">
                  <div className="col-xs-12 col-md-6">
                    {(() => {
                      if (this.state.user.uid != null) {
                        return (
                          <button
                            className="btn btn-success"
                            id={item.id.videoId}
                            onClick={this.createFollow.bind(this)}
                          >
                            Follow
                          </button>
                        );
                      } else {
                        return (
                          <MDBBtn
                            history={this.props.history}
                            className="btn btn-success"
                            onClick={this.toggle}
                          >
                            Follows
                          </MDBBtn>
                        );
                      }
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <MDBContainer className="ReactModal__Overlay">
          <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
            <MDBModalBody> Please Log In or Registration</MDBModalBody>
            <button className="registerbtn" onClick={this.log}>
              Log In{" "}
            </button>
            <button className="registerbtn" onClick={this.signUp}>
              Registration{" "}
            </button>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={this.toggle}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
      </div>
    );
  }
}

export default Youtube;
