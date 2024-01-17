import { useContext, useRef, useState } from "react";
import { MyContext } from "../Home/SharedContext";
import { Navigate, useNavigate } from "react-router-dom";

export function Budget() {
  const navigate = useNavigate();
  const { infoArray, setInfoArray } = useContext(MyContext);
  const setBudgetRef = useRef();
  const { budget, setBudget } = useContext(MyContext);

  //Add To Budget Declarations

  const addBudgetLabelRef = useRef("");
  const addBudgetRef = useRef(0);

  // Set Budget Submit Function

  function setBudgetSubmit(e) {
    e.preventDefault();
    if (setBudgetRef.current.value === "") {
      alert("Please Enter SomeThing on the field");
      return;
    }
    setInfoArray((currentInfoArray) => [
      {
        label: `Budget has been set to ${setBudgetRef.current.value}`,
        type: "Budget",
        amount: setBudgetRef.current.value,
        category: "Budget",
        date: new Date().toISOString().split("T")[0],
        id: crypto.randomUUID(),
      },
      ...currentInfoArray,
    ]);
    setBudget((currentBudget) => (currentBudget = setBudgetRef.current.value));

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
    setInfoArray((currentInfoArray) => [
      {
        label: addBudgetLabelRef.current.value,
        type: "Budget",
        amount: addBudgetRef.current.value,
        category: "Budget",
        date: new Date().toISOString().split("T")[0],
        id: crypto.randomUUID(),
      },
      ...currentInfoArray,
    ]);
    const totalBudget =
      parseFloat(budget) + parseFloat(addBudgetRef.current.value);
    setBudget((currentBudget) => (currentBudget = totalBudget));
    navigate("/");
  }

  //Budget Reset Function

 function budgetReset(){
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
  setBudget((currentBudget)=>(currentBudget = 0))
 }

  return (
    <>
      {JSON.stringify(infoArray)}
      <form onSubmit={setBudgetSubmit}>
        <h2>Set Your Income / Budget</h2>
        <div>
          <div>Enter your budget</div>
          <input type="number" ref={setBudgetRef} />
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
        <button className="btn danger" onClick={budgetReset}>Reset Budget</button>
      </div>
    </>
  );
}
