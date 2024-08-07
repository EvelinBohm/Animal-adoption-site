import "./Navigation.css";
import React, { useContext } from "react";
import { TbDog } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchInputContext from "../../../context/SearchInputContext";

function Navigation() {
  const { _, setSearchInput } = useContext(SearchInputContext);
  const location=useLocation();
  const navigate = useNavigate();

  function onTyping(input) {
    setSearchInput(input);
    navigate("/catalog");
  }
  function resetSearchInput() {
    setSearchInput("");
  }

  return (
    <nav className="navbar">
      <ul className="navMenu">
        <Link to="/home" className="navItem" onClick={() => resetSearchInput()}>
          Home
        </Link>
        <Link
          to="/catalog"
          className="navItem"
          onClick={() => resetSearchInput()}
        >
          Catalog
        </Link>
        <Link
          to="/favorites"
          className="navItem"
          onClick={() => resetSearchInput()}
        >
          Your Favorites
        </Link>
        <Link className="navItem" onClick={() => resetSearchInput()}>
          Contact
        </Link>
      </ul>
      <div className="search-container">
        <input
          type="text"
          placeholder=" Search Husky, dog, etc."
          className={`search-input ${location.pathname==='/home' ? 'search-input-hidden':'search-input-visible'}`}
          
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              {
                onTyping(event.target.value);
              }
            }
          }}
        />
      </div>
      <Link to="/" className="logo">
        ADOPT ME! <TbDog className="logoIcon" />
      </Link>
    </nav>
  );
}

export default Navigation;
