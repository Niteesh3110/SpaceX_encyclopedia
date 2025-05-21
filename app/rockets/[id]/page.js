import { getRocketById } from "@/app/api";
import RocketsDetails from "@/components/RocketDetails";

export default async function Payloads({ params }) {
  const { id } = await params;
  console.log(id);
  let data = await getRocketById(id);
  console.log("data", data);
  return <RocketsDetails id={id} rocketData={data} />;
}
