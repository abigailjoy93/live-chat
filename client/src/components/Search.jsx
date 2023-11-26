import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_USERS } from "../utils/queries";
import "../pages/Home/Home.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchUsers, { loading, data }] = useLazyQuery(SEARCH_USERS);

  const handleSearch = () => {
    searchUsers({ variables: { query } });
  };

  return (
    <div className="searchbox">
      <input
        className="searchtext form-control"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="searchbutton btn btn-primary"
        onClick={handleSearch}
        disabled={loading}
      >
        Search
      </button>

      {loading && <p>Loading...</p>}

      {data && data.searchUsers && (
        <ul>
          {data.searchUsers.map((user) => (
            <li key={user._id}>
              <div className="user-details">
                <h3 className="username-result">{user.name}</h3>
                <p className="email-result">{user.email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
