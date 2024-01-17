export function Expense() {
  return (
    <>
      <form>
        <h2>Add an Expense</h2>

        <div>
          <div className="expense-label">
            <div>Label</div>
            <input type="text" />
          </div>

          <div className="expense-amount">
            <div>Amount</div>
            <input type="number" />
          </div>

          <div className="expense-category">
            <div>Select Category</div>
            <input type="text" />
            <button className="btn danger">Remove Category</button>
          </div>
        </div>
        <button className="btn danger">Add Expense</button>
      </form>

      <div className="reset-expenses">
        <h2>Reset Your Expenses</h2>
        <button className="btn danger">Reset Expenses</button>
      </div>
    </>
  );
}
