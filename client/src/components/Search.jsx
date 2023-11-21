// import { useState } from 'react';
// import { useLazyQuery } from '@apollo/client';
// import { SEARCH_USERS } from '../utils/queries';

// const Search = () => {
//     const [query, setQuery] = useState('');
//     const [searchUsers, { loading, data }] = useLazyQuery(SEARCH_USERS);

//     const handleSearch = () => {
//       searchUsers({ variables: { query } });
//     };

//     return (
//       <div>
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <button onClick={handleSearch} disabled={loading}>
//           Search
//         </button>

//         {loading && <p>Loading...</p>}

//         {data && data.searchUsers && (
//           <ul>
//             {data.searchUsers.map((user) => (
//               <li key={user._id}>{user.username}</li>
//             ))}
//           </ul>
//         )}
//       </div>
//     );
//   };

//   export default Search;
