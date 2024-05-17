import Dashboard from '../components/dashboard';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../components/theme';
import UserProfile from '../components/userProfile';

export default function UserProfilePage(){

    return (
        <ThemeProvider theme={theme}>
            <Dashboard>
                <UserProfile/>

            </Dashboard>
        
        </ThemeProvider>
    )

    

}