import "./css/todo.css";

import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import Week from "./components/Week";

import store from "./store";
import { Provider } from "react-redux";

function ToDo() {
  return (
    <Provider store={store}>
      <div className="todoContainer">
        <TopBar />
        <div className="todoContents">
          <SideBar />
          <Week />
        </div>
      </div>
    </Provider>
  );
}

export default ToDo;
