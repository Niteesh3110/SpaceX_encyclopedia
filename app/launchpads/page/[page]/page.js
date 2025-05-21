import LaunchpadsPage from "@/components/LaunchpadsPage";
import { getLaunchPadsData } from "@/app/api";

export default async function Cores({ params }) {
  const { page } = await params;
  const launchpadData = await getLaunchPadsData({ page });

  return <LaunchpadsPage page={page} launchpadData={launchpadData} />;
}
