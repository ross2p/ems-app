import { DashboardPage } from '@/containers/dashboard/DashboardPage';
import { ProtectedPage } from '@/components';

export default function Dashboard() {
  return (
    <ProtectedPage>
      <DashboardPage />
    </ProtectedPage>
  );
}
