import Rockets from "@/components/RocketsPage";
import { getRocketData } from "@/app/api";

export default async function RocketsPage({ params }) {
  const { page } = await params;
  const rocketData = await getRocketData({ page });

  return <Rockets page={page} rocketData={rocketData} />;
}
