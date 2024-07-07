import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useNavigate, Link } from 'react-router-dom';
import config from '../config/config';


export default function SetTaskProperty(props){
    const [values, setValues] = useState({
        task: '',
        propertyName: '',
    })

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        // setErrors({ ...errors, [prop]: ''});
        setShowAlert(false);
    };

    const storedData = JSON.parse(localStorage.getItem('userData'));
    const token = storedData ? storedData.token : null;

    const handleClose = () => {
        setValues(''); // Reset values to their initial state
        // setErrors({}); 
        setShowAlert(false);
        props.setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const taskUrl = config.API_BASE_URL + '/task_properties/';
        const {task, property} = values;

    }

}