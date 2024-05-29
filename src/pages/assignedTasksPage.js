import Dashboard from '../components/dashboardEmployer';
import DashboardEmployee from '../components/dashboardEmployee';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../components/theme';
import AssignedTasks from '../components/assignedTasks';
import { Typography, Box} from '@mui/material';

export default function AssignedTasksPage(){
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const userProfile = storedData ? storedData.profile : null;


    if (!userProfile){
        return (
            <ThemeProvider theme={theme}>
                <Box  display="flex" justifyContent="center" alignItems="center" height="70vh">
                <Typography sx={{fontSize: 22}}>Error in loading the page...</Typography>
                </Box>
            </ThemeProvider>
        )
    }
    if (userProfile === 'employer'){
        return (
            <ThemeProvider theme={theme}>
                <Dashboard>
                    <AssignedTasks/>

                </Dashboard>
            
            </ThemeProvider>
        )
    }else{
        return (
            <ThemeProvider theme={theme}>
                <DashboardEmployee>
                    <AssignedTasks/>

                </DashboardEmployee>
            
            </ThemeProvider>
        )

    }
}