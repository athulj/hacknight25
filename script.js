document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');
    
    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            messageDiv.textContent = data.message;
            messageDiv.className = 'success';
            setTimeout(() => {
                alert('Welcome ' + username + '! In a real application, you would be redirected to a dashboard.');
            }, 500);
        } else {
            messageDiv.textContent = data.message;
            messageDiv.className = 'error';
        }
    } catch (error) {
        messageDiv.textContent = 'Error connecting to server';
        messageDiv.className = 'error';
    }
});
