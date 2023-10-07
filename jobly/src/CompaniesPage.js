import SearchBar from "./SearchBar";
import CompanyPanel from "./CompanyPanel";
import { useState } from "react";
import JoblyApi from "./api";
import { useEffect } from "react";
import Loading from "./Loading";

/**
 * CompaniesPage: Renders list of all companies
 *
 * State:
 * - isLoading
 * - currCompanies
 *
 */

function CompaniesPage() {
  const [currCompanies, setCurrCompanies] = useState({ companies: [], isLoading: true });


  /** gets list of all companies from API or select companies based on search */
  async function searchCompanies(data = "") {
    const searchResults = await JoblyApi.getCompanies(data);
    setCurrCompanies({ companies: searchResults, isLoading: false });

  }
  /** renders list of companies after initial page load */
  useEffect(function getInitialCompanies() {
    searchCompanies();
  }, []);

  return (
    <>
      <h1>Companies Page!</h1>
      <SearchBar searchFunc={searchCompanies} />
      {!currCompanies.isLoading
        ? currCompanies.companies.map(company =>
          <CompanyPanel key={company.handle} company={company} />)
        : <Loading />}
    </>);
}

export default CompaniesPage;;