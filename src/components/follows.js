import React from "react";
import "../App.css";
import fire from "./config";
import ModalVideo from "react-modal-video";
import 'bootstrap/dist/js/bootstrap.min.js';
import bootbox from "bootbox";

class Follows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      user: {},
      loading: true,
      isOpen: false,
      videoId: ""
    };
  }

  unfollowVideo = event => {
    var fVideos = [];
    var videos = this.state.videos;
    var uid = this.state.user.uid;
    var target_id = event.target.id
    bootbox.confirm("Are you sure?", function(result){
        videos.forEach(function(item) {
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
                  <div
                    key={index}
                    id={`video_${item.v_id}`}
                    className="col-md-4"
                  >
                    <div className="card mb-4 shadow-sm">
                      <div className="img-thumbnail">
                        <img
                          alt="img"
                          className="img-thumbnail"
                          onDoubleClick={() =>
                            this.setState({
                              isOpen: true,
                              videoId: item.v_id
                            })
                          }
                          src={item.v_img}
                        />
                        <div className="card-body">
                          <h5>{item.v_title}</h5>
                          <p className="card-text">{item.v_description}</p>
                        </div>
                        <div className="d-flex follow_btn justify-content-between align-items-center">
                          <div className="btn-group">
                            <input
                              className="btn btn-danger"
                              id={item.v_id}
                              onClick={this.unfollowVideo.bind(this)}
                              type="button"
                              value="Unfollow"
                            />
                            </div>
                            <span>{item.v_count+ ' views'}</span>
                        </div>
                        <div>
                          <ModalVideo
                            isOpen={this.state.isOpen}
                            videoId={this.state.videoId}
                            onClose={() => this.setState({ isOpen: false })}
                          />
                        </div>
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
