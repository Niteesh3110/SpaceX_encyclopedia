import { getLaunchDataById } from "@/app/api";
import LaunchDetails from "@/components/LaunchesDetails";

export default async function Launches({ params }) {
  const { id } = await params;
  console.log(id);
  const data = await getLaunchDataById(id);
  console.log("data", data);
  return <LaunchDetails id={id} launchData={data} />;
}
