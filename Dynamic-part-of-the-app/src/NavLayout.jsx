import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
import { useContext } from "react";
import { MyContext, SharedContext } from "./SharedContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  filterBudgetArray,
  resetBudgetArray,
  setToBudgetArray,
} from "./Features/budgetItemsArray.js";

import { resetSpendingArray } from "./Features/spendingCategoryArray.js";
import { addToUndoBudgetArray } from "./Features/undoBudgetArray.js";
import { addToUndoExpenseArray } from "./Features/undoExpenseArray.js";
import { addToInfoArray } from "./Features/InfoArray.js";
import * as actionCreator from "./Features/actions.js";
import {
  filterExpenseArray,
  resetExpenseArray,
  setToExpenseArray,
} from "./Features/expenseItemsArray.js";
import { budgetNotReset } from "./Features/isBudgetReset.js";
import { expenseNotReset } from "./Features/isExpenseReset.js";
import { modalNotSet } from "./Features/modal.js";
export function NavLayout() {
  const infoArray = useSelector((state) => state.infoArray.value);
  const budgetItemsArray = useSelector((state) => state.budgetArray.value);
  const expenseItemsArray = useSelector((state) => state.expenseArray.value);
  const spendingCategoryArray = useSelector(
    (state) => state.spendingArray.value
  );

  const budget = useSelector((state) => state.budget.value);
  const expense = useSelector((state) => state.expense.value);

  const isexpenseReset = useSelector((state) => state.isExpenseReset.value);
  const isbudgetReset = useSelector((state) => state.isBudgetReset.value);

  const undoBudgetArray = useSelector((state) => state.undoBudgetArray.value);
  const undoExpenseArray = useSelector((state) => state.undoExpenseArray.value);

  const isModal = useSelector((state) => state.isModal.value);

  const transactionItemId = useSelector(
    (state) => state.transactionItemId.value
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modalStyle = {
    zIndex: 5,
    opacity: 0.3,
  };

  function deleteTransactionItem() {
    // filtering the infoArray

    // filtering the InfoArray
    const action1 = dispatch(setToBudgetArray(undoBudgetArray));
    const action2 = dispatch(setToExpenseArray(undoExpenseArray));

    dispatch(
      actionCreator.filterInfoArray({ transactionItemId, action1, action2 })
    );

    // filtering the budgetItemsArray
    dispatch(filterBudgetArray(transactionItemId));
    // filtering the expenseItemsArray

    dispatch(filterExpenseArray(transactionItemId));
    // Add setIsModal and navigate if needed

    dispatch(modalNotSet());
    navigate("/");
  }

  function budgetReset() {
    dispatch(
      addToInfoArray({
        label: "Budget has been reset to 0",
        type: "Budget Reset",
        amount: budget,
        category: "Budget Reset",
        date: new Date().toISOString().split("T")[0],
        id: crypto.randomUUID(),
      })
    );
    //add to undoBudgetArray

    dispatch(addToUndoBudgetArray(budgetItemsArray));

    // to set the budgetItemsArray to []

    dispatch(resetBudgetArray());

    dispatch(budgetNotReset());
    navigate("/");
  }

  function expenseReset() {
    dispatch(
      addToInfoArray({
        label: "Expense has been reset to 0",
        type: "Expense Reset",
        amount: expense,
        category: "Expense Reset",
        date: new Date().toISOString().split("T")[0],
        id: crypto.randomUUID(),
      })
    );
    // set to undoExpenseArray
    dispatch(addToUndoExpenseArray(expenseItemsArray));
    //
    dispatch(expenseNotReset());
    // Reset expenseItemsArray to []
    dispatch(resetExpenseArray());
    // Reset spendingCategoryArray to []
    dispatch(resetSpendingArray());
    navigate("/");
  }

  return (
    <>
      <div
        className="container"
        style={isModal || isbudgetReset ? modalStyle : {}}
      >
        <Header />
        <div className="detail-container">
          <NavBar />
          <div className="transaction-container">
            <Outlet />
          </div>
        </div>
      </div>

      <div className="modal" style={isModal ? { display: "flex" } : {}}>
        <div className="modal-text">
          <div className="modal-text-title">Transaction History</div>
          {infoArray.map((item) => {
            if (item.id === transactionItemId) {
              return (
                <div key={item.id}>
                  <div>
                    <span className="modal-text-key">Label:</span>
                    <span className="modal-text-detail">{item.label}</span>
                  </div>
                  <div>
                    <span className="modal-text-key">Type:</span>
                    <span className="modal-text-detail">{item.type}</span>
                  </div>

                  <div>
                    <span className="modal-text-key">Amount:</span>
                    <span className="modal-text-detail">{item.amount}</span>
                  </div>

                  <div>
                    <span className="modal-text-key">Category:</span>
                    <span className="modal-text-detail">{item.category}</span>
                  </div>

                  <div>
                    <span className="modal-text-key">Date Created:</span>
                    <span className="modal-text-detail">{item.date}</span>
                  </div>

                  <div>
                    <span className="modal-text-key">ID:</span>
                    <span className="modal-text-detail">{item.id}</span>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="modal-btn-container">
          <button className="btn" onClick={() => dispatch(modalNotSet())}>
            Exit
          </button>
          <button className="btn" onClick={deleteTransactionItem}>
            Delete Item
          </button>
        </div>
      </div>

      <div className="modal" style={isbudgetReset ? { display: "flex" } : {}}>
        <div className="modal-text">
          <div className="modal-text-title"></div>

          <div>
            <div className="modal-text-key">
              Are you sure you want to reset your budget to 0?
            </div>
            <span className="modal-text-detail">
              This action can be later undone by deleting the transaction.
            </span>
          </div>
        </div>
        <div className="modal-btn-container">
          <button className="btn danger" onClick={budgetReset}>
            Reset Budget
          </button>
          <button className="btn" onClick={() => dispatch(budgetNotReset())}>
            Exit
          </button>
        </div>
      </div>

      <div className="modal" style={isexpenseReset ? { display: "flex" } : {}}>
        <div className="modal-text">
          <div className="modal-text-title"></div>

          <div>
            <div className="modal-text-key">
              Are you sure you want to reset your expenses to 0?
            </div>
            <span className="modal-text-detail">
              This action can be later undone by deleting the transaction.
              However the expense categories will return and the amount will be
              put under Uncategorized
            </span>
          </div>
        </div>
        <div className="modal-btn-container">
          <button className="btn danger" onClick={expenseReset}>
            Reset Expense
          </button>
          <button className="btn" onClick={() => dispatch(expenseNotReset())}>
            Exit
          </button>
        </div>
      </div>

      <div
        className="overlay"
        style={
          isModal || isbudgetReset || isexpenseReset ? { display: "block" } : {}
        }
        onClick={() => {
          dispatch(modalNotSet());
          dispatch(budgetNotReset());
          dispatch(expenseNotReset);
        }}
      ></div>
    </>
  );
}
