import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../SharedContext";
import { Navigate, useNavigate } from "react-router-dom";

export const LOCAL_STORAGE_KEY = "INFO_ARRAY";

export function Budget() {
  const navigate = useNavigate();
  const { infoArray, setInfoArray } = useContext(MyContext);
  const { setBudgetItemsArray } = useContext(MyContext);
  const budgetRef = useRef("");

  const { isbudgetReset, setIsBudgetReset } = useContext(MyContext);
  //Add To Budget Declarations
  const addBudgetLabelRef = useRef("");
  const addBudgetRef = useRef(0);
  //

  // Set Budget Submit Function

  function setBudgetSubmit(e) {
    e.preventDefault();
    if (budgetRef.current.value === "") {
      alert("Please Enter SomeThing on the field");
      return;
    }

    const newId = crypto.randomUUID();
    setInfoArray((currentInfoArray) => [
      {
        label: `Budget has been set to ${budgetRef.current.value}`,
        type: "Budget",
        amount: budgetRef.current.value,
        category: "Budget",
        date: new Date().toISOString().split("T")[0],
        id: newId,
      },
      ...currentInfoArray,
    ]);

    setBudgetItemsArray((currentArray) => [
      {
        label: addBudgetLabelRef.current.value,
        type: "Budget",
        amount: budgetRef.current.value,
        category: "Budget",
        date: new Date().toISOString().split("T")[0],
        id: newId,
      },
      ...currentArray,
    ]);

    navigate("/");
  }
  //
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

    setInfoArray((currentInfoArray) => [
      {
        label: addBudgetLabelRef.current.value,
        type: "Added Budget",
        amount: addBudgetRef.current.value,
        category: "Budget",
        date: new Date().toISOString().split("T")[0],
        id: newId,
      },
      ...currentInfoArray,
    ]);

    setBudgetItemsArray((currentArray) => [
      {
        label: addBudgetLabelRef.current.value,
        type: "Added Budget",
        amount: addBudgetRef.current.value,
        category: "Budget",
        date: new Date().toISOString().split("T")[0],
        id: newId,
      },
      ...currentArray,
    ]);

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
        <button className="btn danger" onClick={() => setIsBudgetReset(true)}>
          Reset Budget
        </button>
      </div>
    </>
  );
}
