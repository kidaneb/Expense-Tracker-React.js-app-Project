import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
import { useContext } from "react";
import { MyContext, SharedContext } from "./Home/SharedContext";

export function NavLayout() {
  const { infoArray, setInfoArray } = useContext(MyContext);
  const {setSpendingCategoryArray} = useContext(MyContext);
  const { budget, setBudget } = useContext(MyContext);
  const { expense, setExpense } = useContext(MyContext);
  const { isModal, setIsModal } = useContext(MyContext);
  const { isbudgetReset, setIsBudgetReset } = useContext(MyContext);
  const { isExpenseReset, setIsExpenseReset } = useContext(MyContext);
  const navigate = useNavigate();

  const modalStyle = {
    zIndex: 5,
    opacity: 0.3,
  };
  const { transactionClicked, transactionItemId } = useContext(MyContext);

  function deleteTransactionItem() {
    setInfoArray((currentInfoArray) => {
      return currentInfoArray.filter((item) => item.id !== transactionItemId);
    });
    setIsModal(false);
  }

  function budgetReset() {
    setInfoArray((currentInfoArray) => [
      {
        label: "Budget has been reset to 0",
        type: "Budget Reset",
        amount: budget,
        category: "Budget Reset",
        date: new Date().toISOString().split("T")[0],
        id: crypto.randomUUID(),
      },
      ...currentInfoArray,
    ]);
    setBudget((currentBudget) => (currentBudget = 0));
    setIsBudgetReset(false);
    navigate("/");
  }

  function expenseReset() {
    setInfoArray((currentInfoArray) => [
      {
        label: "Expense has been reset to 0",
        type: "Expense Reset",
        amount: expense,
        category: "Expense Reset",
        date: new Date().toISOString().split("T")[0],
        id: crypto.randomUUID(),
      },
      ...currentInfoArray,
    ]);
    setExpense((ce) => (ce = 0));

    setIsExpenseReset(false);

    setSpendingCategoryArray((currentArray) => []);
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
          <button className="btn" onClick={() => setIsModal(false)}>
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
          <button className="btn" onClick={() => setIsBudgetReset(false)}>
            Exit
          </button>
        </div>
      </div>

      <div className="modal" style={isExpenseReset ? { display: "flex" } : {}}>
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
          <button className="btn" onClick={() => setIsExpenseReset(false)}>
            Exit
          </button>
        </div>
      </div>

      <div
        className="overlay"
        style={isModal || isbudgetReset || isExpenseReset ? { display: "block" } : {}}
        onClick={() => {
          setIsModal(false);
          setIsBudgetReset(false);
          setIsExpenseReset(false);

        }}
      ></div>
    </>
  );
}
