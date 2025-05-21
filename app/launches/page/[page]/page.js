import LaunchesPage from "@/components/LaunchesPage";
import { getLaunchData } from "@/app/api";

export default async function Cores({ params }) {
  const { page } = await params;
  const launchData = await getLaunchData({ page });

  return <LaunchesPage page={page} launchData={launchData} />;
}
