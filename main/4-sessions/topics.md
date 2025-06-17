

---

# **🚀 10 Standalone Projects: Sessions & Cookies Mastery**  
*(No JWT or OAuth—just pure session/cookie practice.)*  

### **🔧 Tech Stack**  
- **Backend**: Node.js + Express  
- **Session Middleware**: `express-session`  
- **Cookie Parser**: `cookie-parser`  
- **Database (for sessions)**: MongoDB (`connect-mongodb-session`)  
- **Frontend (if needed)**: EJS (for SSR)  

---

## **1. Basic Cookie Tracker**  
**Goal**: Build a page that remembers how many times a user visited.  
**Mechanics**:  
- Use a cookie (`visitCount`) to track visits.  
- Increment the count on each visit.  
- Display: *"You visited this page 5 times!"*  

**Key Learnings**:  
- Setting/reading cookies.  
- Cookie expiration (`maxAge`).  

---

## **2. Theme Switcher (Dark/Light Mode)**  
**Goal**: Let users toggle between themes using cookies.  
**Mechanics**:  
- Store the selected theme (`dark` or `light`) in a cookie.  
- Apply the theme via CSS classes on page load.  

**Key Learnings**:  
- Persisting UI preferences across visits.  

---

## **3. Login/Logout System (Session-Based)**  
**Goal**: Build a simple auth system with sessions.  
**Mechanics**:  
- Hardcoded user: `{ email: "test@test.com", password: "123" }`.  
- Store user data in `req.session.user` on login.  
- Show protected `/dashboard` only if logged in.  

**Key Learnings**:  
- Session creation/destruction (`req.session.destroy()`).  

---

## **4. Flash Messages for Form Feedback**  
**Goal**: Show success/error messages after form submissions.  
**Mechanics**:  
- Use `connect-flash` to store messages in sessions.  
- Redirect after POST and display the flash message.  

**Key Learnings**:  
- One-time session-based notifications.  

---

## **5. Shopping Cart (Session-Persisted)**  
**Goal**: Let users add items to a cart that persists across refreshes.  
**Mechanics**:  
- Store cart items in `req.session.cart` (array of product IDs).  
- Add/remove items via POST routes.  

**Key Learnings**:  
- Session-based temporary data storage.  

---

## **6. Multi-Tab Session Sync**  
**Goal**: Ensure session data stays consistent across browser tabs.  
**Mechanics**:  
- If a user logs out in one tab, log them out everywhere.  
- Use `session.touch()` to keep sessions alive.  

**Key Learnings**:  
- Session lifecycle management.  

---

## **7. CSRF-Protected Form**  
**Goal**: Secure a payment form with CSRF tokens.  
**Mechanics**:  
- Generate a token with `csurf`.  
- Validate it on form submission.  

**Key Learnings**:  
- Preventing Cross-Site Request Forgery.  

---

## **8. Rate-Limited Login Page**  
**Goal**: Block brute-force attacks with rate limiting.  
**Mechanics**:  
- Allow only 5 login attempts per 15 minutes.  
- Use `express-rate-limit`.  

**Key Learnings**:  
- Securing auth endpoints.  

---

## **9. Persistent Sessions with MongoDB**  
**Goal**: Store sessions in MongoDB so they survive server restarts.  
**Mechanics**:  
- Use `connect-mongodb-session`.  
- Verify sessions persist after restarting the server.  

**Key Learnings**:  
- Database-backed sessions.  

---

## **10. Admin Dashboard with Session Timeout**  
**Goal**: Auto-logout admins after 15 minutes of inactivity.  
**Mechanics**:  
- Reset session timer on each request.  
- Destroy session if inactive.  

**Key Learnings**:  
- Session expiration policies.  

---

## **🎯 How to Approach These Projects**  
1. **Build each one from scratch** (don’t copy-paste).  
2. **Test edge cases**:  
   - What happens if cookies are disabled?  
   - Does the session expire correctly?  
3. **Deploy one project** (e.g., Render/Heroku) to see real-world behavior.  

---

## **📌 Starter Code for Project #1 (Cookie Tracker)**  
```javascript
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

app.get("/", (req, res) => {
  let visitCount = parseInt(req.cookies.visitCount) || 0;
  visitCount++;
  res.cookie("visitCount", visitCount, { maxAge: 86400000 }); // 1 day
  res.send(`You visited this page ${visitCount} times!`);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
```

---

### **What’s Next?**  
Pick **one project**, build it, then move to the next. Once you’re comfortable, combine concepts (e.g., a **shopping cart with CSRF protection**).  

Want the starter code for another project? Let me know! 🔥