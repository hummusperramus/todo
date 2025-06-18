import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCategory } from "../todoSlice";

function AddCategory() {
  const modalCategory = useRef();
  const categoryName = useRef();
  const categoryForm = useRef();
  const categories = useSelector((state) => state.todo.categories);
  let dispatch = useDispatch();
  const showCategoryModal = (ev) => {
    modalCategory.current.style.display = "block";
    categoryName.current.focus();
  };
  const closeCategoryModal = () => {
    modalCategory.current.style.display = "none";
    categoryForm.current.reset();
  };
  const categorySubmit = (ev) => {
    ev.preventDefault();
    fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: categoryName.current.value,
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data.result === "OK") {
          dispatch(addCategory(data.data[0]));
          closeCategoryModal();
        } else {
          alert(
            "There was an error with your request. Make sure the category name is new."
          );
        }
      });
  };
  return (
    <>
      <img
        src="/img/category.svg"
        alt="Add category"
        title="Add category"
        onClick={showCategoryModal}
      ></img>
      <div id="myModal" ref={modalCategory} className="modal">
        <form
          className="modal-content"
          onSubmit={categorySubmit}
          ref={categoryForm}
        >
          <div className="close" onClick={closeCategoryModal}>
            &times;
          </div>
          <input
            placeholder="Category name"
            ref={categoryName}
            required
          ></input>
          <button className="btnModal">Add</button>
        </form>
      </div>
      <span
        className={"tooltipAddCat" + (categories.length ? " hideToolTip" : "")}
      >
        First add a category -&gt;
      </span>
    </>
  );
}

export default AddCategory;
