import { EventsPageContainer } from '@/components/events/EventsPageContainer';
import { ProtectedPage } from '@/components/ProtectedPage';

export default function Dashboard() {
  return (
    <ProtectedPage>
      <EventsPageContainer />
    </ProtectedPage>
  );
}
