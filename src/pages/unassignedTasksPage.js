import Dashboard from "../components/dashboard";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../components/theme";
import UnassignedTasks from "../components/unassignedTask";

export default function UnassignedTasksPage() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard>
        <UnassignedTasks />
      </Dashboard>
    </ThemeProvider>
  );
}
