import { getShipsById } from "@/app/api";
import ShipsDetails from "@/components/ShipDetails";

export default async function Ships({ params }) {
  const { id } = await params;
  console.log(id);
  let data = await getShipsById(id);
  console.log("data", data);
  return <ShipsDetails id={id} shipData={data} />;
}
