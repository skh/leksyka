import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

import './index.css';

const Corpus = ({ onCopyEntry }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [useRegex, setUseRegex] = useState(false);

  useEffect(() => {
    // Fetch the CSV file
    axios.get('/data.csv')
      .then(response => {
        // Parse the CSV file content
        Papa.parse(response.data, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setData(result.data);
            setFilteredData(result.data); // Initialize filtered data
          },
          error: (error) => {
            setError(error.message);
          }
        });
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    // Filter data based on the filter input
    if (filter === '') {
      setFilteredData(data);
    } else {
      if (useRegex) {
        try {
          const regex = new RegExp(filter, 'i'); // Create a case-insensitive regex
          const filtered = data.filter(row =>
            Object.values(row).some(value =>
              regex.test(String(value))
            )
          );
          setFilteredData(filtered);
        } catch (e) {
          setFilteredData([]); // If regex is invalid, clear the filtered data
        }
      } else {
        const lowercasedFilter = filter.toLowerCase();
        const filtered = data.filter(row =>
          Object.values(row).some(value =>
            String(value).toLowerCase().includes(lowercasedFilter)
          )
        );
        setFilteredData(filtered);
      }
    }
  }, [filter, data, useRegex]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const handleCopyEntry = (entry) => {
    onCopyEntry(entry);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4 w-2/5">
      <h1 className="text-2xl font-bold mb-4">CSV Data</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Filter data"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded w-72 mb-2"
        />
        <div className="flex items-center">
          <input
            id="regex"
            type="checkbox"
            checked={useRegex}
            onChange={(e) => setUseRegex(e.target.checked)}
            className="ml-2 mr-2"
          />
          <label htmlFor="regex">Use Regex</label>
        </div>
      </div>
      <div className="overflow-y-auto w-full max-h-96">
      {filteredData.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full bg-white shadow-md rounded overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              {Object.keys(filteredData[0]).map((key) => (
                <th key={key} className="py-2 px-4 text-left">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
              {Object.values(row).map((value, i) => (
                <td key={i} className="py-2 px-4">{value}</td>
              ))}
              <td className="py-2 px-4">
                <button
                  onClick={() => handleCopyEntry(row)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  +
                </button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
    </div>
  );
};

export default Corpus;