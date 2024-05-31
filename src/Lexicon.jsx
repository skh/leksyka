import React from 'react';

const Lexicon = ({ entries, onRemoveEntry }) => {

  const handleRemoveEntry = (entry) => {
    onRemoveEntry(entry);
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mt-4 w-3/5 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lexicon</h1>
      {entries.length === 0 ? (
        <p>No entries copied yet.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              {Object.keys(entries[0]).map((key) => (
                <th key={key} className="py-2 px-4 text-left">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.map((row, index) => (
              <tr key={index} className="border-b">
                {Object.values(row).map((value, i) => (
                  <td key={i} className="py-2 px-4">{value}</td>
                ))}
                <td><button
                  onClick={() => handleRemoveEntry(row)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  -
                </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Lexicon;