import { createSlice } from "@reduxjs/toolkit";

const darkkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    value: "false",
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleDarkMode } = darkkModeSlice.actions;
const darkModeReducer = darkkModeSlice.reducer;
export default darkModeReducer;
