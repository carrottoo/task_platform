import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Paper, Checkbox, FormControlLabel, Card} from '@mui/material';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';


function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const handleChange = (prop) => (event) => {
    //     setValues({ ...values, [prop]: event.target.value });
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email, password);  // Log in logic or API call goes here
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} style={{ padding: '16px' }}>
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 0, m: 0,  background: 'none', boxShadow: 'none'}}>
                <Avatar sx={{ m: 0.5, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
                </Avatar>
            </Card>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <form onSubmit={handleSubmit} style={{ marginTop: '9px' }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address or Username"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    <Link reloadDocument to="/signup" style={{ marginLeft: '5px' }}>
                        Sign up here
                    </Link>
                </Typography>
                <Typography variant="body2" style={{ marginTop: '16px' }}>
                    Back to 
                    <Link reloadDocument to="/" style={{ marginLeft: '5px' }}>
                        Homepage
                    </Link>
                </Typography>
                </form>
            </Paper>
        </Container>
    );
}

export default SignIn;