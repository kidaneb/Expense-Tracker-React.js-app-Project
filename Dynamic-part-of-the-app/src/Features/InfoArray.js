import { createSlice } from "@reduxjs/toolkit";

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
    filterInfoArray:(state,action)=>{
      state.value = state.value.filter(item=> item.id !== action.payload);
    }
  },
});

export const { addToInfoArray, filterInfoArray,removeFromInfoArray } = infoArraySlice.actions;
const infoArrayReducer = infoArraySlice.reducer;
export default infoArrayReducer;
