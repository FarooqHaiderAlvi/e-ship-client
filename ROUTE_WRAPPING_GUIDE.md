# Route Wrapping Guide - PublicRoute vs ProtectedRoute

## 🎯 Quick Reference

### Pattern Structure:
```typescript
<Route
  path="/your-path"
  element={
    <RouteWrapper>      {/* PublicRoute or ProtectedRoute */}
      <Layout>          {/* Shows Navbar */}
        <YourPage />    {/* Your component */}
      </Layout>
    </RouteWrapper>
  }
/>
```

---

## 📋 Route Types

### 1. **Public Routes** (No Auth Required)
- ✅ Accessible to everyone (guests and logged-in users)
- ✅ No wrapping needed (or use PublicRoute for auth pages)

### 2. **PublicRoute** (Prevents Logged-in Users)
- ✅ Only for Login/SignUp pages
- ✅ Blocks logged-in users from accessing

### 3. **ProtectedRoute** (Requires Auth)
- ✅ Only accessible when logged in
- ✅ Redirects to `/login` if not authenticated

---

## 🔄 How to Wrap Routes

### Pattern 1: Simple Public Route (No Wrapper)

```typescript
// For pages like Home, Cart, Checkout (guest accessible)
<Route
  path="/"
  element={
    <Layout>
      <Home />
    </Layout>
  }
/>
```

**Use for:**
- Home
- Product Details
- Cart
- Checkout
- Payment Success

---

### Pattern 2: PublicRoute (Auth Pages)

```typescript
// For Login/SignUp - prevents logged-in users
<Route
  path="/login"
  element={
    <PublicRoute>
      <Layout>
        <Login />
      </Layout>
    </PublicRoute>
  }
/>
```

**Use for:**
- `/login`
- `/signup`

**Why?** Prevents logged-in users from seeing login/signup forms.

---

### Pattern 3: ProtectedRoute (Private Pages)

```typescript
// For pages that require authentication
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Layout>
        <Profile />
      </Layout>
    </ProtectedRoute>
  }
/>
```

**Use for:**
- `/profile`
- `/orders`
- `/orders/:orderId`
- `/wishlist`
- `/addresses`
- `/account-settings`

**Why?** Only logged-in users should access these pages.

---

## 📝 Complete Example

```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/layout/Layout";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

// Import your pages
import Home from "./Components/pages/public/Home";
import Login from "./Components/pages/public/Login";
import Profile from "./Components/pages/private/Profile";
import Orders from "./Components/pages/private/Orders";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========== PUBLIC ROUTES ========== */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        {/* ========== AUTH ROUTES (PublicRoute) ========== */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Layout>
                <Login />
              </Layout>
            </PublicRoute>
          }
        />

        {/* ========== PRIVATE ROUTES (ProtectedRoute) ========== */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Layout>
                <Orders />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
```

---

## 🎯 Decision Tree

```
Need to add a new route?
    ↓
Is it an auth page (Login/SignUp)?
    ├─ YES → Use PublicRoute + Layout
    └─ NO
        ↓
    Does it require login?
        ├─ YES → Use ProtectedRoute + Layout
        └─ NO → Use Layout only
```

---

## 📊 Route Categories

### Category 1: Public Shopping Routes
```typescript
// No wrapper needed - accessible to everyone
<Route path="/" element={<Layout><Home /></Layout>} />
<Route path="/cart" element={<Layout><Cart /></Layout>} />
<Route path="/checkout" element={<Layout><Checkout /></Layout>} />
```

### Category 2: Auth Pages
```typescript
// Use PublicRoute - prevents logged-in users
<Route 
  path="/login" 
  element={<PublicRoute><Layout><Login /></Layout></PublicRoute>} 
/>
<Route 
  path="/signup" 
  element={<PublicRoute><Layout><SignUp /></Layout></PublicRoute>} 
/>
```

### Category 3: Private Pages
```typescript
// Use ProtectedRoute - requires authentication
<Route 
  path="/profile" 
  element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} 
/>
<Route 
  path="/orders" 
  element={<ProtectedRoute><Layout><Orders /></Layout></ProtectedRoute>} 
/>
```

---

## ✅ Checklist for Adding New Routes

- [ ] Determine if route needs auth
- [ ] Choose wrapper:
  - [ ] No wrapper (public shopping)
  - [ ] PublicRoute (auth pages)
  - [ ] ProtectedRoute (private pages)
- [ ] Wrap in Layout (to show Navbar)
- [ ] Import the component
- [ ] Add route to App.tsx

---

## 🔍 Current Route Setup in Your App

### ✅ Already Configured:

**Public Routes:**
- `/` - Home
- `/product-details` - Product Details
- `/cart` - Cart
- `/checkout` - Checkout
- `/payment-success` - Payment Success

**Auth Routes (PublicRoute):**
- `/login` - Login
- `/signup` - Sign Up

**Private Routes (ProtectedRoute):**
- None yet (commented out examples provided)

---

## 💡 Pro Tips

1. **Always use Layout** for pages that need Navbar
2. **PublicRoute** only for Login/SignUp
3. **ProtectedRoute** for all user account pages
4. **No wrapper** for public shopping pages
5. **Order matters**: RouteWrapper → Layout → Page

---

## 🚀 Quick Template

### Adding a New Public Page:
```typescript
<Route
  path="/new-page"
  element={
    <Layout>
      <NewPage />
    </Layout>
  }
/>
```

### Adding a New Private Page:
```typescript
<Route
  path="/new-private-page"
  element={
    <ProtectedRoute>
      <Layout>
        <NewPrivatePage />
      </Layout>
    </ProtectedRoute>
  }
/>
```

---

## 📚 Summary

| Route Type | Wrapper | Use For | Example |
|------------|---------|---------|---------|
| **Public** | None | Shopping pages | Home, Cart, Checkout |
| **Auth** | PublicRoute | Login/SignUp | Login, SignUp |
| **Private** | ProtectedRoute | User pages | Profile, Orders, Wishlist |

**Remember:** Always wrap in `<Layout>` to show Navbar! 🎉

