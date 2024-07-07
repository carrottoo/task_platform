export default async function callApi(token, url, method = 'GET', body = null) {
    // const storedData = JSON.parse(localStorage.getItem('userData') || '{}'); 
    // const token = storedData?.token; 
 
    // if (!token) { 
    //     return {error: 'Session expired, please sign in again.' }; 
    // }
  
    try {
      const response = await fetch(url, {
            method,
            headers: {
            'Authorization': token ? `Token ${token}` : '', 
            'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : null
        });

        if (method === 'DELETE' && response.status === 204) {
            return { ok: 'Delete successful' }; // Successful DELETE
        }


        const data = await response.json();
  
        if (!response.ok) {

            if (response.status === 401){
                return {'sessionExpired': 'Session expired, please sign in again.' }; 
            }

            if (response.status === 403 && !data.errors){
                return {'permissionDenied': 'You do not have the permission for the action requested.'}
            }

            if (response.status === 404){
                return {'notFound': 'The requested object cannot be found.'}
            }

            const errors = data.errors? data.errors : data.error; 
            const errorCount = data.error_count;

            if (errorCount && errorCount !== 1){
                const combinedErrors = {};
                for (const field in errors) {
                    combinedErrors[field] = errors[field].map(error => error.message).join(' '); // Join with '. '

                }
                return {'error': combinedErrors};
            }else{
                return {'error': errors};
            }
        }
  
        return {'ok': data};

    } catch (error) {
        return { 'error' : error.message || 'An error occurred.' }; 
    }
  }

  export const formatTaskData = (taskData, taskMapping) => {
    return taskData.map((task, index) => {
        const formattedTask = {};
        for (const frontendField in taskMapping) {
            const backendField = taskMapping[frontendField];
            formattedTask[frontendField] = task[backendField] || "";
        }

        formattedTask.createdOn = new Date(task.created_on).toLocaleDateString();
        formattedTask.updatedOn = new Date(task.updated_on).toLocaleDateString();
        formattedTask.id = task.id; 
        formattedTask.displayId = index + 1; 
        formattedTask.isSubmitted = task.is_submitted ? 'Yes' : 'No';
        formattedTask.isApproved = task.is_approved ? 'Yes' : 'No';
        formattedTask.isActive = task.is_active ? 'Yes' : 'No';
        formattedTask.assignee = task.assignee_name ? task.assignee_name : 'Not assigned';
        formattedTask.submittedOn = task.submitted_on ? new Date(task.submitted_on).toLocaleDateString() : 'N/A';
        formattedTask.approvedOn = task.approved_on ? new Date(task.approved_on).toLocaleDateString() : 'N/A';
        if (task.output.trim().length === 0) {
            formattedTask.output = 'N/A'; 
        }
        
        return formattedTask;
    });
};
