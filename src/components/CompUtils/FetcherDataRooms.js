import { Component } from "react";
import { app } from "./../../utils/firebase";

class FetcherDataRooms extends Component {
  state = {
    rooms: {},
    loader: false
  };

  componentDidMount() {
    this.setState(
      {
        loader: true
      },
      () => {
        const refRooms = app.database().ref("rooms/");
        refRooms.on("value", snapshot => {
          this.setState(
            {
              rooms: snapshot.val()
            },
            () => this.setState({ loader: false })
          );
        });
      }
    );
  }

  render() {
    return this.props.children(this.state);
  }
}

export default FetcherDataRooms;
