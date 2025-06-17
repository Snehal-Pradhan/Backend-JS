# **Mastering Passport.js: 10 Standalone Projects**

Passport.js is the most popular authentication middleware for Node.js. Here's a project-based roadmap to take you from beginner to expert:

## **🔥 10 Passport.js Projects (Increasing Difficulty)**

### **1. Local Authentication (Username/Password)**
**Goal**: Implement basic login with session persistence  
**Tech**:  
- `passport-local` strategy  
- Express sessions  
- Bcrypt for password hashing  

```javascript
// Configure Passport
passport.use(new LocalStrategy(
  async (username, password, done) => {
    const user = await User.findOne({ username });
    if (!user) return done(null, false);
    if (!bcrypt.compareSync(password, user.password)) return done(null, false);
    return done(null, user);
  }
));

// Routes
app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}));
```

### **2. OAuth with Google**
**Goal**: Add "Login with Google" functionality  
**Tech**:  
- `passport-google-oauth20` strategy  
- User profile storage  

```javascript
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ googleId: profile.id }, (err, user) => {
      return done(err, user);
    });
  }
));
```

### **3. JWT Authentication**
**Goal**: Stateless auth for APIs  
**Tech**:  
- `passport-jwt` strategy  
- Token refresh system  

```javascript
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
  },
  (jwtPayload, done) => {
    User.findById(jwtPayload.sub)
      .then(user => done(null, user || false))
      .catch(err => done(err));
  }
));
```

### **4. Multi-Factor Authentication**
**Goal**: Add SMS/Email verification  
**Tech**:  
- `passport-totp` for Time-based OTP  
- Twilio/Nodemailer for delivery  

```javascript
passport.use(new TotpStrategy(
  (user, done) => {
    const secret = user.totpSecret;
    done(null, secret, 30); // 30-second step
  }
));
```

### **5. Social Media Dashboard**
**Goal**: Aggregate multiple OAuth providers  
**Tech**:  
- Passport strategies for 3+ providers (Facebook, Twitter, GitHub)  
- Unified user profile  

```javascript
// Dynamically load strategies
const strategies = {
  facebook: require('passport-facebook'),
  twitter: require('passport-twitter')
};

Object.entries(strategies).forEach(([name, Strategy]) => {
  passport.use(name, new Strategy({...}, verifyCallback));
});
```

### **6. Role-Based Access Control**
**Goal**: Admin/user permission system  
**Tech**:  
- Passport + custom middleware  
- Route protection  

```javascript
function requireRole(role) {
  return [
    passport.authenticate('jwt'),
    (req, res, next) => {
      if (req.user.role !== role) return res.sendStatus(403);
      next();
    }
  ];
}

app.get('/admin', requireRole('admin'), adminController);
```

### **7. API Key Authentication**
**Goal**: Secure server-to-server communication  
**Tech**:  
- Custom Passport strategy  
- Key rotation  

```javascript
passport.use(new APIKeyStrategy(
  (apiKey, done) => {
    ServiceAccount.findOne({ apiKey })
      .then(account => done(null, account || false))
      .catch(done);
  }
));
```

### **8. Single Sign-On (SAML)**
**Goal**: Enterprise authentication  
**Tech**:  
- `passport-saml`  
- Identity Provider integration  

```javascript
passport.use(new SamlStrategy({
    entryPoint: IDP_ENTRY_POINT,
    issuer: 'your-app',
    callbackUrl: '/auth/saml/callback',
    cert: IDP_CERT
  },
  (profile, done) => {
    User.findOrCreate({ samlId: profile.nameID }, done);
  }
));
```

### **9. Biometric Authentication**
**Goal**: WebAuthn/FIDO2 integration  
**Tech**:  
- `passport-fido2-webauthn`  
- Browser credential API  

```javascript
passport.use(new WebAuthnStrategy({
    rpName: 'Your App',
    rpID: 'yourdomain.com',
    origin: 'https://yourdomain.com'
  },
  (user, id, done) => verifyAssertion(user, id, done)
));
```

### **10. Microservice Auth Gateway**
**Goal**: Centralized authentication service  
**Tech**:  
- Multiple Passport strategies  
- JWT issuance  
- Rate limiting  

```javascript
// Unified auth endpoint
app.post('/auth/:strategy', (req, res, next) => {
  const strategy = req.params.strategy;
  passport.authenticate(strategy, { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).send();
    
    const token = createJWT(user);
    res.json({ token });
  })(req, res, next);
});
```

## **Key Concepts to Master**
1. **Strategies**: Understand how different authentication methods plug in
2. **Sessions vs Stateless**: When to use session-based vs token-based auth
3. **Middleware Order**: `passport.initialize()` vs `passport.session()`
4. **Error Handling**: Properly manage authentication failures
5. **Security**: Always validate redirects and state parameters

## **Best Practices**
- Always use HTTPS
- Implement CSRF protection for session-based auth
- Store passwords with bcrypt/scrypt
- Use HttpOnly cookies for sessions
- Regularly rotate secrets and keys

Would you like me to elaborate on any specific project or concept?