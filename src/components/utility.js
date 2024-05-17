
const fieldMapping = {
    firstName: 'first_name',
    lastName: 'last_name',
    username: 'username',
    email: 'email',
    // ... other fields
  };


async function callApi(url, method = 'GET', body = null) {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    const token = storedData ? storedData.token : null;
 
    if (method !== 'GET' && !token) { 
        return {error: 'Session expired, please sign in again.' }; 
    }
  
    try {
      const response = await fetch(url, {
            method,
            headers: {
            'Authorization': token ? `Token ${token}` : '', 
            'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : null
        });

        const data = await response.json()
  
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                return {error: 'Session expired, please sign in again.' }; 
            }

            const errors = data.errors; 
            const errorCount = data.error_count;

            if (errorCount !== 1){
                const combinedErrors = {};
                for (const field in errors) {
                    combinedErrors[field] = errors[field].map(error => error.message).join(' '); // Join with '. '

                }
                return combinedErrors;
            }else{
                return errors;
            }
        }
  
        return data;

    } catch (error) {
        return { error: error.message || 'An error occurred.' }; 
    }
  }
  
  export default {callApi, fieldMapping}; 
