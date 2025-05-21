import ShipsPage from "@/components/ShipsPage";
import { getShipData } from "@/app/api";

export default async function Ships({ params }) {
  const { page } = await params;
  const shipData = await getShipData({ page });

  return <ShipsPage page={page} shipData={shipData} />;
}
