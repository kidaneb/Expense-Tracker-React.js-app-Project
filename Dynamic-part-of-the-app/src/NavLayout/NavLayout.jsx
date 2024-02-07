import { useSelector } from "react-redux";
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { PageContainer } from "./PageContainer.jsx";
import { TransactionModal } from "./Modals/TransactionModal.jsx";
import { ResetBudgetModal } from "./Modals/ResetBudgetModal.jsx";
import { ResetExpenseModal } from "./Modals/ResetExpenseModal.jsx";
import { Overlay } from "./Overlay.jsx";

export function NavLayout() {
  const isDarkMode = useSelector((state) => state.darkMode.value);
  //

  // LOGIC FOR THE DARK AND LIGHT MODE

  const darkTheme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      {/* MAIN PAGE OF THE APP */}
      <PageContainer />
      {/* TRANSACTION MODAL */}
      <TransactionModal />

      {/* RESET BUDGET MODAL */}

      <ResetBudgetModal />

      {/* RESEST EXPENSE MODAL */}
      <ResetExpenseModal />

      {/* Overlay */}
      <Overlay />
    </ThemeProvider>
  );
}
