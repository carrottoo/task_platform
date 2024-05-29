import Dashboard from '../components/dashboardEmployer';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../components/theme';
import UnassignedTasks from '../components/unassignedTasks';

export default function UnassignedTasksPage(){

    return (
        <ThemeProvider theme={theme}>
            <Dashboard>


                <UnassignedTasks/>

            </Dashboard>
        
        </ThemeProvider>
    )
}
