import { createRoot } from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Leksyka from "./Leksyka";
import Lists from "./Lists";

const App = () => {
  return (
    // replace <SearchParams /> and <h1>Adopt Me!</h1>
    <BrowserRouter>
      <Routes>
        <Route path="/lists" element={<Lists />} />
        <Route path="/" element={<Leksyka />} />
      </Routes>
    </BrowserRouter>
  );
};




const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);