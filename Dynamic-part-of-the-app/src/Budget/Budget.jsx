import { useRef } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToInfoArray } from "../Features/InfoArray";
import { addToBudgetArray } from "../Features/budgetItemsArray";
import { budgetReset } from "../Features/isBudgetReset";

export function Budget() {
  const infoArray = useSelector((state) => state.infoArray.value);
  const budgetItemsArray = useSelector((state) => state.budgetArray.value);
  const budgetRef = useRef("");
  const isbudgetReset = useSelector((state) => state.isBudgetReset.value);
  //Add To Budget Declarations
  const addBudgetLabelRef = useRef("");
  const addBudgetRef = useRef(0);
  //
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Set Budget Submit Function

  function setBudgetSubmit(e) {
    e.preventDefault();
    if (budgetRef.current.value === "") {
      alert("Please Enter SomeThing on the field");
      return;
    }

    const newId = crypto.randomUUID();

    dispatch(
      addToInfoArray({
        label: `Budget has been set to ${budgetRef.current.value}`,
        type: "Budget",
        amount: budgetRef.current.value,
        category: "Budget",
        date: new Date().toISOString().split("T")[0],
        id: newId,
      })
    );
    dispatch(
      addToBudgetArray({
        label: addBudgetLabelRef.current.value,
        type: "Budget",
        amount: budgetRef.current.value,
        category: "Budget",
        date: new Date().toISOString().split("T")[0],
        id: newId,
      })
    );
    navigate("/");
  }
  
  // Add To Budget Submit Function

  function addToBudgetSubmit(e) {
    e.preventDefault();
    if (
      addBudgetLabelRef.current.value === "" &&
      addBudgetRef.current.value === ""
    ) {
      alert("Please Enter The Label and The Amount");
      return;
    }
    if (addBudgetLabelRef.current.value === "") {
      alert("Please Enter the Label");
      return;
    }
    if (addBudgetRef.current.value === "") {
      alert("Please Enter the Amount");
      return;
    }

    const newId = crypto.randomUUID();

    dispatch(
      addToInfoArray({
        label: addBudgetLabelRef.current.value,
        type: "Added Budget",
        amount: addBudgetRef.current.value,
        category: "Budget",
        date: new Date().toISOString().split("T")[0],
        id: newId,
      })
    );

    dispatch(
      addToBudgetArray({
        label: addBudgetLabelRef.current.value,
        type: "Added Budget",
        amount: addBudgetRef.current.value,
        category: "Budget",
        date: new Date().toISOString().split("T")[0],
        id: newId,
      })
    );

    navigate("/");
  }

  return (
    <>
      <form onSubmit={setBudgetSubmit}>
        <h2>Set Your Income / Budget</h2>
        <div>
          <div>Enter your budget</div>
          <input type="number" ref={budgetRef} />
        </div>
        <button className="btn">Set Budget</button>
      </form>

      <form onSubmit={addToBudgetSubmit}>
        <h2>Add an Income Source</h2>
        <div>
          <div>Label</div>
          <input type="text" ref={addBudgetLabelRef} />
        </div>
        <div>
          <div>Amount</div>
          <input type="number" ref={addBudgetRef} />
        </div>
        <button className="btn">Add to Budget</button>
      </form>

      <div className="reset-budget">
        <h2>Reset budget</h2>
        <button className="btn danger" onClick={() => dispatch(budgetReset())}>
          Reset Budget
        </button>
      </div>
    </>
  );
}
