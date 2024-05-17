import { ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import theme from '../components/theme';
import { Container, Grid, Paper, Typography, Divider  } from '@mui/material';
import Dashboard from '../components/dashboard';
import DateCard from '../components/dateCard'
import TaskCards from '../components/TaskCards';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PropertyCards from '../components/propertyCards';
import CssBaseline from '@mui/material/CssBaseline';

export default function EmployeeMainPage() {
    const storedData = JSON.parse(localStorage.getItem('userData'));

    return (
        <ThemeProvider theme={theme}>
            <Dashboard>

            </Dashboard>
            </ThemeProvider>
    )
}