import React from "react";
import fire from "./config";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalFooter
} from "mdbreact";

class Youtube extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      folowedVs: [],
      loading: true,
      user: {},
      modal: false,
      disabled: false,
      loading: true
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
    
    if (this.state.user.uid) {
      this.state.folowedVs.push({
        u_id: this.state.user.uid,
        v_id: event.target.id
      });

      event.target.value = "Followed";
      event.target.className = "btn btn-primary";
      event.target.disabled = "disabled";

      fire
        .database()
        .ref("/videos/" + this.state.user.uid)
        .set(this.state.folowedVs);
    } else {
      this.setState({
        modal: !this.state.modal
      });
    }
  };

  componentDidMount() {
    this.authListener();
    var that = this;
    var API_key = "AIzaSyBsMzTeirX5WzsakfoVKe2K9dh9ulVT2uU";
    var channelID = "UCNfxB3nWgDIpkItC6KSqKsw";

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
            if (snapshot.val().videos) {
              Object.keys(snapshot.val().videos).map((key, index) =>
                this.setState({
                  folowedVs: snapshot.val().videos[user.uid],
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
      <div className="row">
        {this.state.videos.map((item, index) => (
          <div key={index} className="col-4">
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
                        if (this.state.folowedVs.find(folowedV => folowedV.v_id === item.id.videoId)) {
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
                              className="btn btn-success"
                              id={item.id.videoId}
                              onClick={this.createFollow.bind(this)}
                              value="Follow"
                            />
                          );
                        }
                      } else {
                        return (
                          <MDBBtn
                            history={this.props.history}
                            className="btn btn-success"
                            onClick={this.toggle}
                          >
                            Follow
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
