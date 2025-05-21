import { getLaunchPadsById } from "@/app/api";
import LaunchpadsDetails from "@/components/LaunchpadsDetails";

export default async function Launchpads({ params }) {
  const { id } = await params;
  console.log(id);
  let data = await getLaunchPadsById(id);
  console.log("data", data);
  return <LaunchpadsDetails id={id} launchpadData={data} />;
}
