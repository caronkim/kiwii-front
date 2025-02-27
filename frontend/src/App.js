import React from 'react';
import Router from "./shared/Router"
import { BrowserRouter as Route, Routes } from "react-router-dom";
import Kimantle from "./pages/Kimantle";


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/kimantle" element={<Kimantle />} />
        </Routes>
      </Router>
  );
}

export default App;
