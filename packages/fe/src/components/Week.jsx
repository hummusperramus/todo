import { useEffect } from "react";
import "../css/week.css";
import { useSelector, useDispatch } from "react-redux";
import { setDays, setTasks, updateTask, setProcessing } from "../todoSlice";

function Week() {
  const days = useSelector((state) => state.todo.days);
  const tasks = useSelector((state) => state.todo.tasks);
  const filteredTasks = useSelector((state) => state.todo.filteredTasks);
  const processing = useSelector((state) => state.todo.processing);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/api/days")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        dispatch(setDays(data));
      });
    fetch("/api/tasks")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        dispatch(setTasks(data));
      });
  }, [dispatch]);

  const taskDoneClick = (ev) => {
    dispatch(setProcessing(true));
    let dayID = ev.currentTarget.dataset.day * 1;
    let taskID = ev.currentTarget.dataset.task * 1;
    let task = tasks.filter((t) => t.id_task === taskID)[0];
    let days = JSON.parse(task.days).data;
    let done = JSON.parse(task.done).data;
    let i = days.indexOf(dayID);
    done[i] = !done[i];
    fetch("/api/tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: taskID,
        done: JSON.stringify({ data: done }),
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        dispatch(updateTask([taskID, JSON.stringify({ data: done })]));
        dispatch(setProcessing(false));
      });
  };

  return (
    <div className="todoWeek">
      {days.map((_, i) => {
        let dayToday = new Date().getDay();
        let day = days[(i + dayToday) % days.length];
        return (
          <div
            className={
              "todoDay" +
              (i % 2) +
              (dayToday === day.id_day ? " todayHead" : "")
            }
            key={"dayContent" + i}
          >
            <div
              className={
                "todoDay" + (dayToday === day.id_day ? " todayHead" : "")
              }
              key={"dayTitle-" + i}
            >
              {day.day}
            </div>
            {filteredTasks
              .filter((task) =>
                task.days.includes((i + dayToday) % days.length)
              )
              .map((task, j) => {
                let tDays = JSON.parse(task.days).data;
                let done = JSON.parse(task.done).data;
                let styleTask = done[
                  tDays.indexOf((i + dayToday) % days.length)
                ]
                  ? " todoTaskDone"
                  : "";
                let taskDone = done[tDays.indexOf((i + dayToday) % days.length)]
                  ? " taskDoneBtn"
                  : "";
                return (
                  <button
                    className={
                      "todoTask todoCategory" + (task.category % 3) + taskDone
                    }
                    key={"task" + i + "-" + j}
                    data-task={task.id_task}
                    data-day={day.id_day}
                    onClick={taskDoneClick}
                    style={{ cursor: processing ? "wait" : "pointer" }}
                  >
                    <div className={"todoTaskName" + styleTask}>
                      {task.task}
                    </div>
                    <div className="todoTaskDesc">{task.description}</div>
                  </button>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}

export default Week;
