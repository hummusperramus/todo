import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTasks } from "../todoSlice";

function RemoveTask() {
  const tasks = useSelector((state) => state.todo.tasks);
  let checkedTasks = [];
  const modalTask = useRef();
  const removeTaskForm = useRef();
  let dispatch = useDispatch();
  const showTaskModal = (ev) => {
    if (tasks.length === 0) {
      alert("No tasks to remove. Please first add some tasks");
      return;
    }
    modalTask.current.style.display = "block";
  };
  const closeTaskModal = () => {
    modalTask.current.style.display = "none";
    removeTaskForm.current.reset();
    checkedTasks = [];
  };
  const removeTaskSubmit = (ev) => {
    ev.preventDefault();
    if (checkedTasks.length === 0) {
      alert("Please select at least one task to delete");
      return false;
    }
    fetch("/api/tasks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tasks: checkedTasks,
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data.result === "OK") {
          dispatch(removeTasks(checkedTasks));
          closeTaskModal();
          checkedTasks = [];
        } else {
          alert("There was an error with your request.");
        }
      });
  };
  const checkTask = (ev) => {
    if (ev.target.checked) {
      checkedTasks.push(ev.target.value * 1);
    } else {
      checkedTasks = checkedTasks.filter((el) => el !== ev.target.value * 1);
    }
  };
  return (
    <>
      <img
        src="/img/taskRemove.svg"
        alt="Remove task"
        title="Remove task"
        onClick={showTaskModal}
      ></img>
      <div id="myModal" ref={modalTask} className="modal">
        <form
          className="modal-content"
          onSubmit={removeTaskSubmit}
          ref={removeTaskForm}
        >
          <div className="close" onClick={closeTaskModal}>
            &times;
          </div>
          Select tasks to remove:
          <div className="todoModalDays">
            {tasks.map((task, i) => (
              <label key={"lblRT" + i}>
                <input
                  type="checkbox"
                  key={"cbRT" + i}
                  value={task.id_task}
                  onClick={checkTask}
                ></input>
                {task.task}
              </label>
            ))}
          </div>
          <button className="btnModal">Remove</button>
        </form>
      </div>
    </>
  );
}

export default RemoveTask;
