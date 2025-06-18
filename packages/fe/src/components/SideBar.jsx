import { useEffect } from "react";
import "../css/sidebar.css";
import { useSelector, useDispatch } from "react-redux";
import { setCategories, setSelectedCategory } from "../todoSlice";

function SideBar() {
  const categories = useSelector((state) => state.todo.categories);
  const selectedCategory = useSelector((state) => state.todo.selectedCategory);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/api/categories")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        dispatch(setCategories(data));
      });
  }, [dispatch]);

  const btnHandler = (ev) => {
    if (selectedCategory !== ev.target.dataset.category * 1) {
      dispatch(setSelectedCategory(ev.target.dataset.category * 1));
    } else {
      dispatch(setSelectedCategory(-1));
    }
  };

  return (
    <div className="todoSideBar">
      {categories.map((cat) => (
        <button
          type="button"
          className={
            "button-55 todoCategory" +
            (cat.id_category % 3) +
            (selectedCategory === cat.id_category ? " selectedCat" : "")
          }
          key={"cat-" + cat.id_category}
          data-category={cat.id_category}
          onClick={btnHandler}
        >
          {cat.category}
        </button>
      ))}
    </div>
  );
}

export default SideBar;
