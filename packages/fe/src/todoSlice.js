import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    categories: [],
    tasks: [],
    days: [],
    filteredTasks: [],
    selectedCategory: -1,
    processing: false,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      if (state.selectedCategory === -1) {
        state.filteredTasks = state.tasks;
      } else {
        state.filteredTasks = state.tasks.filter(
          (el) => el.category === action.payload
        );
      }
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.filteredTasks = action.payload;
    },
    setProcessing: (state, action) => {
      state.processing = action.payload;
    },
    setDays: (state, action) => {
      state.days = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      if (action.payload === -1) {
        state.filteredTasks = state.tasks;
      } else {
        state.filteredTasks = state.tasks.filter(
          (el) => el.category === action.payload
        );
      }
    },
    updateTask: (state, action) => {
      let taskID = action.payload[0];
      let newDone = action.payload[1];
      let newTasks = state.tasks.map((t) => ({
        ...t,
        done: t.id_task === taskID ? newDone : t.done,
      }));
      state.tasks = newTasks;
      if (state.selectedCategory === -1) {
        state.filteredTasks = state.tasks;
      } else {
        state.filteredTasks = state.tasks.filter(
          (el) => el.category === state.selectedCategory
        );
      }
    },
    removeTasks: (state, action) => {
      let tasksToRemove = action.payload;
      state.tasks = state.tasks.filter(
        (el) => !tasksToRemove.includes(el.id_task)
      );
      if (state.selectedCategory === -1) {
        state.filteredTasks = state.tasks;
      } else {
        state.filteredTasks = state.tasks.filter(
          (el) => el.category === state.selectedCategory
        );
      }
    },
    removeCategories: (state, action) => {
      let catsToRemove = action.payload;
      state.categories = state.categories.filter(
        (el) => !catsToRemove.includes(el.id_category)
      );
      state.tasks = state.tasks.filter(
        (el) => !catsToRemove.includes(el.category)
      );
      if (state.selectedCategory === -1) {
        state.filteredTasks = state.tasks;
      } else {
        state.filteredTasks = state.tasks.filter(
          (el) => el.category === state.selectedCategory
        );
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addCategory,
  addTask,
  setCategories,
  setSelectedCategory,
  setDays,
  setTasks,
  removeTasks,
  removeCategories,
  updateTask,
  setProcessing,
} = todoSlice.actions;

export default todoSlice.reducer;

/*

initialState: {
    categories: [{"id_category":1,"category":"Workout"}],
    tasks: [
      {id_task: 1, task: 'Polish', days: '{"data":[0,1,2,3,4,5,6]}', description: 'Study for one hour', done: '{"data":[false,true,false,false,false,false,false]}', category: 1}],
    days: [{"id_day":1,"day":"Sunday"},{"id_day":2,"day":"Monday"}],
    filteredTasks: [
      {id_task: 1, task: 'Polish', days: '{"data":[0,1,2,3,4,5,6]}', description: 'Study for one hour', done: '{"data":[false,true,false,false,false,false,false]}', category: 1}],
    selectedCategory: -1
  }

  */
