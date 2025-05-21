import { getCompanyData } from "../api";
import CompanyPage from "@/components/CompanyPage";

export default async function Company() {
  const companyData = await getCompanyData();
  console.log(companyData);
  return <CompanyPage companyData={companyData.data} />;
}
