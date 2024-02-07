import { configureStore } from "@reduxjs/toolkit";
import budgetArrayReducer from "../Features/budgetItemsArray";
import expenseArrayReducer from "../Features/expenseItemsArray";
import undoBudgetArrayReducer from "../Features/undoBudgetArray";
import undoExpenseArrayReducer from "../Features/undoExpenseArray";
import infoArrayReducer from "../Features/InfoArray";
import budgetReducer from "../Features/budget";
import expenseReducer from "../Features/expense";
import isBudgetResetReducer from "../Features/isBudgetReset";
import isExpenseResetReducer from "../Features/isExpenseReset";
import modalReducer from "../Features/modal";
import transactionItemIdReducer from "../Features/transactionItemId";
import darkModeReducer from "../Features/isDarkMode";
export default configureStore({
  reducer: {
    infoArray: infoArrayReducer,
    budgetArray: budgetArrayReducer,
    expenseArray: expenseArrayReducer,
    undoBudgetArray: undoBudgetArrayReducer,
    undoExpenseArray: undoExpenseArrayReducer,
    budget: budgetReducer,
    expense: expenseReducer,
    isBudgetReset: isBudgetResetReducer,
    isExpenseReset: isExpenseResetReducer,
    isModal: modalReducer,
    transactionItemId: transactionItemIdReducer,
    darkMode: darkModeReducer,
  },
});
