import CoresPage from "@/components/CoresPage";
import { getCoresData } from "@/app/api";

export default async function Cores({ params }) {
  const { page } = await params;
  const coresData = await getCoresData({ page });

  return <CoresPage page={page} coresData={coresData} />;
}
