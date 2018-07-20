import { Component } from "react";
import { app } from "./../../utils/firebase";

class FetcherTodo extends Component {
  state = {
    loader: false,
    room: {}
  };

  componentDidMount() {
    this.setState({ loader: true }, () => {
      const refRoom = app
        .database()
        .ref(`todos/${this.props.idRoom}/${this.props.idTodo}`);
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

  componentDidUpdate(prevProps) {
    if (this.props.idTodo !== prevProps.idTodo && this.props.idTodo) {
      this.setState({ loader: true }, () => {
        const refRoom = app
          .database()
          .ref(`todos/${this.props.idRoom}/${this.props.idTodo}`);
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
  }

  render() {
    return this.props.children(this.state);
  }
}

export default FetcherTodo;
