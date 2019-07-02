import React from "react";
import fire from "./config";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalFooter
} from "mdbreact";
import ModalVideo from "react-modal-video";
import ScrollUpButton from "react-scroll-up-button";
import { MDBCol } from "mdbreact";
import "bootstrap/dist/js/bootstrap.min.js";
import bootbox from "bootbox";
import "../styles/search.css";
import "../styles/modal.css";
import "../styles/video.css";

import "react-responsive-carousel/lib/styles/carousel.min.css";

class Youtube extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      matches: [],
      folowedVs: [],
      fVs: [],
      user: {},
      modal: false,
      disabled: false,
      loading: true,
      watch: false,
      isOpen: false,
      videoId: null
    };
    this.openModal = this.openModal.bind(this);
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
      modal: !true
    });
  };

  /* ---------------- Search function ---------------- */

  handleSearch = e => {
    this.setState({
      watch: true
    });
    let val = e.target.value.toLowerCase();
    let matches = this.state.videos.filter(v => v.snippet.title.toLowerCase().includes(val));
    this.setState({
      matches: matches
    });
  };

  log = () => {
    return (window.location.href = "/login");
  };

  signUp = () => {
    return (window.location.href = "/registration");
  };
  openModal() {
    this.setState({ isOpen: true });
  }


 /*--------------- User Video Unfollow Function ---------------       */

  unfollowVideo = event => {
    let fVideos = [];
    let folowedVs = this.state.folowedVs;
    let uid = this.state.user.uid;
    let target_id = event.target.id;

    bootbox.confirm("Are you sure?", function(result) {
      if (result === true) {
        folowedVs.forEach(function(item) {
          if (target_id !== item.v_id) {
            fVideos.push(item);
          }
        });

        if (fVideos.length === 0) {
          window.location.reload();
        }
        if (fVideos) {
          fire
            .database()
            .ref("/videos/" + uid)
            .set(fVideos);
        }
      }
    });
  };

  /* ---------------- Create User Follow Video ---------------    */

  createFollow(event) {
    
    const { fVs } = this.state;

    if (this.state.user.uid) {
      if (this.state.fVs) {
        fVs.push({
          u_id: this.state.user.uid,
          v_id: event.target.id,
          v_img: event.target.dataset.id,
          v_title: event.target.dataset.title,
          v_description: event.target.dataset.description
        });
        this.setState({ fVs: fVs });
        fire
          .database()
          .ref("/videos/" + this.state.user.uid)
          .set(this.state.fVs);
      }
    } else {
      this.setState({
        modal: !this.state.modal
      });
    }
  }

/*--------------------------------Get video from Youtube  --------------------*/

  getYoutubeVideos() {
    this.authListener();
    let that = this;
    let API_key = "AIzaSyDrr-_QwBWb_QWRp7Bacswfz0KeYDWbjIE";
    let channelID = "UCPPPrnT5080hPMxK1N4QSjA";
    let maxResults = 21;
    let url =
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

    fire.auth().onAuthStateChanged(user => {
      if (user) {
        fire
          .database()
          .ref("/")
          .on("value", snapshot => {
            if (snapshot.val()) {
              Object.keys(snapshot.val().videos).map((key, index) =>
                this.setState({
                  folowedVs: snapshot.val().videos[user.uid],
                  fVs: snapshot.val().videos[user.uid],
                  loading: false
                })
              );
            }
          });
      }
    });
  }

  componentDidMount() {
    this.getYoutubeVideos();
  }

  render() {
    let finematchvideo = [];
    const { loading } = this.state;
    if (loading) {
      return null;
    }

    if (this.state.watch === false) {
      finematchvideo = this.state.videos;
    } else {
      finematchvideo = this.state.matches;
    }

    return (
      <>
        <div className="active-pink-3 active-pink-4 mb-4">
          <MDBCol md="12">
            <input
              className='"form-control"'
              type="text"
              onChange={this.handleSearch.bind(this)}
              placeholder="Search"
              value={this.state.value}
            />
          </MDBCol>

          
          <h1 className="videos">Videos</h1>
          <div className="container">
            <div className="row">
              {finematchvideo.map((item, index) => (
                <div key={index} className="col-md-4" id={item.id.videoId}>
                  <div className="card mb-4 shadow-sm">
                    <img
                      alt="img"
                      className="img-thumbnail"
                      onClick={() =>
                        this.setState({
                          isOpen: true,
                          videoId: item.id.videoId
                        })
                      }
                      src={item.snippet.thumbnails.high.url}
                    />
                    <div className="card-body">
                      <h5>{item.snippet.title}</h5>
                      <p className="card-text">{item.snippet.description}</p>
                    </div>
                    <div className="d-flex follow_btn justify-content-between align-items-center">
                      <div className="btn-group">
                        {(() => {
                          if (
                            this.state.user.uid != null &&
                            this.state.folowedVs
                          ) {
                            if (
                              this.state.folowedVs.find(
                                folowedV => folowedV.v_id === item.id.videoId
                              )
                            ) {
                              return (
                                <input
                                  type="button"
                                  className="btn btn-danger"
                                  id={item.id.videoId}
                                  data-id={item.snippet.thumbnails.high.url}
                                  data-title={item.snippet.title}
                                  data-description={item.snippet.description}
                                  onClick={this.unfollowVideo.bind(this)}
                                  value="Unfollow"
                                />
                              );
                            } else {
                              return (
                                <input
                                  type="button"
                                  className="btn btn-sm btn-outline-secondary"
                                  id={item.id.videoId}
                                  data-id={item.snippet.thumbnails.high.url}
                                  data-title={item.snippet.title}
                                  data-description={item.snippet.description}
                                  onClick={this.createFollow.bind(this)}
                                  value="Follow"
                                />
                              );
                            }
                          } else {
                            return (
                              <input
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                id={item.id.videoId}
                                data-id={item.snippet.thumbnails.high.url}
                                data-title={item.snippet.title}
                                data-description={item.snippet.description}
                                onClick={this.createFollow.bind(this)}
                                value="Follow"
                              />
                            );
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <ModalVideo
              isOpen={this.state.isOpen}
              videoId={this.state.videoId}
              onClose={() => this.setState({ isOpen: false })}
            />
          </div>
          <div>
            <ScrollUpButton className="topButton" />
          </div>
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
      </>
    );
  }
}

export default Youtube;
