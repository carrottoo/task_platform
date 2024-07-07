import { ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import theme from '../components/theme';
import { Container, Grid,Typography, Divider  } from '@mui/material';
import Dashboard from '../components/dashboard'
import DateCard from '../components/dateCard'
import TaskCards from '../components/TaskCards';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PropertyCard from '../components/propertyCard';

export default function EmployerMainPage() {
    const storedData = JSON.parse(localStorage.getItem('userData'));

    return (
        <ThemeProvider theme={theme}>
            <Dashboard>
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8} lg={9}>
                            <Typography  gutterBottom variant="h2" component="div" 
                            sx={{
                                fontFamily: 'Poetsen One, sans-serif',
                                fontSize: 'calc(50px + 0.5vmin)',
                                fontWeight: 100,
                                color:'#4480B8',
                                marginTop: '50px',
                            }}>
                                Welcome! <span style={{ marginLeft: '30px' }}>{storedData.username}</span> 
                                <SentimentSatisfiedAltIcon fontSize='large' sx={{marginLeft: '30px', fontSize: 50}}/>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>
                            <DateCard />
                        </Grid>
                        <Grid item xs={12}>
                            <TaskCards />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider variant="middle" />  {/* or use variant="fullWidth" for a full-width line */}
                        </Grid>
                        <Grid item xs={12}>
                            <PropertyCard />
                        </Grid>

                    </Grid>
                </Container>
            </Dashboard>
        </ThemeProvider>
    );
}
