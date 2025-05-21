import { getCompanyData, getCompanyHistoryData } from "../api.js";
import HistoryPage from "@/components/HistoryPage";

export default async function History() {
  const companyHistoryData = await getCompanyHistoryData();
  return (
    <HistoryPage
      companyHistoryData={
        companyHistoryData.boolean ? companyHistoryData.data : ""
      }
    />
  );
}
