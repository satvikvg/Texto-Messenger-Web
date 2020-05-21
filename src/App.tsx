import React from "react";
import "./App.css";
import AppContainer from "./components/AppContainer";
import { Provider } from "react-redux";
import configureStore from "./store";

const store = configureStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
