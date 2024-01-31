import { Link } from "react-router-dom";

export function Menu(){
    return(
        <>
            <div>
              <Link to="/">Home</Link>
            </div>
            <div>
              <Link to="/expense">Add an Expense</Link>
            </div>
            <div>
              <Link to="/budget">Add/Update your budget</Link>
            </div>
            <div>
              <Link to="/category">View Spending in Categories</Link>
            </div>
        </>
    )
}