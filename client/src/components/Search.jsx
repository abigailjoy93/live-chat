import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_USERS } from "../utils/queries";
import "../pages/Home/Home.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchUsers, { loading, data }] = useLazyQuery(SEARCH_USERS);

  const handleSearch = () => {
    if (query.trim() !== "") {
      searchUsers({ variables: { query } });
    }
  };

  const cancelSearch = () => {
    window.location.reload();
  };

  return (
    <div className="searchbox">
      <div className="search-display">
        <input
          className="searchtext form-control"
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="nav-btn" onClick={handleSearch} disabled={loading}>
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}

      {data && data.searchUsers && (
        <div className="row">
          <button className="col nav-btn" onClick={cancelSearch}>Cancel</button>
          <ul className=" col result-list">
            {data.searchUsers.map((user) => (
              <li key={user._id}>
                <div className="user-details">
                  <h5 className="result username-result">{user.username}</h5>
                  <p className="result email-result">{user.email}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
