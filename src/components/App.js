import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { NewTodo, TodoTools } from "./../states/reducers";
import Header from "./CompUtils/Header";
import RoomView from "./Rooms";
import Room from "./Room/Room";

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const reducers = combineReducers({
  NewTodo,
  TodoTools
});
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Header>
              <Link to="/">Home</Link>
              <Link to="/rooms">Rooms</Link>
            </Header>
            <Route exact path="/" component={Home} />
            <Route path="/rooms" component={RoomView} />
            <Route path="/room/:id" component={Room} />
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
