
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import { useEffect } from "react";
import { useState } from "react";
import JobPanel from "./JobPanel";
import Loading from "./Loading";

/**
 * CompaniesJobsPage: Shows details about a company, lists all jobs
 * associated with that company
 *
 * State:
 * -isLoading
 * -companyData
 */
function CompanyJobPage() {
  const [companyData, setCompanyData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  /** Gets list of jobs from API call based on search, or selected company */
  useEffect(function getCompanyData() {
    async function fetchCompanyData() {
      const company = await JoblyApi.getCompany(params.handle);
      setCompanyData(c => company);
      setIsLoading(l => false);
    }
    fetchCompanyData();
  }, [params.handle]);

  return (
    <>
      {!isLoading
        ?
        <div>
          <h1>{companyData.name}</h1>
          <p>{companyData.description}</p>
          {companyData.jobs.map(job => <JobPanel key={job.id} job={job} />)}
        </div>
        : <Loading />}
    </>);
}

export default CompanyJobPage;