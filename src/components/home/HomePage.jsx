import "./HomePage.css";
import React, { useContext } from "react";
import Navigation from "../common/navigation/Navigation";
import { GiDogBowl } from "react-icons/gi";
import { PiCatLight } from "react-icons/pi";
import { IoMdPaw } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import SearchInputContext from "../../context/SearchInputContext";

function HomePage() {
  const navigate = useNavigate();
  const { _, setSearchInput } = useContext(SearchInputContext);

  const onFilterClicked = (filterType) => {
    setSearchInput(filterType);
    navigate("/catalog");
  };

  function onTyping(input) {
    setSearchInput(input);
    navigate("/catalog");
  }

  return (
    <div className="homePage-container">
      <Navigation></Navigation>
      <div className="homePage-background-image">
        <div className="homePage-content-container">
          <h1 className="homePage-title">Find your new best friend</h1>
          <h2 className="homePage-subtext">
            Seach pets from different shelters from your area{" "}
          </h2>
          <input
            type="text"
            placeholder=" Search Husky, dog, etc."
            className="homePage-searchbar"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                {
                  onTyping(event.target.value);
                }
              }
            }}
          />
          <div className="homePage-card-direction">
            <div
              className="homePage-card"
              role="button"
              tabIndex="0"
              onClick={() => onFilterClicked("dog")}
              onKeyDown={(e) => console.log(e, "dog")}
            >
              <GiDogBowl className="icon" />
              <h3>Dog</h3>
            </div>
            <div
              className="homePage-card"
              role="button"
              tabIndex="0"
              onClick={() => onFilterClicked("cat")}
              onKeyDown={(e) => console.log(e, "cat")}
            >
              <PiCatLight className="icon" />
              <h3>Cat</h3>
            </div>
            <div
              className="homePage-card"
              role="button"
              tabIndex="0"
              onClick={() => onFilterClicked("other")}
              onKeyDown={(e) => console.log(e, "other")}
            >
              <IoMdPaw className="icon" />
              <h3>Other animals</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
