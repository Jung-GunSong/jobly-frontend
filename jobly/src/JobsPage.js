import SearchBar from "./SearchBar";
import JobPanel from "./JobPanel";
import { useState } from "react";
import JoblyApi from "./api";
import { useEffect } from "react";
import Loading from "./Loading";
import "./JobPage.css"
/**
 * Renders page of Job components
 *
 * State:
 * - isLoading
 * - currJobs
 *
 */
function JobsPage() {
  const [currJobs, setCurrJobs] = useState({ jobs: [], isLoading: true });

  /** Makes call to API to get list of all jobs, or some jobs based on search*/

  async function searchJobs(data) {
    const searchResults = await JoblyApi.getJobs(data);

    setCurrJobs(({ jobs: searchResults, isLoading: false }));
  }

  /**Renders list of all jobs after initial page load */
  useEffect(function getInitialCompanies() {
    searchJobs();
  }, []);

  return (
    <div>
      <h1>Currently Available Jobs</h1>
      <SearchBar searchFunc={searchJobs} />
      <div className="mt-2 row">
        <div className="col-3"></div>
        <div className="col-6">
          {!currJobs.isLoading
            ? currJobs.jobs.map(job =>
              <JobPanel key={job.id} job={job} />)
            : <Loading />}
        </div>
        <div className="col-3"></div>
      </div>
    </div>);
}

export default JobsPage;