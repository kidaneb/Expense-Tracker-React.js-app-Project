import { createSlice } from "@reduxjs/toolkit";
import { setToExpenseArray } from "./expenseItemsArray";
import { setToBudgetArray } from "./budgetItemsArray";

const infoArraySlice = createSlice({
  name: "infoArray",
  initialState: {
    value: (() => {
      const storedArray = JSON.parse(localStorage.getItem("infoArray"));
      return storedArray || [];
    })(),
  },
  reducers: {
    addToInfoArray: (state, action) => {
      state.value = [action.payload, ...state.value];
    },
    removeFromInfoArray: (state, action) => {
      state.value = state.value.filter((item) => {
        if (item.id === action.payload) {
          return false;
        } else {
          return true;
        }
      });
    },
    // filterInfoArray: (state, action) => {
    //   const { id,action1, action2 } = action.payload;
    //   const filteredValue = state.value.filter((item) => {
    //     if (item.id === id) {
    //       if (item.category === "Expense Reset") {
    //         action2;
    //       }
    //       if (item.category === "Budget Reset") {
    //         action1;
    //       }
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   });

    //   state.value = filteredValue;
    // },
  },
});

export const { addToInfoArray, removeFromInfoArray } = infoArraySlice.actions;
const infoArrayReducer = infoArraySlice.reducer;
export default infoArrayReducer;
