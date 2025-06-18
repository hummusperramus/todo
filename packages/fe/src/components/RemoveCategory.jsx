import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeCategories } from "../todoSlice";

function RemoveCategory() {
  const categories = useSelector((state) => state.todo.categories);
  let checkedCategories = [];
  const modalCategory = useRef();
  const removeCatForm = useRef();
  let dispatch = useDispatch();
  const showCatModal = (ev) => {
    if (categories.length === 0) {
      alert("No tasks to remove. Please first add some tasks");
      return;
    }
    modalCategory.current.style.display = "block";
  };
  const closeCatModal = () => {
    modalCategory.current.style.display = "none";
    removeCatForm.current.reset();
    checkedCategories = [];
  };
  const removeCatSubmit = (ev) => {
    ev.preventDefault();
    if (checkedCategories.length === 0) {
      alert("Please select at least one category to delete");
      return false;
    }
    if (
      window.confirm(
        "You are going to delete the selected categories along with their corresponding tasks. Do you want to continue?"
      ) === false
    ) {
      closeCatModal();
      return;
    }
    fetch("/api/categories", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categories: checkedCategories,
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data.result === "OK") {
          dispatch(removeCategories(checkedCategories));
          closeCatModal();
          checkedCategories = [];
        } else {
          alert("There was an error with your request.");
        }
      });
  };
  const checkCategory = (ev) => {
    if (ev.target.checked) {
      checkedCategories.push(ev.target.value * 1);
    } else {
      checkedCategories = checkedCategories.filter(
        (el) => el !== ev.target.value * 1
      );
    }
  };
  return (
    <>
      <img
        src="/img/categoryRemove.svg"
        alt="Remove category"
        title="Remove category"
        onClick={showCatModal}
      ></img>
      <div id="myModal" ref={modalCategory} className="modal">
        <form
          className="modal-content"
          onSubmit={removeCatSubmit}
          ref={removeCatForm}
        >
          <div className="close" onClick={closeCatModal}>
            &times;
          </div>
          Select categories to remove:
          <div className="todoModalDays">
            {categories.map((cat, i) => (
              <label key={"lblRC" + i}>
                <input
                  type="checkbox"
                  key={"cbRC" + i}
                  value={cat.id_category}
                  onClick={checkCategory}
                ></input>
                {cat.category}
              </label>
            ))}
          </div>
          <button className="btnModal">Remove</button>
        </form>
      </div>
    </>
  );
}

export default RemoveCategory;
