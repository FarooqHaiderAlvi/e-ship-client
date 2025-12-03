# What is Zod? - Complete Explanation

## 🎯 What is Zod?

**Zod** is a TypeScript-first schema validation library. It lets you define the shape and validation rules for your data, and it automatically generates TypeScript types.

### In Simple Terms:
- **Schema** = A blueprint/definition of what your data should look like
- **Validation** = Checking if data matches the schema
- **TypeScript Types** = Automatically generated from your schema

---

## 🔍 Why Use Zod?

### 1. **Type Safety**
```typescript
// Define schema once
const userSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18),
});

// TypeScript type is automatically generated!
type User = z.infer<typeof userSchema>;
// User = { email: string; age: number; }
```

### 2. **Runtime Validation**
```typescript
// Validate data at runtime
const result = userSchema.safeParse({
  email: "invalid-email",  // ❌ Not a valid email
  age: 15                   // ❌ Less than 18
});

if (!result.success) {
  console.log(result.error);  // Shows validation errors
}
```

### 3. **Works Great with Forms**
- Validates form inputs
- Shows error messages
- Prevents invalid data submission

---

## 📝 Basic Zod Examples

### Example 1: Simple Validation
```typescript
import { z } from "zod";

// Define schema
const emailSchema = z.string().email("Invalid email address");

// Validate
const result = emailSchema.safeParse("user@example.com");
// ✅ Success: { success: true, data: "user@example.com" }

const result2 = emailSchema.safeParse("not-an-email");
// ❌ Error: { success: false, error: ZodError }
```

### Example 2: Object Schema
```typescript
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be 6+ characters"),
});

// TypeScript type is automatically created!
type LoginData = z.infer<typeof loginSchema>;
// LoginData = { email: string; password: string; }

// Validate
const data = loginSchema.parse({
  email: "user@example.com",
  password: "secret123"
});
// ✅ Valid data
```

### Example 3: Advanced Validation
```typescript
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain uppercase letter")
    .regex(/[0-9]/, "Password must contain a number"),
  age: z.number().min(18, "Must be 18 or older"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // Error shows on confirmPassword field
});
```

---

## 🔗 Zod + React Hook Form

### Why They Work Together:

1. **Zod** = Defines validation rules
2. **React Hook Form** = Handles form state and submission
3. **@hookform/resolvers** = Connects them together

### Complete Example:

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. Define schema with Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// 2. Infer TypeScript type from schema
type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  // 3. Use React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema), // Connect Zod to React Hook Form
  });

  const onSubmit = (data: LoginFormData) => {
    // data is type-safe and validated!
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...register("password")} type="password" />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
};
```

---

## 🆚 Zod vs Other Validation Libraries

### Zod vs Yup

| Feature | Zod | Yup |
|---------|-----|-----|
| **TypeScript** | First-class support ✅ | Good support |
| **Bundle Size** | ~12KB | ~13KB |
| **Type Inference** | Automatic ✅ | Manual |
| **Syntax** | Modern, clean ✅ | Older style |
| **Performance** | Fast ✅ | Fast |

### Zod vs Manual Validation

**Without Zod (Manual):**
```typescript
const validateEmail = (email: string) => {
  if (!email) return "Email is required";
  if (!email.includes("@")) return "Invalid email";
  return null;
};

const validatePassword = (password: string) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password too short";
  return null;
};
```

**With Zod:**
```typescript
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
});
```

**Benefits:**
- ✅ Less code
- ✅ Type-safe
- ✅ Reusable
- ✅ Better error messages

---

## 📚 Common Zod Patterns

### 1. Optional Fields
```typescript
const schema = z.object({
  name: z.string(),
  email: z.string().email().optional(), // Optional
  phone: z.string().optional(),
});
```

### 2. Default Values
```typescript
const schema = z.object({
  name: z.string().default("Anonymous"),
  age: z.number().default(0),
});
```

### 3. Enums
```typescript
const schema = z.object({
  role: z.enum(["admin", "user", "guest"]),
  status: z.enum(["active", "inactive"]),
});
```

### 4. Arrays
```typescript
const schema = z.object({
  tags: z.array(z.string()),
  numbers: z.array(z.number()),
});
```

### 5. Custom Validation
```typescript
const schema = z.object({
  password: z.string().refine(
    (val) => val.length >= 8,
    "Password must be 8+ characters"
  ),
});
```

### 6. Conditional Validation
```typescript
const schema = z.object({
  age: z.number(),
  hasLicense: z.boolean(),
  licenseNumber: z.string().optional(),
}).refine(
  (data) => data.age >= 18 || !data.hasLicense,
  {
    message: "Must be 18+ to have a license",
    path: ["licenseNumber"],
  }
);
```

---

## 🎯 When to Use Zod

### ✅ Use Zod When:
- You need form validation
- You want TypeScript type safety
- You're using React Hook Form
- You need runtime validation
- You want to validate API responses

### ❌ Don't Use Zod When:
- You only need simple validation (use native HTML5)
- You're not using TypeScript
- Bundle size is critical (though Zod is small)

---

## 📦 Installation

```bash
# Just Zod
npm install zod

# Zod + React Hook Form integration
npm install zod react-hook-form @hookform/resolvers
```

---

## 🔄 Real-World Example: Login Form

### Before (Without Zod):
```typescript
const [email, setEmail] = useState("");
const [emailError, setEmailError] = useState("");
const [password, setPassword] = useState("");
const [passwordError, setPasswordError] = useState("");

const validate = () => {
  let valid = true;
  
  if (!email) {
    setEmailError("Email is required");
    valid = false;
  } else if (!email.includes("@")) {
    setEmailError("Invalid email");
    valid = false;
  }
  
  if (!password) {
    setPasswordError("Password is required");
    valid = false;
  } else if (password.length < 6) {
    setPasswordError("Password too short");
    valid = false;
  }
  
  return valid;
};
```

### After (With Zod):
```typescript
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(loginSchema),
});

// Validation is automatic! ✅
```

---

## 📊 Summary

**Zod is:**
- A TypeScript-first schema validation library
- Used to define and validate data structures
- Works great with React Hook Form
- Automatically generates TypeScript types
- Provides runtime validation

**Key Benefits:**
- ✅ Type-safe
- ✅ Less code
- ✅ Better error messages
- ✅ Reusable schemas
- ✅ Great TypeScript support

**Best Use Case:**
- Form validation in React
- API response validation
- Type-safe data handling

---

## 🚀 Quick Start

```typescript
import { z } from "zod";

// 1. Define schema
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// 2. Get TypeScript type
type FormData = z.infer<typeof schema>;

// 3. Validate
const result = schema.parse({ email: "test@example.com", password: "secret123" });
```

That's Zod in a nutshell! 🎉

