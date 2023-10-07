import SearchBar from "./SearchBar";
import JobPanel from "./JobPanel";
import { useState } from "react";
import JoblyApi from "./api";
import { useEffect } from "react";
import Loading from "./Loading";
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
    <>
      <h1>Jobs Page!</h1>
      <SearchBar searchFunc={searchJobs} />
      {!currJobs.isLoading
        ? currJobs.jobs.map(job =>
          <JobPanel key={job.id} job={job} />)
        : <Loading />}
    </>);
}

export default JobsPage;