import "./JobPanel.css";

/**
 * JobPanel:
 *
 * Renders job on jobs page or for a specific company page
 *
 * props:
 * - job: {id:...,}
 *
 */
function JobPanel({ job }) {

  return (
    <div className="job-panel">
      <h2>{job.title}</h2>
      {job.companyName && <h3>{job.companyName}</h3>}
      <p>Salary: {job.salary}</p>
      <p>Equity: {job.equity}</p>
    </div>
  );

}

export default JobPanel;