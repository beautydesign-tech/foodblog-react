import { BrowserRouter } from "react-router-dom";
import Main from "./components/MainComponent";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
import "./App.css";

const store = ConfigureStore();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
