import GeneralTagComponent from '../components/generalTagComponent';
import Dashboard from '../components/dashboard';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../components/theme';
import { Typography, Box} from '@mui/material';

export default function UninterestedPropertyPage(){
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const userProfile = storedData ? storedData.profile : null;
    const filterCriteria = (property) => property.is_interested === false

    
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
                <GeneralTagComponent
                    title = {'Uninterested Task Property Tags'}
                    isProperty={false}
                    filter={true}
                    filterCriteria={filterCriteria}
                />
            </Dashboard>
        </ThemeProvider>
    )

}