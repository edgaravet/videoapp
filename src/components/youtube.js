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
import 'bootstrap/dist/js/bootstrap.min.js';
import bootbox from "bootbox";

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
      isOpenYouku: false,
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

  handleSearch = e => {
    this.setState({
      watch: true
    });
    let val = e.target.value;
    let matches = this.state.videos.filter(v => v.snippet.title.includes(val));
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
  unfollowVideo = event => {

    var fVideos = [];

    var folowedVs = this.state.folowedVs;
    var uid = this.state.user.uid;
    var target_id = event.target.id

    bootbox.confirm("Are you sure?", function(result){
      folowedVs.forEach(function(item) {
        if (target_id !== item.v_id) {
          fVideos.push(item);
        }
      });
      if (fVideos) {
        fire
          .database()
          .ref("/videos/" + uid)
          .set(fVideos);
      }
    })

  };

  createFollow = event => {
    if (this.state.user.uid) {
      this.state.fVs.push({
        u_id: this.state.user.uid,
        v_id: event.target.id,
        v_img: event.currentTarget.dataset.id,
        v_title: event.currentTarget.dataset.title,
        v_description: event.currentTarget.dataset.description,
        v_count: event.currentTarget.dataset.count
      });

      event.target.value = "Followed";
      event.target.className = "btn btn-primary";

      fire
        .database()
        .ref("/videos/" + this.state.user.uid)
        .set(this.state.fVs);
    } else {
      this.setState({
        modal: !this.state.modal
      });
    }
  };

  getYoutubeVideos() {
    this.authListener();
    var that = this;
    var API_key = "AIzaSyC8ujfTlBGK6Ex9tGN6I8LfGNsWFO83Czo";
    var channelID = "UCjmJDM5pRKbUlVIzDYYWb6g";

    var maxResults = 21;
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
        data.items.map((item, index) =>
          fetch(
            "https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=" +
              item.id.videoId +
              "&key=" +
              API_key
          )
            .then(res => res.json())
            .then(
              result => {
                  item.viewCount = result.items[0].statistics.viewCount;
              },
              error => {
                console.log(error);
              }
            )
        );
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
        <div className="container">
          <div className="row">
            {finematchvideo.map((item, index) => (
              <div key={index} className="col-md-4" id={item.id.videoId}>
                <div className="card mb-4 shadow-sm">
                  <img
                    alt="img"
                    className="img-thumbnail"
                    onDoubleClick={() =>
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
                                  data-id={item.snippet.thumbnails.high.url}
                                  data-title={item.snippet.title}
                                  data-description={item.snippet.description}
                                  data-count={item.viewCount}
                                  type="button"
                                  className="btn btn-danger"
                                  id={item.id.videoId}
                                  onClick={this.unfollowVideo.bind(this)}
                                  value="Unfollow"
                                />
                            );
                          } else {
                            return (
                                <input
                                  data-id={item.snippet.thumbnails.high.url}
                                  data-title={item.snippet.title}
                                  data-description={item.snippet.description}
                                  data-count={item.viewCount}
                                  type="button"
                                  className="btn btn-sm btn-outline-secondary"
                                  id={item.id.videoId}
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
                                onClick={this.createFollow.bind(this)}
                                value="Follow"
                              />
                      
                          );
                        }
                      })()}
                    </div>
                    <small className="text-muted">
                      {item.viewCount + " views"}
                    </small>
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
    );
  }
}

export default Youtube;
