import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logo from "../logo.png";

function Navbar({ setWord }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(saved);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchWord.trim()) return;

    setWord(searchWord);
    navigate("/");

    const updatedHistory = [
      searchWord,
      ...history.filter((w) => w !== searchWord),
    ].slice(0, 5);

    setHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    setSuggestions([]);
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchWord(value);

    if (value.length < 2) {
      setSuggestions(history);
      return;
    }

    try {
      const res = await fetch(`https://api.datamuse.com/sug?s=${value}`);
      const data = await res.json();
      setSuggestions(data.map((item) => item.word).slice(0, 5));
    } catch {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (word) => {
    setSearchWord(word);

    if (!word.trim()) return;

    setWord(word);
    navigate("/");

    const updatedHistory = [word, ...history.filter((w) => w !== word)].slice(
      0,
      5,
    );

    setHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

    setSuggestions([]);
  };

  const deleteHistory = (word, e) => {
    e.stopPropagation();

    const updated = history.filter((item) => item !== word);
    setHistory(updated);
    localStorage.setItem("searchHistory", JSON.stringify(updated));

    setSuggestions(updated);
  };

  return (
    <>
      <style>{`
  body{
    margin:0;
  }

  .navbar {
    width: 100%;
    background: #222;
    color: white;
    padding: 10px 20px;
    box-sizing: border-box;
  }

  .navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 60px;
    flex-wrap: wrap;
  }

  .logo {
    font-size: 20px;
    font-weight: bold;
  }

  .search-bar {
    flex: 1;
    display: flex;
    justify-content: right;
    position: relative;
  }

  .search-bar form {
    display: flex;
    width: 100%;
    max-width: 400px;
  }

  .search-bar input {
    flex: 1;
    padding: 8px;
    border: none;
    outline: none;
    border-radius: 4px 0 0 4px;
  }

 .search-bar button {
  padding: 8px 15px;
  border: none;
  background: #4CAF50;
  color: white;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}

.search-bar button:hover {
  box-shadow: 0 3px 8px rgba(0,0,0,0.25);
}

.search-bar button.pressed {
  transform: scale(0.9);
  box-shadow: 0 2px 4px rgba(0,0,0,0.25);
}

  .suggestions {
    position: absolute;
    top: 38px;
    background: white;
    color: black;
    width: 100%;
    max-width: 400px;
    border-radius: 4px;
    overflow: hidden;
    z-index: 10;
  }

  .suggestion-item {
    padding: 8px;
    cursor: pointer;
    display:flex;
    justify-content:space-between;
    align-items:center;
  }

  .suggestion-item:hover {
    background: #eee;
  }

  .delete-history {
    color: #888;
    font-size: 14px;
    margin-left: 10px;
    cursor: pointer;
  }

  .delete-history:hover {
    color: red;
  }

  .nav-links {
    display: flex;
    gap: 60px;
  }

  .nav-links a {
    color: white;
    text-decoration: none;
  }

  .menu-toggle {
    display: none;
    font-size: 22px;
    cursor: pointer;
  }

   .logo{
      display:flex;
      align-items:center;
      gap:8px;
      font-size:20px;
      font-weight:bold;
    }

    .logo-img{
      height:32px;
      width:auto;
    }

 @media (max-width: 768px) {

  .navbar{
    padding:10px 12px;
  }

  .navbar-container{
    flex-wrap:wrap;
    gap:10px;
  }

  .menu-toggle{
    display:block;
    margin-left:auto;
  }

  .nav-links {
  order: 2;
  display: flex;
  gap: 0;
  flex-direction: column;
  width: 100%;
  background: #3a3939;
  border-radius: 8px;
  overflow: hidden;

  max-height: 0;
  opacity: 0;
  transform: translateY(-10px) scale(0.98);

  transition: 
    max-height 0.4s ease,
    opacity 0.3s ease,
    transform 0.5s ease;
}
  .nav-links.active {
  max-height: 500px;
  opacity: 1;
  transform: translateY(0) scale(1);
}

 .nav-links a {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.08);

  opacity: 0;
  transform: translateY(-8px);
  transition: all 0.5s ease;
}

.nav-links.active a {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger effect */
.nav-links.active a:nth-child(1) { transition-delay: 0.05s; }
.nav-links.active a:nth-child(2) { transition-delay: 0.1s; }
.nav-links.active a:nth-child(3) { transition-delay: 0.15s; }
.nav-links.active a:nth-child(4) { transition-delay: 0.2s; }
.nav-links.active a:nth-child(5) { transition-delay: 0.25s; }
  
.search-bar{
    order:3;
    width:100%;
    margin-top:10px;
    justify-content:center;
  }

  .search-bar form{
    max-width:100%;
  }

}
   
    
   

`}</style>

      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <img src={logo} alt="logo" className="logo-img" />
            MyDictionary
          </div>

          <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>

          <div className="search-bar">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search word..."
                value={searchWord}
                onChange={handleChange}
              />
              <button
                type="submit"
                className={pressed ? "pressed" : ""}
                onTouchStart={() => setPressed(true)}
                onTouchEnd={() => setPressed(false)}
                onMouseDown={() => setPressed(true)}
                onMouseUp={() => setPressed(false)}
              >
                Search
              </button>
            </form>

            {suggestions.length > 0 && (
              <div className="suggestions">
                {suggestions.map((word, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => selectSuggestion(word)}
                  >
                    {word}

                    {history.includes(word) && (
                      <span
                        className="delete-history"
                        onClick={(e) => deleteHistory(word, e)}
                      >
                        ✖
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <Link to="/">Home</Link>
            <Link to="/wordoftheday">Word of Day</Link>
            <Link to="/PopularSearches">Trending</Link>
            <Link to="/About">About</Link>
            <a
              href="https://anurag-developers.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
