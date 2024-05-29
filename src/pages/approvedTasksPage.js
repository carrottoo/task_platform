import Dashboard from '../components/dashboardEmployer';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../components/theme';
import ApprovedTasks from '../components/approvedTasks';

export default function ApprovedTasksPage(){

    return (
        <ThemeProvider theme={theme}>
            <Dashboard>


                <ApprovedTasks/>

            </Dashboard>
        
        </ThemeProvider>
    )
}