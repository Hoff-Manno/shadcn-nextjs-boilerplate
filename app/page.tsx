import SponsorshipOverviewWrapper from '@/components/SponsorshipOverviewWrapper';
import { getUserDetails, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function Dashboard() {
  const supabase = await createClient();
  const [user, userDetails] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase)
  ]);

  // Show sponsorship overview as the landing page
  return <SponsorshipOverviewWrapper />;
}
