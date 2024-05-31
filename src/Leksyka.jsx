import React, { useState } from 'react';

import Corpus from "./Corpus";
import Lexicon from "./Lexicon";

import { remove, uniqWith } from "lodash";

import './index.css';

const Leksyka = () => {
  const [copiedEntries, setCopiedEntries] = useState([]);

  const handleCopyEntry = (entry) => {
    // _.uniqWith returns a new array so we can use it directly
    setCopiedEntries(uniqWith(copiedEntries.concat([entry]), (a, b) => a.lc === b.lc));
  };

  const handleRemoveEntry = (entry) => {
    console.log('removing', entry);
    // _.remove mutates the array and returns the removed items, so we throw away the return value
    remove(copiedEntries, (cand) => cand.lc === entry.lc);
    setCopiedEntries([...copiedEntries]);
  };

  return (
    <div className="flex">
        <Corpus onCopyEntry={handleCopyEntry} />
        <Lexicon entries={copiedEntries} onRemoveEntry={handleRemoveEntry} />
    </div>
  );
};

export default Leksyka;