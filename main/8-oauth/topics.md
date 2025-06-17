# **Mastering OAuth 2.0: 10 Standalone Projects**

OAuth 2.0 is the industry standard for authorization. Here's a project-based roadmap to take you from beginner to expert:

## **🔥 10 OAuth 2.0 Projects (Increasing Difficulty)**

### **1. Basic OAuth Client (Authorization Code Flow)**
**Goal**: Implement "Login with Google"  
**Tech**:  
- Express.js  
- `openid-client` or `passport-google-oauth20`  
- Session management  

```javascript
// Using googleapis library
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

app.get('/auth/google', (req, res) => {
  const url = client.generateAuthUrl({
    scope: ['profile', 'email'],
    redirect_uri: 'http://yourdomain.com/auth/google/callback'
  });
  res.redirect(url);
});

app.get('/auth/google/callback', async (req, res) => {
  const { tokens } = await client.getToken(req.query.code);
  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: GOOGLE_CLIENT_ID
  });
  const payload = ticket.getPayload();
  // Store user session
});
```

### **2. OAuth Provider (Build Your Own)**
**Goal**: Create a minimal OAuth 2.0 provider  
**Tech**:  
- Node.js  
- JWT for tokens  
- PostgreSQL/MongoDB  

```javascript
// Token endpoint
app.post('/oauth/token', (req, res) => {
  if (req.body.grant_type === 'authorization_code') {
    // Validate code and issue tokens
    const accessToken = jwt.sign({ sub: user.id }, SECRET, { expiresIn: '1h' });
    res.json({ access_token: accessToken, token_type: 'Bearer' });
  }
});
```

### **3. PKCE Implementation**
**Goal**: Secure mobile/native app auth  
**Tech**:  
- `crypto` for code verifier/challenge  
- SHA256 hashing  

```javascript
// Generate code verifier
const codeVerifier = crypto.randomBytes(32).toString('hex');
const codeChallenge = crypto
  .createHash('sha256')
  .update(codeVerifier)
  .digest('base64')
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=+$/, '');
```

### **4. Refresh Token Rotation**
**Goal**: Implement secure token refresh  
**Tech**:  
- JWT with expiration  
- Token blacklisting  

```javascript
app.post('/oauth/token', (req, res) => {
  if (req.body.grant_type === 'refresh_token') {
    // Verify old refresh token
    // Issue new access_token + refresh_token
    // Invalidate old refresh token
  }
});
```

### **5. OAuth for Microservices**
**Goal**: Service-to-service auth  
**Tech**:  
- Client Credentials Flow  
- JWKS endpoint  

```javascript
// Service A getting token for Service B
const token = await getClientCredentialsToken({
  audience: 'service-b',
  scope: 'read:data'
});

// Service B verification
const jwt = require('express-jwt');
app.use(jwt({
  secret: jwksRsa.expressJwtSecret({
    jwksUri: 'https://auth.yourdomain.com/.well-known/jwks.json'
  }),
  audience: 'service-b'
}));
```

### **6. Device Authorization Flow**
**Goal**: Support IoT/Smart TV apps  
**Tech**:  
- User code generation  
- Polling mechanism  

```javascript
// Device endpoint
app.post('/oauth/device/code', (req, res) => {
  const userCode = generateUserCode(); // e.g. "ABCD-EFGH"
  const deviceCode = crypto.randomBytes(32).toString('hex');
  // Store mapping in DB
  res.json({
    device_code: deviceCode,
    user_code: userCode,
    verification_uri: 'https://yourdomain.com/activate',
    expires_in: 900
  });
});
```

### **7. OAuth Token Introspection**
**Goal**: Build a token validation endpoint  
**Tech**:  
- RFC 7662 implementation  
- Rate limiting  

```javascript
app.post('/oauth/introspect', async (req, res) => {
  const token = req.body.token;
  const isActive = await checkTokenValidity(token);
  res.json({ active: isActive });
});
```

### **8. Dynamic Client Registration**
**Goal**: RFC 7591 implementation  
**Tech**:  
- Client metadata storage  
- Software statements  

```javascript
app.post('/register', (req, res) => {
  const clientId = generateId();
  const clientSecret = generateSecret();
  // Store client metadata
  res.json({
    client_id: clientId,
    client_secret: clientSecret,
    client_secret_expires_at: 0
  });
});
```

### **9. OAuth Proxy with Rate Limiting**
**Goal**: Protect APIs with OAuth  
**Tech**:  
- Express middleware  
- Redis for rate limiting  

```javascript
app.use('/api', (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send();
  
  // Check rate limits
  const remaining = await checkRateLimit(token);
  if (remaining <= 0) return res.status(429).send();
  
  next();
});
```

### **10. Full OAuth Ecosystem**
**Goal**: Complete auth server  
**Features**:  
- All OAuth flows  
- Admin dashboard  
- Token revocation  
- Logging  

```javascript
// Complete OAuth2 server using node-oauth2-server
const OAuth2Server = require('oauth2-server');
const oauth = new OAuth2Server({
  model: require('./model') // Your implementation
});

app.all('/oauth/token', (req, res) => {
  const request = new Request(req);
  const response = new Response(res);
  
  oauth.token(request, response)
    .then(() => res.json(response.body))
    .catch(err => res.status(err.code).json(err));
});
```

## **Key Security Considerations**
1. **Always use HTTPS**
2. **Validate redirect URIs strictly**
3. **Implement CSRF protection for auth flows**
4. **Use PKCE for public clients**
5. **Rotate secrets regularly**

## **Best Practices**
- Store only necessary data in tokens
- Use short-lived access tokens + refresh tokens
- Implement token revocation
- Monitor for suspicious activity

Would you like me to elaborate on any specific project or security aspect?