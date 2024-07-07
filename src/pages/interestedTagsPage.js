import Dashboard from '../components/dashboard';
import GeneralTagComponent from "../components/generalTagComponent";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../components/theme';
import { Typography, Box} from '@mui/material';


export default function InterestedPropertyPage(){
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const userProfile = storedData ? storedData.profile : null;
    const filterCriteria = (property) => property.is_interested === true;

    
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
                {/* <FilteredProperties
                    is_interested={true}
                /> */}
                <GeneralTagComponent
                    isProperty={false}
                    filter={true}
                    filterCriteria={filterCriteria}
                />
            </Dashboard>
        </ThemeProvider>
    )

}