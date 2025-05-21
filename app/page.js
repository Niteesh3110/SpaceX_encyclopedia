import { getCompanyData, getCompanyHistoryData } from "./api";
import Home from "@/components/Home";

export default async function Main() {
  const companyData = await getCompanyData();
  const companyHistoryData = await getCompanyHistoryData();
  return (
    <Home
      companyData={companyData.boolean ? companyData.data : ""}
      companyHistoryData={
        companyHistoryData.boolean ? companyHistoryData.data : ""
      }
    />
  );
}
