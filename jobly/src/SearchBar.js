import { useState } from "react";


/**
 * SearchBar:
 *
 * Renders a form that enables a filtered search upon submission
 *
 * State:
 * - formData: "Anderson"
 *
 * Props:
 * - searchFunc: sends formData to Jobs or Companies components
 *
 */
function SearchBar({ searchFunc }) {

  const [searchTerm, setSearchTerm] = useState("");

  /** handles change in user input of search bar form */
  function handleChange(evt) {
    const { value } = evt.target;
    setSearchTerm(value);
  }
  /** handles submit of user input in search bar form, sends data to Job or
   * Companies components
   */
  function handleClick(evt) {
    evt.preventDefault();
    searchFunc(searchTerm);
    setSearchTerm("");
  }

  return (
    <div className=" row">
      <div className="col"></div>
      <form onSubmit={handleClick} className="col">
        <input onChange={handleChange}
          name="search"
          value={searchTerm}
          className="form-control">
        </input>
        <button className="btn btn-primary mt-2" >Submit</button>
      </form>
      <div className="col"></div>
    </div>

  );
}

export default SearchBar;