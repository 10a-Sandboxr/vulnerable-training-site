// Vulnerable Training Site JavaScript
// This code intentionally contains security vulnerabilities for educational purposes

document.addEventListener('DOMContentLoaded', function() {
    // Simulate vulnerable backend responses
    
    // Weak Authentication Login Form
    const weakLoginForm = document.querySelector('.weak-login-form');
    const weakLoginResult = document.getElementById('weak-login-result');
    
    if (weakLoginForm) {
        weakLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('corp-username').value;
            const password = document.getElementById('corp-password').value;
            
            // Valid credentials for Bond007
            const validPassword = 'bondjamesbond';
            
            weakLoginResult.innerHTML = `
                <div class="demo-data">
                    <strong>Authentication Attempt:</strong><br>
                    Username: ${username}<br>
                    Password: ${password ? '[HIDDEN]' : '[EMPTY]'}
                </div>
            `;
            
            const attemptTimestamp = new Date().toISOString();
            const isSuccess = password === validPassword && username === 'Bond007';
            
            // Log all login attempts (visible in browser console)
            console.log(`🔍 LOGIN ATTEMPT: Username: ${username}, Password: ${password}, Timestamp: ${attemptTimestamp}`);
            
            // Store login attempts in localStorage for persistence
            let loginAttempts = JSON.parse(localStorage.getItem('loginAttempts') || '[]');
            loginAttempts.push({
                username: username,
                password: password,
                timestamp: attemptTimestamp,
                success: isSuccess
            });
            localStorage.setItem('loginAttempts', JSON.stringify(loginAttempts));
            
            // Send to server-side logging API
            fetch('/api/log-attempt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    timestamp: attemptTimestamp,
                    success: isSuccess,
                    userAgent: navigator.userAgent,
                    page: 'corporate-login'
                })
            }).then(response => {
                if (response.ok) {
                    console.log('📡 Login attempt sent to server successfully');
                } else {
                    console.log('⚠️ Failed to send login attempt to server');
                }
            }).catch(error => {
                console.log('❌ Error sending to server:', error);
            });
            
            if (isSuccess) {
                weakLoginResult.innerHTML += `
                    <div class="success">
                        <strong>✅ Access Granted!</strong><br>
                        Welcome to MI6 Corporate System, Agent 007!<br>
                        <em>Mission briefings and classified data now accessible.</em>
                    </div>
                `;
            } else {
                weakLoginResult.innerHTML += `
                    <div class="error">
                        <strong>❌ Access Denied</strong><br>
                        Invalid password for Agent 007. Authorization required.
                    </div>
                `;
            }
            
            weakLoginResult.style.display = 'block';
        });
    }

    // SQL Injection Login Form
    const loginForm = document.querySelector('.login-form');
    const loginResult = document.getElementById('login-result');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Vulnerable SQL query simulation
        const sqlQuery = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
        
        loginResult.innerHTML = `
            <div class="demo-data">
                <strong>Simulated SQL Query:</strong><br>
                <code>${sqlQuery}</code>
            </div>
        `;
        
        // Check for SQL injection attempts
        if (username.includes("'") || username.toLowerCase().includes('or') || username.includes('--')) {
            loginResult.innerHTML += `
                <div class="success">
                    <strong>🚨 SQL Injection Detected!</strong><br>
                    Login bypassed! You would be logged in as admin.<br>
                    <em>In a real application, this would grant unauthorized access.</em>
                </div>
            `;
        } else if (username === 'admin' && password === 'password') {
            loginResult.innerHTML += `
                <div class="success">
                    <strong>✅ Login Successful!</strong><br>
                    Welcome back, admin!
                </div>
            `;
        } else {
            loginResult.innerHTML += `
                <div class="error">
                    <strong>❌ Login Failed!</strong><br>
                    Invalid username or password.
                </div>
            `;
        }
        
        loginResult.style.display = 'block';
    });
    
    // SQL Injection Search Form
    const searchForm = document.querySelector('.search-form');
    const searchResults = document.getElementById('search-results');
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = document.getElementById('search-term').value;
        
        // Vulnerable SQL query simulation
        const sqlQuery = `SELECT * FROM products WHERE name LIKE '%${searchTerm}%'`;
        
        searchResults.innerHTML = `
            <div class="demo-data">
                <strong>Simulated SQL Query:</strong><br>
                <code>${sqlQuery}</code>
            </div>
        `;
        
        // Check for SQL injection attempts
        if (searchTerm.toLowerCase().includes('union') || searchTerm.includes("'") || searchTerm.includes('--')) {
            searchResults.innerHTML += `
                <div class="success">
                    <strong>🚨 SQL Injection Detected!</strong><br>
                    UNION attack successful! You would see sensitive data like:<br>
                    <div class="code-example">
                        username: admin | password: admin123<br>
                        username: user1 | password: mypass<br>
                        username: guest | password: guest
                    </div>
                    <em>In a real application, this would expose the user database.</em>
                </div>
            `;
        } else {
            searchResults.innerHTML += `
                <div class="info">
                    <strong>🔍 Search Results for "${searchTerm}":</strong><br>
                    • Product A - $19.99<br>
                    • Product B - $29.99<br>
                    • Product C - $39.99
                </div>
            `;
        }
        
        searchResults.style.display = 'block';
    });
    
    // XSS Vulnerable Comment Form
    const commentForm = document.querySelector('.comment-form');
    const commentsDisplay = document.getElementById('comments-display');
    
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('comment-name').value;
        const comment = document.getElementById('comment-text').value;
        
        // Intentionally vulnerable - directly inserting user input
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        
        // This is intentionally vulnerable to XSS
        newComment.innerHTML = `<strong>${name}:</strong> ${comment}`;
        
        commentsDisplay.appendChild(newComment);
        
        // Check if XSS payload was submitted
        if (comment.includes('<script>') || comment.includes('javascript:') || comment.includes('onload=') || comment.includes('onerror=')) {
            const alertDiv = document.createElement('div');
            alertDiv.className = 'success';
            alertDiv.innerHTML = `
                <strong>🚨 XSS Vulnerability Exploited!</strong><br>
                Your script payload has been executed!<br>
                <em>In a real application, this could steal cookies, redirect users, or perform actions on their behalf.</em>
            `;
            commentsDisplay.appendChild(alertDiv);
        }
        
        // Clear form
        document.getElementById('comment-name').value = '';
        document.getElementById('comment-text').value = '';
    });
    
    // CSRF Vulnerable Admin Form
    const adminForm = document.querySelector('.admin-form');
    const adminResult = document.getElementById('admin-result');
    
    adminForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const action = document.getElementById('admin-action').value;
        const target = document.getElementById('target-user').value;
        
        // No CSRF token validation (vulnerability)
        adminResult.innerHTML = `
            <div class="demo-data">
                <strong>Admin Action Executed:</strong><br>
                Action: ${action}<br>
                Target: ${target}<br>
                <strong>⚠️ No CSRF protection!</strong>
            </div>
            <div class="success">
                <strong>🚨 CSRF Vulnerability!</strong><br>
                Action "${action}" executed on user "${target}" without CSRF token validation.<br>
                <em>An attacker could create a malicious website that performs this action when visited by an admin.</em>
            </div>
        `;
        
        adminResult.style.display = 'block';
    });
    
    // File Upload Vulnerability
    const uploadForm = document.querySelector('.upload-form');
    const uploadResult = document.getElementById('upload-result');
    
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fileInput = document.getElementById('file-upload');
            const file = fileInput.files[0];
            
            if (file) {
                const fileName = file.name;
                const fileExtension = fileName.split('.').pop().toLowerCase();
                
                // Simulate vulnerable file upload
                uploadResult.innerHTML = `
                    <div class="demo-data">
                        <strong>File Upload Details:</strong><br>
                        Name: ${fileName}<br>
                        Size: ${file.size} bytes<br>
                        Type: ${file.type}
                    </div>
                `;
                
                // Check for dangerous file types
                const dangerousExtensions = ['php', 'jsp', 'asp', 'exe', 'sh', 'bat', 'js'];
                if (dangerousExtensions.includes(fileExtension)) {
                    uploadResult.innerHTML += `
                        <div class="success">
                            <strong>🚨 Dangerous File Upload!</strong><br>
                            File with extension ".${fileExtension}" uploaded successfully!<br>
                            <em>In a real application, this could allow code execution on the server.</em>
                        </div>
                    `;
                } else {
                    uploadResult.innerHTML += `
                        <div class="info">
                            <strong>✅ File Uploaded</strong><br>
                            Your file has been uploaded to: /uploads/${fileName}
                        </div>
                    `;
                }
            } else {
                uploadResult.innerHTML = `
                    <div class="error">
                        <strong>❌ No File Selected</strong><br>
                        Please select a file to upload.
                    </div>
                `;
            }
            
            uploadResult.style.display = 'block';
        });
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Login Attempts Log Viewer
    const viewLogsBtn = document.getElementById('view-logs-btn');
    const clearLogsBtn = document.getElementById('clear-logs-btn');
    const logsDisplay = document.getElementById('logs-display');
    const logsContent = document.getElementById('logs-content');
    
    if (viewLogsBtn) {
        viewLogsBtn.addEventListener('click', function() {
            const loginAttempts = JSON.parse(localStorage.getItem('loginAttempts') || '[]');
            
            if (loginAttempts.length === 0) {
                logsContent.innerHTML = '<p>No login attempts recorded yet.</p>';
            } else {
                let logsHtml = '<table style="width:100%; border-collapse: collapse; margin-top: 1rem;">';
                logsHtml += '<tr style="background-color: #f8f9fa; border: 1px solid #dee2e6;"><th style="padding: 0.5rem; border: 1px solid #dee2e6;">Timestamp</th><th style="padding: 0.5rem; border: 1px solid #dee2e6;">Username</th><th style="padding: 0.5rem; border: 1px solid #dee2e6;">Password</th><th style="padding: 0.5rem; border: 1px solid #dee2e6;">Result</th></tr>';
                
                loginAttempts.reverse().forEach(attempt => {
                    const resultClass = attempt.success ? 'success' : 'error';
                    const resultText = attempt.success ? '✅ Success' : '❌ Failed';
                    logsHtml += `<tr style="border: 1px solid #dee2e6;">
                        <td style="padding: 0.5rem; border: 1px solid #dee2e6; font-family: monospace; font-size: 0.9rem;">${new Date(attempt.timestamp).toLocaleString()}</td>
                        <td style="padding: 0.5rem; border: 1px solid #dee2e6;">${attempt.username}</td>
                        <td style="padding: 0.5rem; border: 1px solid #dee2e6; font-family: monospace;">${attempt.password}</td>
                        <td style="padding: 0.5rem; border: 1px solid #dee2e6; color: ${attempt.success ? '#155724' : '#721c24'};">${resultText}</td>
                    </tr>`;
                });
                
                logsHtml += '</table>';
                logsContent.innerHTML = logsHtml;
            }
            
            logsDisplay.style.display = 'block';
        });
    }
    
    if (clearLogsBtn) {
        clearLogsBtn.addEventListener('click', function() {
            localStorage.removeItem('loginAttempts');
            logsContent.innerHTML = '<p>All login attempts have been cleared.</p>';
            console.log('🧹 Login attempts log cleared');
        });
    }
    
    // Show vulnerability information on page load
    console.log("🚨 VULNERABLE TRAINING SITE LOADED 🚨");
    console.log("This site contains intentional security vulnerabilities:");
    console.log("1. SQL Injection in login and search forms");
    console.log("2. Weak authentication with common passwords");
    console.log("3. Cross-Site Scripting (XSS) in comments");
    console.log("4. Cross-Site Request Forgery (CSRF) in admin panel");
    console.log("5. Unrestricted file upload");
    console.log("Use responsibly for educational purposes only!");
});