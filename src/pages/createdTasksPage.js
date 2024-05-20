import Dashboard from '../components/dashboard';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../components/theme';
import CreatedTasks from '../components/allCreatedTasks';

export default function CreatedTasksPage(){

    return (
        <ThemeProvider theme={theme}>
            <Dashboard>
                <CreatedTasks/>

            </Dashboard>
        
        </ThemeProvider>
    )

    

}