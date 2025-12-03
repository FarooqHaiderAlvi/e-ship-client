# Navbar & Layout Guide

## 📁 File Structure

```
src/
├── Components/
│   ├── layout/
│   │   └── Layout.tsx          ← Wraps pages with Navbar
│   └── Navbar.tsx               ← Navigation bar component
└── App.tsx                      ← Routes wrapped in Layout
```

## 🎯 How It Works

### 1. Layout Component (`src/Components/layout/Layout.tsx`)

The Layout component wraps all your pages and includes the Navbar:

```typescript
<Layout>
  <Home />  {/* Navbar appears above Home */}
</Layout>
```

**Purpose**: Ensures Navbar appears on every page without repeating code.

### 2. Navbar Component (`src/Components/Navbar.tsx`)

The Navbar includes:
- ✅ Logo (links to home)
- ✅ Navigation links (Home, Products, etc.)
- ✅ Cart icon (links to cart)
- ✅ Auth buttons (Login/SignUp or Logout based on user state)
- ✅ User name display when logged in

### 3. App.tsx Setup

All routes are wrapped in `<Layout>`:

```typescript
<Routes>
  <Route
    path="/"
    element={
      <Layout>
        <Home />
      </Layout>
    }
  />
  {/* All other routes... */}
</Routes>
```

## 🔄 How to Add Navbar to New Pages

### Method 1: Wrap in Layout (Recommended)

```typescript
// In App.tsx
<Route
  path="/new-page"
  element={
    <Layout>
      <NewPage />
    </Layout>
  }
/>
```

### Method 2: If You Don't Want Navbar

```typescript
// In App.tsx
<Route
  path="/no-navbar-page"
  element={<NoNavbarPage />}  // No Layout wrapper
/>
```

## ✨ Features

### Auth-Aware Navigation

The Navbar automatically shows:
- **When NOT logged in**: "Log In" and "Sign Up" buttons
- **When logged in**: User name and "Logout" button

### Navigation Links

- **Logo** → Links to home (`/`)
- **Home** → Links to home (`/`)
- **Cart Icon** → Links to cart (`/cart`)
- **Login/Logout** → Based on auth state

## 📝 Example: Adding a New Page

```typescript
// 1. Create your page component
// src/Components/pages/public/About.tsx
export default function About() {
  return <div>About Page</div>;
}

// 2. Add route in App.tsx with Layout
import About from "./Components/pages/public/About";

<Route
  path="/about"
  element={
    <Layout>
      <About />
    </Layout>
  }
/>

// 3. Navbar automatically appears! ✅
```

## 🎨 Customizing Navbar

### Add New Navigation Links

Edit `src/Components/Navbar.tsx`:

```typescript
<div className="hidden xl:flex items-center space-x-8">
  <Link to="/" className="hover:text-blue-600 transition">
    Home
  </Link>
  <Link to="/products" className="hover:text-blue-600 transition">
    Products
  </Link>
  {/* Add more links here */}
</div>
```

### Change Styling

The Navbar uses Tailwind CSS classes. Modify the className props in `Navbar.tsx`.

## 🔍 Current Routes with Navbar

All these pages have the Navbar:
- ✅ `/` - Home
- ✅ `/product-details` - Product Details
- ✅ `/cart` - Cart
- ✅ `/checkout` - Checkout
- ✅ `/payment-success` - Payment Success
- ✅ `/login` - Login
- ✅ `/signup` - Sign Up

## 💡 Best Practices

1. **Always use Layout** for pages that need Navbar
2. **Don't import Navbar directly** in page components
3. **Use Layout wrapper** in App.tsx for consistency
4. **Keep Navbar logic** in Navbar.tsx, not in pages

## 🚀 Summary

- **Layout.tsx** = Wrapper that includes Navbar
- **Navbar.tsx** = Navigation bar with auth-aware buttons
- **App.tsx** = Routes wrapped in Layout
- **Result** = Navbar appears on every page automatically! 🎉

