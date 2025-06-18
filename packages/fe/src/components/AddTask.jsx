import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../todoSlice";

function AddTask() {
  const categories = useSelector((state) => state.todo.categories);
  const modalTask = useRef();
  const taskName = useRef();
  const taskDescription = useRef();
  const taskDay0 = useRef();
  const taskDay1 = useRef();
  const taskDay2 = useRef();
  const taskDay3 = useRef();
  const taskDay4 = useRef();
  const taskDay5 = useRef();
  const taskDay6 = useRef();
  const taskForm = useRef();
  const taskCategory = useRef();
  let dispatch = useDispatch();
  const showTaskModal = (ev) => {
    modalTask.current.style.display = "block";
    taskName.current.focus();
  };
  const closeTaskModal = () => {
    modalTask.current.style.display = "none";
    taskForm.current.reset();
  };
  const taskSubmit = (ev) => {
    ev.preventDefault();
    let days = [
      taskDay0.current.checked,
      taskDay1.current.checked,
      taskDay2.current.checked,
      taskDay3.current.checked,
      taskDay4.current.checked,
      taskDay5.current.checked,
      taskDay6.current.checked,
    ];
    if (!days.some((el) => el)) {
      alert("Please select at least one day for the task");
      return false;
    }
    fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: taskName.current.value,
        description: taskDescription.current.value,
        category: taskCategory.current.value * 1,
        days,
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data.result === "OK") {
          dispatch(addTask(data.data[0]));
          closeTaskModal();
        } else {
          alert(
            "There was an error with your request. Make sure the task name is new."
          );
        }
      });
  };
  return (
    <>
      <img
        src="/img/task.svg"
        alt="Add task"
        title="Add task"
        onClick={showTaskModal}
      ></img>
      <div id="myModal" ref={modalTask} className="modal">
        <form className="modal-content" onSubmit={taskSubmit} ref={taskForm}>
          <div className="close" onClick={closeTaskModal}>
            &times;
          </div>
          <input placeholder="Task name" ref={taskName} required></input>
          <textarea
            placeholder="Description"
            ref={taskDescription}
            rows="4"
          ></textarea>
          Days:
          <div className="todoModalDays">
            <label>
              <input type="checkbox" ref={taskDay0}></input>Sunday
            </label>
            <label>
              <input type="checkbox" ref={taskDay1}></input>Monday
            </label>
            <label>
              <input type="checkbox" ref={taskDay2}></input>Tuesday
            </label>
            <label>
              <input type="checkbox" ref={taskDay3}></input>Wednesday
            </label>
            <label>
              <input type="checkbox" ref={taskDay4}></input>Thursday
            </label>
            <label>
              <input type="checkbox" ref={taskDay5}></input>Friday
            </label>
            <label>
              <input type="checkbox" ref={taskDay6}></input>Saturday
            </label>
          </div>
          Category:
          <select ref={taskCategory} required>
            <option value="">Select...</option>
            {categories.map((cat, i) => (
              <option value={cat.id_category} key={"modalCat-" + i}>
                {cat.category}
              </option>
            ))}
          </select>
          <button className="btnModal">Add</button>
        </form>
      </div>
    </>
  );
}

export default AddTask;
