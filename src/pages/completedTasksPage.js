import Dashboard from "../components/dashboard";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../components/theme";
import CompletedTasks from "../components/completedTasks";

export default function CompletedTasksPage() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard>
        <CompletedTasks />
      </Dashboard>
    </ThemeProvider>
  );
}
