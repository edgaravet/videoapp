import React from "react";

class Youtube extends React.Component {
  state = { videos: [], loading: true };

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
    const { loading, videos } = this.state;

    if (loading) {
      return null;
    }

    return this.state.videos.map((item, index) => (
      <div className="youtube">
        <iframe
          width="420"
          height="315"
          src={`https://www.youtube.com/embed/${item.id.videoId}`}
        />
      </div>
    ));
  }
}

export default Youtube;
