# E-Commerce Guest Checkout - Quick Reference

## 🎯 Key Principle

**Users can browse, add to cart, and checkout WITHOUT signing up or logging in.**

## 📁 Folder Organization

### ✅ PUBLIC Pages (No Auth Required)

```
pages/public/
├── Home.tsx              ← Browse products
├── ProductDetails.tsx    ← View product details
├── CartDetails.tsx       ← View cart (guest cart)
├── Checkout.tsx          ← Complete purchase (guest checkout)
├── PaymentSuccess.tsx    ← Order confirmation
├── Login.tsx            ← Optional: Login if they want
└── SignUp.tsx           ← Optional: Create account
```

### 🔒 PRIVATE Pages (Auth Required)

```
pages/private/
├── Profile.tsx           ← User account info
├── Orders.tsx           ← Order history
├── OrderDetails.tsx     ← View past order
├── Wishlist.tsx         ← Saved items
└── Addresses.tsx        ← Saved shipping addresses
```

## 🔄 Guest Cart Flow

### 1. **Guest Adds to Cart**

```typescript
// Store in localStorage
localStorage.setItem("guestCart", JSON.stringify(cartItems));
```

### 2. **Guest Views Cart**

```typescript
// Load from localStorage
const cartItems = JSON.parse(localStorage.getItem("guestCart") || "[]");
```

### 3. **Guest Checks Out**

```typescript
// Collect shipping info (email, address, phone)
// Process payment
// Create order with guest email
```

### 4. **After Checkout (Optional)**

```typescript
// Prompt: "Create account to track your orders?"
// If yes → SignUp page
// If no → Continue as guest
```

## 🛒 Cart Management Strategy

### Option A: LocalStorage (Recommended)

```typescript
// Pros: Persists across browser sessions
// Cons: Can be cleared by user

// Save
localStorage.setItem("guestCart", JSON.stringify(items));

// Load
const items = JSON.parse(localStorage.getItem("guestCart") || "[]");
```

### Option B: Session Storage

```typescript
// Pros: Auto-clears when browser closes
// Cons: Lost on refresh if tab closed

sessionStorage.setItem("guestCart", JSON.stringify(items));
```

### Option C: Backend Guest Session

```typescript
// Pros: Works across devices, can merge on login
// Cons: Requires backend support

// Create guest session ID
const guestSessionId = generateUUID();
// Store in cookie/localStorage
// Backend tracks cart by session ID
```

## 🔐 Route Configuration

```typescript
// App.tsx
<Routes>
  {/* ✅ PUBLIC - No Protection */}
  <Route path="/" element={<Home />} />
  <Route path="/cart" element={<CartDetails />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/payment-success" element={<PaymentSuccess />} />

  {/* 🔒 PRIVATE - Protected */}
  <Route
    path="/orders"
    element={
      <ProtectedRoute>
        <Orders />
      </ProtectedRoute>
    }
  />
  <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    }
  />
</Routes>
```

## 💡 Implementation Tips

### 1. **Cart State Management**

```typescript
// Redux slice
interface CartState {
  items: CartItem[];
  isGuest: boolean;
  guestCartId?: string;
}

// Check if user is logged in
const isGuest = !user;
```

### 2. **Merge Cart on Login**

```typescript
// When user logs in
useEffect(() => {
  if (user && guestCart.length > 0) {
    // Merge guest cart with user cart
    mergeGuestCartToUserCart(guestCart);
    // Clear guest cart
    localStorage.removeItem("guestCart");
  }
}, [user]);
```

### 3. **Checkout Form Logic**

```typescript
const Checkout = () => {
  const { user } = useSelector((state) => state.auth);
  const isGuest = !user;

  return (
    <>
      {isGuest ? (
        <GuestCheckoutForm /> // Collect email, address
      ) : (
        <AuthenticatedCheckoutForm /> // Use saved addresses
      )}
    </>
  );
};
```

## 📊 Decision Tree

```
User visits site
    ↓
Browse products? → YES → Home/ProductDetails (PUBLIC)
    ↓
Add to cart? → YES → Store in localStorage (GUEST CART)
    ↓
View cart? → YES → CartDetails (PUBLIC)
    ↓
Checkout? → YES → Checkout (PUBLIC)
    ↓
    ├─ Guest → Collect email/address → Complete order
    └─ Logged in → Use saved address → Complete order
    ↓
After checkout
    ↓
    ├─ Guest → Prompt: "Create account?"
    │   ├─ YES → SignUp → Login → View Orders (PRIVATE)
    │   └─ NO → Continue as guest
    └─ Logged in → Redirect to Orders (PRIVATE)
```

## ✅ Checklist

- [ ] Cart stored in localStorage for guests
- [ ] Checkout page accessible without login
- [ ] Guest checkout collects email/phone for order tracking
- [ ] Cart merges with user cart on login
- [ ] Optional account creation prompt after checkout
- [ ] Order history only accessible when logged in
- [ ] Profile/Account pages protected
- [ ] Wishlist requires authentication

## 🎨 User Experience Flow

1. **Guest User Journey**

   - Browse → Add to Cart → Checkout → Pay → Done ✅
   - (Optional) Create account to track orders

2. **Logged-in User Journey**

   - Browse → Add to Cart → Checkout (faster with saved info) → Pay → View Orders ✅

3. **Guest → User Transition**
   - Guest adds items → Logs in → Cart merges → Continue shopping ✅
