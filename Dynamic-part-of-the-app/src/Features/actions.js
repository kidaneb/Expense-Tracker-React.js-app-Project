import { setToBudgetArray } from "./budgetItemsArray";
import { setToExpenseArray } from "./expenseItemsArray";

export function filterInfoArray(id, budgetArray, expenseArray) {
  return (dispatch, getState) => {
    const state = getState();

    // Use map to create a new array with the filtered items
    const filteredValue = state.value.map((item) => {
      if (item.id === id) {
        if (item.category === "Expense Reset") {
          dispatch(setToExpenseArray(expenseArray));
        }
        if (item.category === "Budget Reset") {
          dispatch(setToBudgetArray(budgetArray));
        }
        return false;
      } else {
        return item; // Return the unchanged item for other cases
      }
    });

    // Update the state with the new array
    dispatch({ type: 'SET_VALUE', payload: filteredValue });
  };
}
