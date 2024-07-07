import Dashboard from '../components/dashboard';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../components/theme';
import UserProfile from '../components/userProfile';
import { Typography, Box} from '@mui/material';

export default function UserProfilePage(){
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const userProfile = storedData ? storedData.profile : null;
    console.log(storedData)
    console.log(userProfile)

    if (!userProfile){
        return (
            <ThemeProvider theme={theme}>
                <Box  display="flex" justifyContent="center" alignItems="center" height="70vh">
                <Typography sx={{fontSize: 22}}>Error in loading the page...</Typography>
                </Box>
            </ThemeProvider>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <Dashboard>
                <UserProfile />
            </Dashboard>
        </ThemeProvider>
    )

}