import { Component } from "react";
import { app } from "./../../utils/firebase";

class FetcherRoom extends Component {
  state = {
    loader: false,
    room: {}
  };

  componentDidMount() {
    this.setState({ loader: true }, () => {
      const refRoom = app.database().ref(`todos/${this.props.idRoom}`);
      refRoom.on("value", snapshot => {
        this.setState(
          {
            room: snapshot.val()
          },
          () => this.setState({ loader: false })
        );
      });
    });
  }

  render() {
    return this.props.children(this.state);
  }
}

export default FetcherRoom;
