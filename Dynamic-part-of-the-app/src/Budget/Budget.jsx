import { SetBudgetForm } from "./SetBudgetForm";
import { AddToBudgetForm } from "./AddToBudgetFrom";
import { BudgetResetForm } from "./BudgetResetForm";

export function Budget() {
  

  return (
    <>
      {/*  SET THE BUDGET TO NEW VALUE*/}
      <SetBudgetForm />
      {/* ADD TO THE BUDGET FORM */}
      <AddToBudgetForm />
      {/* BUDGET RESET COMPONENT */}
      <BudgetResetForm />
    </>
  );
}
