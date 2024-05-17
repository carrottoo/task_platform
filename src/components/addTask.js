import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { Task } from '@mui/icons-material';
import config from '../config/config';

function AddTask(props){
    const [values, setValues] = useState({
        taskName: '',
        taskDescription: '',
        taskOutput: ''
    })

    const [errors, setErrors] = useState({
        taskName: '',
        taskDescription: '',
        taskOutput: ''
    })

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setErrors({ ...errors, [prop]: ''});
        setShowAlert(false);
    };

    const storedData = JSON.parse(localStorage.getItem('userData'));
    const token = storedData ? storedData.token : null;

    //const [open, setOpen] = useState(false);
    //console.log("here" + props.open)
    const handleClose = () => {
        setValues(''); // Reset values to their initial state
        setErrors({}); 
        setShowAlert(false);
        props.setOpen(false);
    };


    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const {taskName, taskDescription, taskOutput} = values;
        let body;


        if (!token) {
            console.error('No token found');
            setAlertMessage('Your session has expired, please click here to sign in.')
            setShowAlert(true)
            return; 
        }

        if (!taskName.trim() || !taskDescription.trim()) {
            setErrors(prevErrors => ({ 
                ...prevErrors, 
                taskName: !taskName.trim() ? 'Task name is required.' : '',
                taskDescription: !taskDescription.trim() ? 'Task description is required.' : ''
            }));

            return;
        }

        if (taskOutput){
            body = JSON.stringify({
                'name': taskName,
                'description': taskDescription,
                'output': taskOutput
            })
        }else{
            body = JSON.stringify({
                'name': taskName,
                'description': taskDescription
            })
        }

        const apiUrl = config.API_BASE_URL + '/tasks/';
        try{
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers:{ 
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: body
            });

            const data = await response.json();
            console.log(data);

            if (response.ok){
                setAlertSeverity ('success');
                setAlertMessage('Task created successfully!');
                setShowAlert(true); 

                setTimeout(() => {
                    props.setOpen(false); 
                    navigate(0); // Reload the current page
                  }, 2000); 
            }else{
                if (response.status === 401 ||response.status === 403) {
                    setAlertMessage('Session expired, please click here to sign in.');
                    setShowAlert(true);
                    return; 
                }

                const responseErrors = data.errors;
                const errorCount = data.error_count;

                if (errorCount !== 1){
                    const combinedErrors = {};
                    for (const field in responseErrors) {
                        combinedErrors[field] = responseErrors[field].map(error => error.message).join(' '); // Join with '. '

                    }
                    console.log('this is called')
                    setErrors(combinedErrors)
                }else{
                    setErrors(responseErrors)
                }
            }
        }catch(error){
            console.error('Task creation failed:', error);
            const errorMessage = error.message || 'Failed to create the task, please try again.';
            setAlertMessage(errorMessage);
            setShowAlert(true); 
        }
    }

    return (
        <Dialog open={props.open} onClose={handleClose}>
            {showAlert && ( 
                <Alert 
                    severity={alertSeverity} 
                    onClose={() => setShowAlert(false)}
                    // style={{ position: 'absolute', top: '20', left: '50', zIndex: 2 }}
                >
                    {/* {alertMessage} */}
                    {alertMessage.split(' ').map((word, index) => (  // Split the message into words
                    <span key={index}>
                        {word === 'here' ? <Link to="/signin">here</Link> : word} 
                        {' '} {/* Add spaces between words */}
                    </span>
                        ))}
                </Alert>
            )}
        <DialogTitle> Create New Task</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task Name"
            type="text"
            fullWidth
            required
            variant="standard"
            value={values.taskName}
            error={errors['taskName']} 
            helperText={errors['taskName'] ? (errors['taskName'].message || errors['taskName']) : ''}
            onChange={handleChange('taskName')}
        />
        <TextField
            margin="dense"
            id="description"
            label="Task Description"
            type="text"
            fullWidth
            multiline
            required
            rows={4}
            variant="standard"
            value={values.taskDescription}
            error={errors['taskDescription']} 
            helperText={errors['taskDescription'] ? (errors['taskDescription'].message || errors['taskDescription']) : ''}
            onChange={handleChange('taskDescription')}
        />
         <TextField
            margin="dense"
            id="output"
            label="Task Output"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="standard"
            value={values.taskOutput}
            error={errors['taskOutput']} 
            helperText={errors['taskOutput'] ? (errors['taskOutput'].message || errors['taskOutput']) : ''}
            onChange={handleChange('taskOutput')}
        />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
        </Dialog>
    )

}

export default AddTask
