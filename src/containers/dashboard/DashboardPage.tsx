'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import { useAuth } from '@/hooks';
import { Loading } from '@/components/common';
import { useLogout } from '@/hooks/api';
import Link from 'next/link';

/**
 * Dashboard page component
 * Displays authenticated user dashboard with profile info
 */
export function DashboardPage() {
  const { user, isLoading } = useAuth();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  if (isLoading) {
    return <Loading message="Loading dashboard..." fullScreen />;
  }

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ padding: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error" sx={{ marginBottom: 2 }}>
            You are not authenticated
          </Typography>
          <Link href="/auth/login">
            <Button variant="contained">Go to Login</Button>
          </Link>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ padding: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <Box>
            <Typography variant="h3" sx={{ marginBottom: 1 }}>
              Welcome, {user.firstName}!
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Email: {user.email}
            </Typography>
          </Box>
          <Button 
            variant="outlined" 
            color="error"
            onClick={() => logout()}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </Button>
        </Box>

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 3,
          marginTop: 4,
        }}>
          {/* Profile Section */}
          <Box sx={{ backgroundColor: '#f5f5f5', padding: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Profile Information
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Full Name:</strong> {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
              <strong>Email:</strong> {user.email}
            </Typography>
          </Box>

          {/* Account Section */}
          <Box sx={{ backgroundColor: '#f5f5f5', padding: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Account
            </Typography>
            <Link href="/">
              <Button 
                variant="text" 
                fullWidth 
                sx={{ justifyContent: 'flex-start', marginBottom: 1 }}
              >
                Settings
              </Button>
            </Link>
            <Link href="/">
              <Button 
                variant="text" 
                fullWidth 
                sx={{ justifyContent: 'flex-start' }}
              >
                Help & Support
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
