import { getCoreById } from "@/app/api";
import CoresDetails from "@/components/CoresDetailsPage";

export default async function Cores({ params }) {
  const { id } = await params;
  console.log(id);
  const data = await getCoreById(id);
  console.log("data", data);
  return <CoresDetails id={id} coresData={data} />;
}
