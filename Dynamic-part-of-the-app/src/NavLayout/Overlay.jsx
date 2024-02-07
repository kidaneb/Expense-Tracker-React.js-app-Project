import { useDispatch, useSelector } from "react-redux";
import { modalNotSet } from "../Features/modal";
import { budgetNotReset } from "../Features/isBudgetReset";
import { expenseNotReset } from "../Features/isExpenseReset";

export function Overlay() {
  const isModal = useSelector((state) => state.isModal.value);
  const isexpenseReset = useSelector((state) => state.isExpenseReset.value);
  const isbudgetReset = useSelector((state) => state.isBudgetReset.value);
  const isDarkMode = useSelector((state) => state.darkMode.value);

  const dispatch = useDispatch();
  return (
    <>
      <div
        className="overlay"
        style={
          isModal || isexpenseReset || isbudgetReset
            ? {
                display: "block",
                backgroundColor: isDarkMode ? "white" : "black",
              }
            : {}
        }
        onClick={() => {
          dispatch(modalNotSet());
          dispatch(budgetNotReset());
          dispatch(expenseNotReset());
        }}
      ></div>
    </>
  );
}
