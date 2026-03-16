import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Popular_Searches from "./components/Popular_Searches";
import "./App.css";

function App() {
  const [word, setWord] = useState("");

  return (
    <Router>
      <Navbar setWord={setWord} />

      <Routes>
        <Route path="/" element={<Home word={word} setWord={setWord} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/Popular_Searches"
          element={<Popular_Searches setWord={setWord} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
