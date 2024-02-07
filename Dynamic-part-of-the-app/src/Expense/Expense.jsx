import { AddExpenseForm } from "./AddExpenseForm";
import { ExpenseResetFrom } from "./ExpenseResetForm";

export function Expense() {
  return (
    <>
      {/* ADD EXPENSE FORM COMPONENT */}
      <AddExpenseForm />
      {/* RESET EXPENSES COMPONENT */}
      <ExpenseResetFrom />
    </>
  );
}
