import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import AppRoutes from "./routes/index";
import ProgressBar from './common/ProgressBar/ProgressBar';
import './App.scss';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRoutes />
        <ProgressBar />
      </div>
  </Provider>
  );
}

export default App;
