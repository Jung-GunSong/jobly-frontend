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
    <div>
      <form onSubmit={handleClick}>
        <input onChange={handleChange}
          name="search"
          value={searchTerm}>
        </input>
        <button className="btn btn-primary" >Submit</button>
      </form>
    </div>

  );
}

export default SearchBar;