import { AuthCard, RegisterForm } from '@/containers';

/**
 * Registration page route
 */
export default function RegisterRoute() {
  return  <AuthCard
      title="Create Account"
      subtitle="Sign up to get started"
    >
      <RegisterForm />
    </AuthCard>;
}
