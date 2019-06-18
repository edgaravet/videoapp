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
      matches: [],
      folowedVs: [],
      fVs: [],
      user: {},
      modal: false,
      disabled: false,
      loading: true,
      watch: false
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
    var channelID = "UC80PWRj_ZU8Zu0HSMNVwKWw";

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
    c;
    return (
      <div className="row">
        <input
          type="text"
          onChange={this.handleSearch.bind(this)}
          placeholder="search"
          value={this.state.value}
        />
        {finematchvideo.map((item, index) => (
          <div key={index} className="col-4">
            <div className="thumbnail">
              <div className="border">
                <iframe
                  title="myFrame"
                  width="100%"
                  src={`https://www.youtube.com/embed/${item.id.videoId}`}
                />
                <p>{item.snippet.title}</p>
              </div>
              <div className="caption">
                <div className="row">
                  <div className="col-xs-12 col-md-6">
                    {(() => {
                      if (this.state.user.uid != null && this.state.folowedVs) {
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
                              className="btn btn-success"
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
                            className="btn btn-success"
                            id={item.id.videoId}
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
