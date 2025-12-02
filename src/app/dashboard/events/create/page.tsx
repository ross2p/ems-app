import { CreateEventPage } from '@/components/events/CreateEventPage';
import { ProtectedPage } from '@/components/ProtectedPage';

export default function CreateEvent() {
  return (
    <ProtectedPage>
      <CreateEventPage />
    </ProtectedPage>
  );
}
