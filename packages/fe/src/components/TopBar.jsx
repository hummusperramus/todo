import "../css/topbar.css";
import AddTask from "./AddTask";
import RemoveTask from "./RemoveTask";
import AddCategory from "./AddCategory";
import RemoveCategory from "./RemoveCategory";

function TopBar() {
  return (
    <div className="todoTopBar">
      <RemoveTask />
      <AddTask />
      <RemoveCategory />
      <AddCategory />
      <div className="topTitle">Week planner</div>
    </div>
  );
}

export default TopBar;
