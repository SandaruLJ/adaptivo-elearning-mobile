import { configureStore, createSlice } from "@reduxjs/toolkit";

import courseSlice from "./course-slice";

const store = configureStore({
  reducer: {
    course: courseSlice.reducer,
  },
});

export default store;
