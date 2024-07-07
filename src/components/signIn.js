import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Paper, Checkbox, FormControlLabel, Card} from '@mui/material';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import config from '../config/config';
import Alert from '@mui/material/Alert';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';



function SignIn() {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [showEmailForm, setShowEmailForm] = useState(false); 

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');

    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false)
    const [usernameError, setUsernameError] = useState(false)

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setUsernameError('');
        setShowAlert(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, email, password} = values;
        let body;

        const apiUrl = config.API_BASE_URL + '/users/singin/';
        if (email !== ''){
            body  = JSON.stringify({
                'email': email,
                'password': password
            });
        }else{
            body = JSON.stringify({
                'username': username,
                'password': password
            });
        }
        try{
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });

            const data = await response.json();
            if (response.ok){

                console.log('successful')
            
                // sessionStorage.setItem(data.user_id, data.token);

                localStorage.setItem('userData', JSON.stringify({
                    userID: data.user_id,
                    token: data.token,
                    username: data.username,
                    email: data.email
                }));

                // check if the user's profile has been set
                const profileUrl = config.API_BASE_URL + '/user_profiles/';
                
                const profileResponse = await fetch (profileUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${data.token}`,
                        'Content-Type': 'application/json'
                    }
                })

                const profileData  = await profileResponse.json()
                console.log(profileData.count)
                
                if (profileData.count === 0){
                    setAlertMessage('Please set up your profile to continue');
                    setAlertSeverity('warning');
                    setShowAlert(true); 

                    setTimeout(() => {
                        window.location.href = '/set_profile';
                    }, 1500); 
                    
                }else{
                    const storedData = JSON.parse(localStorage.getItem('userData'))
                    const updatedData = { 
                        ...storedData, 
                        profile: profileData.results[0].is_employer? 'employer' : 'employee'
                      };
                    
                    localStorage.setItem("userData", JSON.stringify(updatedData));

                    // console.log(localStorage.getItem('userData'))

                    setAlertMessage('Signing in ...');
                    setAlertSeverity('success');
                    setShowAlert(true)

                    // console.log(profileData.results[0]['is_employer'])

                    if (profileData.results[0].is_employer){
                        setTimeout(() => {
                            window.location.href = '/employer';
                        }, 1000); // 1000 milliseconds = 1 seconds
                    }else{ 
                        setTimeout(() => {
                            window.location.href = '/employee';
                    }, 1000); // 1000 milliseconds = 1 seconds}
                    }
                }

            }else{
                const errorMessage = data.error || 'Failed to sign in, please try again.';
                setAlertMessage(errorMessage);
                setShowAlert(true); 
                setPasswordError(errorMessage.toLowerCase().includes('password'));
                setUsernameError(errorMessage.toLowerCase().includes('username'));
                setEmailError(errorMessage.toLowerCase().includes('email'));
            }

        }catch (error){
            console.error('Signin failed:', error);
            const errorMessage = error.message || 'Failed to sign in, please try again.';
            setAlertMessage(errorMessage);
            setShowAlert(true); 
        }
    };

    const toggleForms = (showEmail) => {
        setShowEmailForm(showEmail);
        setValues('');
        setEmailError(false);
        setPasswordError(false);
        setUsernameError(false);
        setShowAlert(false);
    }

    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} style={{ padding: '16px' }}>
            {showAlert && ( 
                <Alert 
                    severity={alertSeverity} 
                    onClose={() => setShowAlert(false)}
                    // style={{ position: 'absolute', top: '20', left: '50', zIndex: 2 }}
                >
                    {alertMessage}
                </Alert>
            )}
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 0, m: 0,  background: 'none', boxShadow: 'none'}}>
                <Avatar sx={{ m: 0.5, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
                </Avatar>
            </Card>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                {/* Button Section */}
                <Stack 
                    direction="row" 
                    spacing={2}  
                    justifyContent="center" 
                    alignItems="center"
                    style={{ marginTop: '30px'}}>
                    <Button 
                        variant={showEmailForm ? "outlined" : "contained"}
                        onClick={() => toggleForms(false)}
                        size="small"
                    >
                         with Username
                    </Button>
                    <Button 
                        variant={showEmailForm ? "contained" : "outlined"}
                        onClick={() => toggleForms(true)}
                        size="small"
                    >
                        with Email
                    </Button>
                </Stack>
                <form onSubmit={handleSubmit} style={{ marginTop: '9px' }}>
                {showEmailForm && (
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        value={values.email}
                        onChange={handleChange('email')}
                        error={emailError}
                    />
                )}
                {!showEmailForm && (
                    <TextField
                       variant="outlined"
                       margin="normal"
                       required
                       fullWidth
                       label="Username"
                       autoComplete="username"
                       autoFocus
                       value={values.username}
                    //    onChange={(e) => setUsername(e.target.value)}
                    onChange={handleChange('username')}
                       error={usernameError}
                   /> 
               )}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={values.password}
                        onChange={handleChange('password')}
                        error={passwordError}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <FormControlLabel
                            sx={{mt: {xs: 0.625, sm: 1.25}}}
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ margin: '24px 0px 16px' }}
                    >
                        Sign In
                    </Button>
                    <Typography variant="body2" style={{ marginTop: '16px' }}>
                    No account yet? 
                    <Link reloadDocument to="/signup" style={{ marginLeft: '5px'}} className='link'>
                        Sign up here
                    </Link>
                </Typography>
                <Typography variant="body2" style={{ marginTop: '16px' }}>
                    Back to 
                    <Link reloadDocument to="/" style={{ marginLeft: '5px' }} className='link'>
                        Homepage
                    </Link>
                </Typography>
                </form>
            </Paper>
        </Container>
        </ThemeProvider>
    );
}

export default SignIn;