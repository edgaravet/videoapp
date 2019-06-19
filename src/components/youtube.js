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

  createFollow = event => {
    if (this.state.user.uid) {
      this.state.fVs.push({
        u_id: this.state.user.uid,
        v_id: event.target.id
      });

      event.target.value = "Followed";
      event.target.className = "btn btn-primary";
      event.target.disabled = "disabled";

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

  componentDidMount() {
    this.authListener();
    var that = this;
    var API_key = "AIzaSyCXT9A8P_AAn21_NytBSZfJ1ZHzo-lYHVc";
    var channelID = "UCuHzBCaKmtaLcRAOoazhCPA";

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

  render() {
    let finematchvideo = [];
    const { loading } = this.state;
    if (loading) {
      return null;
    }

    if (this.state.watch == false) {
      finematchvideo = this.state.videos;
    } else {
      finematchvideo = this.state.matches;
    }

    return (
      <div className="row">
        <input
          type="text"
          onChange={this.handleSearch.bind(this)}
          placeholder="search"
          value={this.state.value}
        />

          <div className="container">
            <div className="row">
              {finematchvideo.map((item, index) => (
                <div key={index} className="col-md-4">
                  <div className="card mb-4 shadow-sm">
                    <img
                      className="img-thumbnail"
                      onDoubleClick={() =>
                        this.setState({
                          isOpen: true,
                          videoId: item.id.videoId
                        })
                      }
                      src={`${item.snippet.thumbnails.high.url}`}
                    />
                    <div className="card-body">
                      <h5>{item.snippet.title}</h5>
                      <p className="card-text">
                        {item.snippet.description}
                      </p>
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
                                    className="btn btn-primary"
                                    id={item.id.videoId}
                                    onClick={this.createFollow.bind(this)}
                                    value="Followed"
                                    disabled="disabled"
                                  />
                                );
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
                        {/* https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=WDgM9qtPTn4&key=AIzaSyCXT9A8P_AAn21_NytBSZfJ1ZHzo-lYHVc */}
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
