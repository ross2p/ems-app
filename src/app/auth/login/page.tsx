import { AuthCard, LoginForm } from '@/containers';

export default function LoginRoute() {
  return  
    <AuthCard
        title="Welcome Back"
        subtitle="Sign in to your account to continue"
      >
        <LoginForm />
      </AuthCard>
}
