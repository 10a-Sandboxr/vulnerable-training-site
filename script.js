// Vulnerable Training Site JavaScript
// This code intentionally contains security vulnerabilities for educational purposes

document.addEventListener('DOMContentLoaded', function() {
    // Simulate vulnerable backend responses
    
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
    
    // Show vulnerability information on page load
    console.log("🚨 VULNERABLE TRAINING SITE LOADED 🚨");
    console.log("This site contains intentional security vulnerabilities:");
    console.log("1. SQL Injection in login and search forms");
    console.log("2. Cross-Site Scripting (XSS) in comments");
    console.log("3. Cross-Site Request Forgery (CSRF) in admin panel");
    console.log("4. Unrestricted file upload");
    console.log("Use responsibly for educational purposes only!");
});