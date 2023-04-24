import { Provider, useSelector } from "react-redux";
import MainScreen from "./layout/MainScreen";
import { RootState, store } from "./store/store";
import { useEffect, useState } from "react";
import Main from "./layout/Main";

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
