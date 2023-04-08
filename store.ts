import { configureStore } from '@reduxjs/toolkit';
// import { Action, getType } from 'typesafe-actions';

// import todosReducer from '../features/todos/todosSlice'
// import filtersReducer from '../features/filters/filtersSlice'

export const store = configureStore({
  reducer: {
    // todos: todosReducer,
    // filters: filtersReducer
  },
})

