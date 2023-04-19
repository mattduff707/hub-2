import { Provider } from "react-redux";
import MainScreen from "./layout/MainScreen";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <main>
        <MainScreen />
      </main>
    </Provider>
  );
}

export default App;
