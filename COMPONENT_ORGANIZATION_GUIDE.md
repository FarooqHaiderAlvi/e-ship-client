# React Component Organization Guide - E-Commerce with Guest Checkout

## Recommended Folder Structure for E-Commerce

```
src/
├── Components/
│   ├── common/              # Reusable UI components (buttons, inputs, modals, etc.)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Spinner.tsx
│   │
│   ├── layout/              # Layout components (Navbar, Footer, Sidebar, etc.)
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   │
│   └── features/            # Feature-specific components (organized by domain)
│       ├── products/
│       │   ├── ProductCard.tsx
│       │   └── ProductList.tsx
│       ├── cart/
│       │   ├── CartItem.tsx
│       │   ├── CartSummary.tsx
│       │   └── GuestCart.tsx      # Guest cart management
│       ├── checkout/
│       │   ├── CheckoutForm.tsx
│       │   ├── ShippingForm.tsx
│       │   └── PaymentForm.tsx
│       └── auth/
│           └── AuthForm.tsx
│
├── pages/                   # Page-level components (route components)
│   ├── public/              # Public pages (NO authentication required)
│   │   ├── Home.tsx
│   │   ├── ProductDetails.tsx
│   │   ├── CartDetails.tsx         # ✅ Guest cart accessible
│   │   ├── Checkout.tsx            # ✅ Guest checkout accessible
│   │   ├── PaymentSuccess.tsx      # ✅ Accessible after checkout
│   │   ├── Login.tsx
│   │   └── SignUp.tsx
│   │
│   └── private/             # Private pages (REQUIRE authentication)
│       ├── Profile.tsx             # User account settings
│       ├── Orders.tsx              # Order history
│       ├── OrderDetails.tsx        # Individual order details
│       ├── Addresses.tsx           # Saved addresses
│       ├── Wishlist.tsx            # Saved wishlist
│       └── AccountSettings.tsx     # Account management
│
├── routes/                  # Route configuration and protected route wrapper
│   ├── ProtectedRoute.tsx
│   └── PublicRoute.tsx
│
├── store/                   # State management
│   ├── features/
│   │   ├── cart/
│   │   │   ├── cartSlice.ts        # Cart state (guest & authenticated)
│   │   │   └── cartThunk.ts
│   │   └── auth/
│   │       ├── authSlice.ts
│   │       └── authThunk.ts
│
└── App.tsx
```

## Key Principles

### 1. **Pages vs Components**

- **Pages** (`src/pages/`): Full page components that correspond to routes
- **Components** (`src/Components/`): Reusable UI components, layout components, and feature-specific components

### 2. **Public vs Private Pages (E-Commerce Specific)**

#### **Public Pages** (`pages/public/`): Accessible to everyone (including guests)

- **Shopping Flow** (No auth required):
  - `Home.tsx` - Product listing
  - `ProductDetails.tsx` - Product information
  - `CartDetails.tsx` - Shopping cart (guest cart stored in localStorage/session)
  - `Checkout.tsx` - Checkout process (guest checkout)
  - `PaymentSuccess.tsx` - Order confirmation
- **Authentication Pages**:
  - `Login.tsx` - User login
  - `SignUp.tsx` - User registration
- **Why these are public?**
  - Users can browse and purchase without creating an account
  - Guest cart is managed via localStorage or session storage
  - Guest checkout collects email/phone for order tracking
  - Optional: Prompt to create account after successful checkout

#### **Private Pages** (`pages/private/`): Require authentication

- **Account Management**:
  - `Profile.tsx` - User profile information
  - `AccountSettings.tsx` - Account settings and preferences
- **Order Management**:
  - `Orders.tsx` - Order history list
  - `OrderDetails.tsx` - Individual order details
- **User Features**:
  - `Addresses.tsx` - Saved shipping addresses
  - `Wishlist.tsx` - Saved wishlist items
  - `PaymentMethods.tsx` - Saved payment methods (optional)
- **Why these are private?**
  - Personal information and order history
  - Saved preferences and addresses
  - User-specific data that requires authentication

### 3. **Component Categories**

#### **Common Components** (`Components/common/`)

- Generic, reusable UI elements
- Examples: Button, Input, Modal, Card, Spinner, Alert
- No business logic, highly reusable

#### **Layout Components** (`Components/layout/`)

- Structure and navigation components
- Examples: Navbar, Footer, Sidebar, Layout wrapper
- Used across multiple pages

#### **Feature Components** (`Components/features/`)

- Domain-specific components grouped by feature
- Examples: ProductCard, CartItem, AuthForm
- Contains business logic related to specific features

## Migration Strategy for Your Current Project

### Current Structure → Recommended Structure:

```
Components/
├── Home.tsx              → pages/public/Home.tsx
├── ProductDetails.tsx   → pages/public/ProductDetails.tsx
├── CartDetails.tsx      → pages/public/CartDetails.tsx      ✅ (Guest accessible)
├── Checkout.tsx         → pages/public/Checkout.tsx         ✅ (Guest accessible)
├── PaymentSuccess.tsx   → pages/public/PaymentSuccess.tsx   ✅ (Guest accessible)
├── CheckoutForm.tsx     → Components/features/checkout/CheckoutForm.tsx
├── Navbar.tsx           → Components/layout/Navbar.tsx
└── pages/
    ├── Login.tsx        → pages/public/Login.tsx
    └── ProtectedRoute.tsx → routes/ProtectedRoute.tsx
```

## Best Practices

### 1. **Naming Conventions**

- **Pages**: PascalCase, descriptive (e.g., `ProductDetails.tsx`, `UserProfile.tsx`)
- **Components**: PascalCase, concise (e.g., `Button.tsx`, `ProductCard.tsx`)
- **Folders**: lowercase, descriptive (e.g., `common/`, `features/`, `public/`)

### 2. **File Organization**

- One component per file
- Component name should match file name
- Use index files for cleaner imports (optional)

### 3. **Import Paths**

```typescript
// Good - Clear and explicit
import Home from "../pages/public/Home";
import Navbar from "../Components/layout/Navbar";
import Button from "../Components/common/Button";

// Consider using path aliases in tsconfig.json
import Home from "@/pages/public/Home";
import Navbar from "@/Components/layout/Navbar";
```

### 4. **Route Protection (E-Commerce Pattern)**

```typescript
// In App.tsx
<Routes>
  {/* Public Routes - Guest Accessible */}
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<SignUp />} />
  <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="/cart" element={<CartDetails />} /> {/* ✅ Guest cart */}
  <Route path="/checkout" element={<Checkout />} /> {/* ✅ Guest checkout */}
  <Route path="/payment-success" element={<PaymentSuccess />} /> {/* ✅ Guest accessible */}
  {/* Private Routes - Authentication Required */}
  <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    }
  />
  <Route
    path="/orders"
    element={
      <ProtectedRoute>
        <Orders />
      </ProtectedRoute>
    }
  />
  <Route
    path="/orders/:orderId"
    element={
      <ProtectedRoute>
        <OrderDetails />
      </ProtectedRoute>
    }
  />
  <Route
    path="/wishlist"
    element={
      <ProtectedRoute>
        <Wishlist />
      </ProtectedRoute>
    }
  />
</Routes>
```

### 5. **Guest Cart Management Strategy**

#### Option 1: LocalStorage (Recommended for Guest Cart)

```typescript
// store/features/cart/cartSlice.ts
interface CartState {
  items: CartItem[];
  isGuest: boolean;
  guestCartId?: string;
}

// Store guest cart in localStorage
const saveGuestCart = (cart: CartItem[]) => {
  localStorage.setItem("guestCart", JSON.stringify(cart));
};

// Load guest cart on app init
const loadGuestCart = (): CartItem[] => {
  const saved = localStorage.getItem("guestCart");
  return saved ? JSON.parse(saved) : [];
};
```

#### Option 2: Session Storage

- Similar to localStorage but cleared when browser closes
- Good for temporary guest sessions

#### Option 3: Backend Guest Session

- Create a guest session ID on backend
- Store in cookies or localStorage
- Merge guest cart with user cart on login

### 6. **Guest Checkout Flow**

```typescript
// pages/public/Checkout.tsx
const Checkout = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isGuest, setIsGuest] = useState(!user);

  // Guest checkout: Collect email, phone, shipping address
  // Authenticated checkout: Use saved addresses, faster flow

  return (
    <div>
      {isGuest ? <GuestCheckoutForm /> : <AuthenticatedCheckoutForm />}

      {/* Optional: Prompt to create account */}
      {isGuest && (
        <div className="mt-4">
          <p>Create an account to track your orders?</p>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </div>
  );
};
```

## Alternative: Feature-Based Organization

For larger applications, consider feature-based organization:

```
src/
├── features/
│   ├── products/
│   │   ├── components/
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductList.tsx
│   │   ├── pages/
│   │   │   ├── ProductDetails.tsx
│   │   │   └── ProductListPage.tsx
│   │   └── hooks/
│   │       └── useProducts.ts
│   │
│   ├── cart/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── CartDetails.tsx
│   │   │   └── Checkout.tsx
│   │   └── hooks/
│   │
│   └── auth/
│       ├── components/
│       ├── pages/
│       │   └── Login.tsx
│       └── hooks/
│
└── shared/
    ├── components/
    ├── layout/
    └── utils/
```

## Summary - E-Commerce with Guest Checkout

**Recommended Structure for Your E-Shop:**

### 1. **Public Pages** → `src/pages/public/` (No Auth Required)

- **Shopping Flow**: Home, ProductDetails, CartDetails, Checkout, PaymentSuccess
- **Auth Pages**: Login, SignUp
- ✅ **Key Point**: Cart and Checkout are PUBLIC to allow guest checkout

### 2. **Private Pages** → `src/pages/private/` (Auth Required)

- **Account**: Profile, AccountSettings
- **Orders**: Orders, OrderDetails
- **Features**: Wishlist, Addresses, PaymentMethods

### 3. **Layout Components** → `src/Components/layout/`

- Navbar, Footer, Layout

### 4. **Common Components** → `src/Components/common/`

- Reusable UI elements (Button, Input, Modal, etc.)

### 5. **Feature Components** → `src/Components/features/`

- Organized by domain: products/, cart/, checkout/, auth/

### 6. **Route Utilities** → `src/routes/`

- ProtectedRoute (for private pages only)
- PublicRoute (optional, for redirecting authenticated users)

## Key E-Commerce Considerations

### Guest Cart Management

- ✅ Store guest cart in **localStorage** or **sessionStorage**
- ✅ Merge guest cart with user cart on login
- ✅ Support both guest and authenticated cart flows

### Checkout Flow

- ✅ **Guest Checkout**: Collect email, phone, shipping address
- ✅ **Authenticated Checkout**: Use saved addresses, faster flow
- ✅ Optional: Prompt account creation after successful guest checkout

### State Management

- ✅ Separate cart state for guest vs authenticated users
- ✅ Handle cart persistence across page refreshes
- ✅ Sync guest cart with backend when user logs in

This structure provides:

- ✅ Guest checkout support (no forced registration)
- ✅ Clear separation of public vs private features
- ✅ Scalable for growth
- ✅ Better code organization
- ✅ Easier maintenance
- ✅ Improved user experience (lower friction to purchase)
