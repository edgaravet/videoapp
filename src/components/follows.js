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

  unfollowVideo = event => {
    var fVideos = [];
    var isAdmin = window.confirm("are you sure delete");
    if (isAdmin === true) {
      if (this.state.user.uid) {
        this.state.videos.forEach(function(item) {
          if (event.target.id !== item.v_id) {
            fVideos.push(item);
          }
        });
        if (fVideos) {
          fire
            .database()
            .ref("/videos/" + this.state.user.uid)
            .set(fVideos);
        }
      }
    }
  };

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      this.setState({
        user: user
      });
      if (user) {
        fire
          .database()
          .ref("/")
          .on("value", snapshot => {
            if (snapshot.val()) {
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
        {(() => {
          if (this.state.videos) {
            return (
              <div className="row">
                {this.state.videos.map((item, index) => (
                  <div key={index} id={`video_${item.v_id}`} className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                      <div className="img-thumbnail">
                        <iframe
                          title="myFrame"
                          width="100%"
                          height="200"
                          src={`https://www.youtube.com/embed/${item.v_id}`}
                        />
                        
                        <input
                          className="btn btn-danger"
                          id={item.v_id}
                          onClick={this.unfollowVideo.bind(this)}
                          type="button"
                          value="Unfollow"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          }
        })()}
      </div>
    );
  }
}

export default Follows;
