import React from "react";
import "../App.css";
import fire from "./config";

class Follows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      user: {},
      loading: true,
      uId : null
    };
  }
  
  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({uId:user.uid});
      } 
    });

    let ref = fire.database().ref("/");
    ref.on("value", snapshot => {
      this.setState({videos: snapshot.val().videos})
      var subjects = this.state.videos
     if(this.state.uId != null){
        Object.keys(subjects).map((key, index) => (
          this.setState({videos: subjects[this.state.uId] , loading: false})
        ))
      }
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
              src={`https://www.youtube.com/embed/${item.v_id}`}
            />
          </div>
        </div>
      </div>
    ));
  }
}

export default Follows;
