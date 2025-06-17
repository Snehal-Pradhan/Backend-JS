
# **🚀 Master JWT (JSON Web Tokens) - 10 Standalone Projects**  

Since you've mastered **Sessions & Cookies**, let’s now dive into **JWT (JSON Web Tokens)**, a stateless alternative for authentication and secure data exchange.  

This roadmap takes you from **basic JWT usage** to **expert-level implementations**, covering security, optimization, and real-world use cases.  

---

## **🔧 Tech Stack**  
- **Backend**: Node.js + Express  
- **JWT Library**: `jsonwebtoken`  
- **Database**: MongoDB (for user storage)  
- **Frontend**: Optional (React/Vanilla JS for token handling)  

---

# **🔥 10 Standalone JWT Projects (From Basic to Expert)**  

### **1. Basic JWT Generation & Verification**  
**Goal**: Create and verify a simple JWT.  
**Mechanics**:  
- Use `jsonwebtoken` to generate a token.  
- Verify it manually.  
```javascript
const jwt = require('jsonwebtoken');
const token = jwt.sign({ userId: 123 }, 'secret', { expiresIn: '1h' });
const decoded = jwt.verify(token, 'secret'); // Throws if invalid
```
**Key Learnings**:  
- JWT structure (`header.payload.signature`).  
- Manual token verification.  

---

### **2. Simple JWT Authentication (Login/Verify)**  
**Goal**: Build a login system that issues JWTs.  
**Mechanics**:  
- User logs in → Server returns JWT.  
- Protected routes check the JWT.  
```javascript
app.post('/login', (req, res) => {
  const user = authenticate(req.body); // Check DB
  const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
  res.json({ token });
});

app.get('/protected', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) return res.status(401).send('Invalid token');
    res.json({ data: 'Protected data' });
  });
});
```
**Key Learnings**:  
- Stateless auth flow.  
- Sending tokens via `Authorization: Bearer <token>`.  

---

### **3. JWT Expiry & Refresh Tokens**  
**Goal**: Implement short-lived access tokens + refresh tokens.  
**Mechanics**:  
- **Access Token**: Expires in **15 mins**.  
- **Refresh Token**: Expires in **7 days** (stored securely in DB).  
```javascript
// Login
const accessToken = jwt.sign({ userId }, 'access_secret', { expiresIn: '15m' });
const refreshToken = jwt.sign({ userId }, 'refresh_secret', { expiresIn: '7d' });
await db.saveRefreshToken(userId, refreshToken); // Store in DB

// Refresh endpoint
app.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!await db.isValidRefreshToken(refreshToken)) return res.sendStatus(403);
  const decoded = jwt.verify(refreshToken, 'refresh_secret');
  const newAccessToken = jwt.sign({ userId: decoded.userId }, 'access_secret', { expiresIn: '15m' });
  res.json({ accessToken: newAccessToken });
});
```
**Key Learnings**:  
- Token rotation for security.  
- Why refresh tokens are stored in DB.  

---

### **4. JWT in Cookies (Secure & HttpOnly)**  
**Goal**: Store JWT in cookies instead of local storage.  
**Mechanics**:  
- Set JWT as an `HttpOnly` cookie.  
- Protect against XSS.  
```javascript
res.cookie('token', token, {
  httpOnly: true,
  secure: true, // HTTPS only
  sameSite: 'strict', // Prevent CSRF
  maxAge: 3600000 // 1 hour
});
```
**Key Learnings**:  
- **Cookies vs. LocalStorage** for JWT storage.  
- Mitigating XSS attacks.  

---

### **5. Role-Based Access Control (RBAC) with JWT**  
**Goal**: Restrict routes based on user roles.  
**Mechanics**:  
- Include `role` in JWT payload.  
- Middleware checks role before granting access.  
```javascript
// Middleware
function requireRole(role) {
  return (req, res, next) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, 'secret');
    if (decoded.role !== role) return res.sendStatus(403);
    next();
  };
}

// Usage
app.get('/admin', requireRole('admin'), (req, res) => {
  res.send('Admin dashboard');
});
```
**Key Learnings**:  
- Embedding permissions in tokens.  

---

### **6. JWT Blacklisting (Logout Mechanism)**  
**Goal**: Invalidate JWTs before expiry.  
**Mechanics**:  
- Store invalidated tokens in Redis.  
- Check against blacklist on each request.  
```javascript
// Logout
app.post('/logout', (req, res) => {
  const token = req.cookies.token;
  redis.set(`blacklist:${token}`, '1', 'EX', 3600); // Expires in 1 hour
  res.clearCookie('token');
  res.send('Logged out');
});

// Middleware
function checkBlacklist(req, res, next) {
  const token = req.cookies.token;
  if (await redis.get(`blacklist:${token}`)) return res.sendStatus(401);
  next();
}
```
**Key Learnings**:  
- Stateless vs. stateful token invalidation.  

---

### **7. JWT with OAuth 2.0 (Google Sign-In)**  
**Goal**: Use JWT with third-party auth.  
**Mechanics**:  
- Google OAuth returns a JWT.  
- Verify it and issue your own JWT.  
```javascript
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
  const ticket = await client.verifyIdToken({ idToken: token });
  return ticket.getPayload();
}

app.post('/google-auth', async (req, res) => {
  const { token } = req.body;
  const googleUser = await verifyGoogleToken(token);
  const ourToken = jwt.sign({ userId: googleUser.sub }, 'secret', { expiresIn: '1h' });
  res.json({ token: ourToken });
});
```
**Key Learnings**:  
- Integrating external auth providers.  

---

### **8. JWT for API Microservices**  
**Goal**: Secure communication between services.  
**Mechanics**:  
- Service A issues a JWT for Service B.  
- Service B validates it without a shared DB.  
```javascript
// Service A
const internalToken = jwt.sign({ service: 'A' }, 'shared_secret', { expiresIn: '5m' });
fetch('https://service-b/api/data', { headers: { Authorization: `Bearer ${internalToken}` } });

// Service B
jwt.verify(token, 'shared_secret', (err, decoded) => {
  if (err || decoded.service !== 'A') return res.sendStatus(403);
  res.json({ data: 'Internal data' });
});
```
**Key Learnings**:  
- Decentralized auth in microservices.  

---

### **9. Optimizing JWT Payload Size**  
**Goal**: Reduce token size for performance.  
**Mechanics**:  
- Use short claim names (`uid` instead of `userId`).  
- Store non-critical data in a DB.  
```javascript
// Bad: { userId: 123, email: "test@test.com", role: "admin" }
// Good: { uid: 123, r: "admin" } (Fetch email from DB if needed)
const token = jwt.sign({ uid: user.id, r: user.role }, 'secret', { expiresIn: '1h' });
```
**Key Learnings**:  
- Bandwidth optimization.  

---

### **10. Real-World App: Full JWT Auth System**  
**Goal**: Combine everything into a production-ready system.  
**Features**:  
✔ Login/Logout  
✔ Refresh Tokens  
✔ Role-Based Access  
✔ Secure Cookies  
✔ Token Blacklisting  

---

## **🎯 How to Become a JWT Expert**  
1. **Build all 10 projects from scratch** (no copy-paste).  
2. **Test edge cases**:  
   - What if the token is tampered with?  
   - What if the token expires mid-request?  
3. **Deploy one project** (e.g., Render/Heroku).  

---

## **📌 Starter Code for Project #2 (JWT Auth)**  
```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '123') {
    const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.get('/protected', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) return res.status(401).send('Invalid token');
    res.send(`Welcome, ${decoded.username}!`);
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```

---

### **What’s Next?**  
1. **Pick Project #1** and start coding.  
2. **Research JWT security risks** (e.g., alg: "none" attacks).  
3. **Ask questions**—I’ll help you dive deeper!  

Want the **step-by-step breakdown** for another project? Let me know! 🔥