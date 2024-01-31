import { createSlice } from "@reduxjs/toolkit";

const isExpenseResetSlice = createSlice({
  name: "isexpenseReset",
  initialState: {
    value: false,
  },
  reducers: {
    expenseReset: (state) => {
      state.value = true;
    },
    expenseNotReset: (state) => {
      state.value = false;
    },
  },
});

export const { expenseReset, expenseNotReset } = isExpenseResetSlice.actions;
const isExpenseResetReducer = isExpenseResetSlice.reducer;
export default isExpenseResetReducer;
