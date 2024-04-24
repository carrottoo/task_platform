import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Grid, Switch, FormControlLabel} from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import backgroundImage from '../assets/background.JPG';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TaskAltIcon from '@mui/icons-material/TaskAlt';


function SignUp() {
    const [values, setValues] = useState({
        username: '',
        email: '',
        confirmEmail: '', 
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const [isEmployer, setIsEmployer] = useState(false);

    const defaultTheme = createTheme();

    return (
        <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:  `url(${backgroundImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
            <Box sx={{ p: 2, mb: 3}}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography gutterBottom variant="h5" component="div" sx={{
                    fontFamily: 'Georgia, serif', 
                    fontSize: 'calc(16px + 0.5vmin)',            
                    color: '#0077cc',         
                    textAlign: 'left', 
                    fontWeight: 'bold',         
                    mb: 4,                        
                }}>
                Your Task Management Helper
                <TaskAltIcon sx={{ ml:3}} /> 
            </Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2" s={{fontSize: 'calc(10px + 0.5vmin)'}}>
            Register as a new user to our task service platform to facilitate your task outsourcing and co-working
            </Typography>
            <Divider/>
            </Box>
            <Typography component="h1" variant="h5" sx={{mb:4}}>
                Sign Up
            </Typography>
            <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        // required
                        fullWidth
                        label="First name"
                        autoComplete='firstName'
                        value={values.firstName}
                        onChange={handleChange('firstName')}
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        // required
                        fullWidth
                        label="Last name"
                        autoComplete='lastName'
                        value={values.lastName}
                        onChange={handleChange('lastName')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Username"
                        autoComplete='username'
                        value={values.username}
                        onChange={handleChange('username')}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={values.email}
                        onChange={handleChange('email')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Conform Email Address"
                        autoComplete="email"
                        value={values.confirmEmail}
                        onChange={handleChange('confirmEmail')}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="password"
                        value={values.password}
                        onChange={handleChange('password')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        value={values.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                    />
                </Grid>
                <Grid item xs={12}>
                <FormControlLabel
                control={
                    <Switch
                    checked={isEmployer}
                    onChange={() => setIsEmployer(!isEmployer)}
                    name="isEmployer"
                    color="primary"  
                    />
                }
                    label= "Are you a employer"
                    style={{ marginLeft: 0, display: 'flex', alignItems: 'center' }} 
                />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign Up
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" style={{ marginTop: '16px', textAlign: 'center' }}>
                        Already have an account? 
                        <Link reloadDocument to="/signin" style={{ marginLeft: '5px'}}>
                            Sign in here
                        </Link>
                            </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" style={{ marginTop: '16px', textAlign: 'center' }}>
                        Back to
                        <Link reloadDocument to="/" style={{ marginLeft: '5px'}}>
                            Homepage
                        </Link>
                            </Typography>
                </Grid>
                </Grid>
                </form>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );

}




export default SignUp;
