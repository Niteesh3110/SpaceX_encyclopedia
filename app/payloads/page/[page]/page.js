import PayloadsPage from "@/components/PayloadsPage";
import { getPayloadData } from "@/app/api";

export default async function Cores({ params }) {
  const { page } = await params;
  const payloadData = await getPayloadData({ page });

  return <PayloadsPage page={page} payloadData={payloadData} />;
}
