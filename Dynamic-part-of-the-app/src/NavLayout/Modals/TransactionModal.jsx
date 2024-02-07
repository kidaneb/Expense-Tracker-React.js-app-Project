import { Button, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { numberToMoneyFormat } from "../../Features/numberToMoney";
import { modalNotSet } from "../../Features/modal";
import { filterInfoArray } from "../../Features/InfoArray";
import { filterBudgetArray, setToBudgetArray } from "../../Features/budgetItemsArray";
import { filterExpenseArray, setToExpenseArray } from "../../Features/expenseItemsArray";
import { useNavigate } from "react-router-dom";

export function TransactionModal({ deleteTransactionItem }) {
  const infoArray = useSelector((state) => state.infoArray.value);
  const isModal = useSelector((state) => state.isModal.value);
  const undoBudgetArray = useSelector((state) => state.undoBudgetArray.value);
  const undoExpenseArray = useSelector((state) => state.undoExpenseArray.value);

  const transactionItemId = useSelector(
    (state) => state.transactionItemId.value
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // FUNCTION TO DELETE THE TRANSACTIONS

  function deleteTransactionItem() {
    // FILTERING THE INFO ARRAY AND SETTING UNDO ARRAYS WHEN NEEDED
    for (const item of infoArray) {
      if (item.id === transactionItemId) {
        if (item.category === "Budget Reset") {
          // SETTING BUDGET ARRAY TO UNDO BUDGET ARRAY

          dispatch(setToBudgetArray(undoBudgetArray));
        }
        if (item.category === "Expense Reset") {
          // SETTING EXPENSE ARRAY TO UNDO EXPENSE ARRAY

          dispatch(setToExpenseArray(undoExpenseArray));
        }
      }
    }
    // FILTERING THE INFO ARRAY

    dispatch(filterInfoArray(transactionItemId));

    // FILTERING THE BUDGET ITEMS ARRAY

    dispatch(filterBudgetArray(transactionItemId));

    // FILTERING THE EXPENSE ITEMS ARRAY

    dispatch(filterExpenseArray(transactionItemId));

    // SET THE MODAL CONDITION AND NAVIGATE TO THE HOME PAGE
    dispatch(modalNotSet());
    navigate("/");
  }

  return (
    <>
      <Paper
        square={false}
        className="modal"
        style={{ borderRadius: "16px", display: isModal ? "flex" : "none" }}
      >
        <div className="modal-text">
          <Typography
            variant="h5"
            className="modal-text-title"
            sx={{ margin: "0.3em" }}
          >
            Transaction History
          </Typography>
          {infoArray.map((item) => {
            if (item.id === transactionItemId) {
              return (
                <div
                  key={item.id}
                  className="modal-text-key-detail-pair-container"
                >
                  <div className="modal-text-key-detail-pair">
                    <span className="modal-text-key">
                      <Typography variant="body1" sx={{ fontWeight: "bolder" }}>
                        Label:
                      </Typography>
                    </span>
                    <span className="modal-text-detail">
                      <Typography variant="body1">{item.label}</Typography>
                    </span>
                  </div>

                  <div className="modal-text-key-detail-pair">
                    <span className="modal-text-key">
                      <Typography variant="body1" sx={{ fontWeight: "bolder" }}>
                        Type:
                      </Typography>
                    </span>
                    <span className="modal-text-detail">
                      <Typography variant="body1"> {item.type}</Typography>
                    </span>
                  </div>

                  <div className="modal-text-key-detail-pair">
                    <span className="modal-text-key">
                      <Typography variant="body1" sx={{ fontWeight: "bolder" }}>
                        Amount:
                      </Typography>
                    </span>
                    <span className="modal-text-detail">
                      <Typography variant="body1">
                        {numberToMoneyFormat(parseFloat(item.amount))}
                      </Typography>
                    </span>
                  </div>

                  <div className="modal-text-key-detail-pair">
                    <span className="modal-text-key">
                      <Typography variant="body1" sx={{ fontWeight: "bolder" }}>
                        Category:
                      </Typography>
                    </span>
                    <span className="modal-text-detail">
                      <Typography variant="body1">{item.category}</Typography>
                    </span>
                  </div>

                  <div className="modal-text-key-detail-pair">
                    <span className="modal-text-key">
                      <Typography variant="body1" sx={{ fontWeight: "bolder" }}>
                        Date Created:
                      </Typography>
                    </span>
                    <span className="modal-text-detail">
                      <Typography variant="body1">{item.date}</Typography>
                    </span>
                  </div>

                  <div className="modal-text-key-detail-pair">
                    <span className="modal-text-key">
                      <Typography variant="body1" sx={{ fontWeight: "bolder" }}>
                        ID:
                      </Typography>
                    </span>
                    <span className="modal-text-detail">
                      <Typography variant="body1">{item.id}</Typography>
                    </span>
                  </div>
                </div>
              );
            }
          })}
        </div>

        <div className="modal-btn-container">
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(modalNotSet())}
          >
            Exit
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={deleteTransactionItem}
          >
            Delete Item
          </Button>
        </div>
      </Paper>
    </>
  );
}
