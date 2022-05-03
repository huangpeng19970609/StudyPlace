import { Component } from "react";
import ReduxTest from "./pages/reduxTest";
import "./App.css";
import store from "./store/store.js";
import { Provider } from "react-redux";

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <ReduxTest></ReduxTest>
        </Provider>
      </div>
    );
  }
}
export default App;
