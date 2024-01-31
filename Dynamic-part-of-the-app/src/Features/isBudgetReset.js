import { createSlice } from "@reduxjs/toolkit";

const isBudgetResetSlice = createSlice({
  name: "isbudgetReset",
  initialState: {
    value: false,
  },
  reducers: {
    budgetReset: (state) => {
      state.value = true;
    },
    budgetNotReset: (state) => {
      state.value = false;
    },
  },
});

export const { budgetReset, budgetNotReset } = isBudgetResetSlice.actions;
const isBudgetResetReducer = isBudgetResetSlice.reducer;
export default isBudgetResetReducer;
