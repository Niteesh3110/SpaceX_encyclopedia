import { getPayloadById } from "@/app/api";
import PayloadsDetails from "@/components/PayloadsDetails";

export default async function Payloads({ params }) {
  const { id } = await params;
  console.log(id);
  let data = await getPayloadById(id);
  console.log("data", data);
  return <PayloadsDetails id={id} payloadData={data} />;
}
