import { Link } from "react-router-dom";
import "./CompanyPanel.css";

/**
 * CompanyPanel:
 *
 * Renders clickable Company component and info about company
 * Prop:
 * - company: {handle:..., }
 */
function CompanyPanel({ company }) {
  return (

    <Link className="CompanyPanel-link" to={`/companies/${company.handle}`}>
      <div className="company-panel">
        <h4>{company.name}</h4>
        <p>{company.description}</p>
        {company.logoUrl && <img alt="company logo" src={company.logoUrl} />}
      </div>
    </Link>
  );
}

export default CompanyPanel;