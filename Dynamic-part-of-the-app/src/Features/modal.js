import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    value: false,
  },
  reducers: {
    modalSet: (state) => {
      state.value = true;
    },
    modalNotSet: (state) => {
      state.value = false;
    },
  },
});

export const { modalSet, modalNotSet } = modalSlice.actions;
const modalReducer = modalSlice.reducer;
export default modalReducer;
