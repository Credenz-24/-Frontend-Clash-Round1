// import React from 'react';
// import { useState, useEffect } from 'react';
// import DataTable from 'react-data-table-component';
// import { axios } from 'axios';
// // import { rows } from './data';
// // import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
// // import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
// // import KeyboardDoubleArrowRightTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowRightTwoTone';
// // import KeyboardDoubleArrowLeftTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowLeftTwoTone';
// import './Leaderboard.css'

// export default function Leaderboard() {
//     const columns = [
//         {
//             name: "Rank",
//             selector: (row) => row.id,
//             sortable: true
//         },
//         {
//             name: "User",
//             selector: (row) => row.user,
//             sortable: true
//         },
//         {
//             name: "Attempted Questions",
//             selector: (row) => row.attQues,
//             sortable: true
//         },
//         {
//             name: "Marks",
//             selector: (row) => row.marks,
//             sortable: true
//         },
//     ];

//     const [data, setData] = useState([]);
//     const [search, setSearch] = useState('');
//     const [filter, setFilter] = useState([]);

//     useEffect(() => {
//         // Directly setting custom data to state
//         axios.get('http://localhost:8000/api/leaderboard' ,{ headers: {"Authorization":localStorage.getItem('jwt')}})


//     }, []);

//     useEffect(() => {
//         const result = data.filter((item) => {
//             return item.user.toLowerCase().match(search.toLowerCase());
//         });
//         setFilter(result);
//     }, [search, data]);

//     const defaultRowsPerPage = 5; // Default number of rows per page
//     const rowsPerPageOptions = [5, 10, 15, 20];

//     return (
//         <React.Fragment>
//             <div className="max-w-full mx-auto border-4 border-cyan-500 rounded-lg">
//                 <h1 className="dataTable-header text-center text-black">Leaderboard</h1>
//                 <DataTable
//                     className="bg-gray-200" // Set the background color here
//                     columns={columns}
//                     data={filter}
//                     pagination
//                     paginationPerPage={defaultRowsPerPage} // Set the default rows per page
//                     paginationRowsPerPageOptions={rowsPerPageOptions}
//                     paginationIconNext={<ArrowCircleRightIcon />}
//                     paginationIconPrevious={<ArrowCircleLeftIcon />}
//                     paginationIconLastPage={<KeyboardDoubleArrowRightTwoToneIcon />}
//                     paginationIconFirstPage={<KeyboardDoubleArrowLeftTwoToneIcon />}
//                     fixedHeader
//                     selectableRowsHighlight
//                     highlightOnHover
//                     subHeader
//                     subHeaderComponent={
//                         <input
//                             type="text"
//                             className="form-control w-1/4 p-2 border border-gray-300 rounded"
//                             placeholder="Search..."
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                         />
//                     }
//                     subHeaderAlign="right"
//                 />
//             </div>
//         </React.Fragment>
//     );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Leaderboard() {
    // Step 1: Initialize state
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        // Step 2: Make the Axios request
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/leaderboard', {
                    headers: {"Authorization": localStorage.getItem('jwt')}
                });
                // Step 3: Set the received data to state
                setLeaderboardData(response.data);
            } catch (error) {
                console.error("Error fetching leaderboard data:", error);
                // Handle error scenarios (e.g., showing an error message)
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once on mount

    // Step 4: Render the data
    return (
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-bold text-center text-gray-800 bg-gray-100 p-4">Leaderboard</h2>
      <ul className="divide-y divide-gray-300">
          {leaderboardData.map((entry, index) => (
              <li key={index} className="flex justify-between items-center p-4 hover:bg-gray-50">
                  <span className="font-semibold text-indigo-600">{index + 1}</span>
                  <span className="text-gray-800 font-medium">{entry.team_name}</span>
                  <span className="text-gray-500">{entry.score} pts</span>
                  <span className="text-sm text-gray-400">Q{entry.current_question - 1}</span>
              </li>
          ))}
          </ul>
      </div>
  
    );
}

export default Leaderboard;
