# Frontend Project - Architecture & Best Practices

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable UI components
├── containers/       # Feature-specific containers (forms, layouts)
├── context/          # React context providers (Auth)
├── hooks/            # Custom React hooks
├── lib/              # Utilities, services, validators
├── pages/            # Feature page components
├── styles/           # Global and theme styles
└── types/            # TypeScript type definitions
```

## Key Patterns

### 1. **Type Safety**
- All API responses typed with `GlobalResponse<T>`
- Form data validated with Zod schemas
- Error states properly typed with `AppError` interface

### 2. **Security**
- **Token Storage**: Secure JWT validation with token format checks
- **XSS Prevention**: Input sanitization utilities available
- **Password Validation**: Strong password requirements enforced
- **Rate Limiting**: Built-in rate limiter utility
- **Secure Headers**: Proper autocomplete settings on forms

### 3. **State Management**
- **Auth Context**: Global authentication state
- **React Query**: Server state management with caching
- **Local Storage**: Secure token and user data persistence

### 4. **Error Handling**
- Normalized error format across the app
- User-friendly error messages
- Network error detection
- Auth error handling with automatic redirect

### 5. **Component Architecture**
- **Presentational Components**: UI-only components in `/components/common`
- **Form Components**: Specialized form fields in `/components/forms`
- **Container Components**: Feature logic in `/containers`
- **Page Components**: Route pages in `/pages`

## Setup & Development

### Installation
```bash
cd frontend
npm install
```

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

### Running Development Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## API Integration

### Using API Services
```tsx
import { authService } from '@/lib/api';

// Login
const response = await authService.login({
  email: 'user@example.com',
  password: 'password'
});

// Get current user
const user = await authService.getMe();
```

### Using React Hooks
```tsx
import { useLogin, useAuth } from '@/hooks';

function LoginComponent() {
  const { mutate: login, isPending } = useLogin();
  const { user, logout } = useAuth();

  return (
    // Component code
  );
}
```

## Security Best Practices

### 1. Token Management
- Tokens stored in localStorage with validation
- Automatic token refresh on 401 responses
- Clear tokens on logout

### 2. Form Validation
- Server-side and client-side validation with Zod
- Password strength requirements
- Email format validation

### 3. Error Handling
- No sensitive information in error messages
- User-friendly error messages
- Proper error classification

### 4. Component Protection
- Protected pages redirect unauthenticated users
- Loading states prevent flash of content
- Proper error boundaries

## Common Tasks

### Adding a New Form Field
1. Create field component in `/components/forms`
2. Add validation schema in `/lib/validation`
3. Use in form container with `<FormField />`

### Adding a New Page
1. Create page component in `/pages`
2. Create route file in `/app`
3. Wrap with `ProtectedPage` if authentication required

### Adding API Endpoint
1. Add service function in `/lib/api/endpoints.ts`
2. Create React Query hook in `/hooks/api`
3. Use hook in component with error handling

## Performance Optimizations

- React Query caching with 5-minute stale time
- Lazy loading with dynamic imports
- Image optimization
- Code splitting per route

## Testing

Components use TypeScript for type safety and JSDoc comments for documentation.

## Deployment

1. Set environment variables for your deployment environment
2. Run `npm run build`
3. Deploy the `.next` output directory

## Contributing

- Follow TypeScript strict mode
- Add JSDoc comments to functions
- Type all API responses
- Handle errors gracefully
- Test form validation
