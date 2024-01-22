import { Link } from "react-router-dom";

export function Header() {
  return (
    <>
      <header className="header">
        <div className="header-menu">
          <Link to="./menu">menu</Link>
        </div>
        <div className="header-title">Expense tracker</div>
        <button>dark</button>
      </header>
    </>
  );
}
