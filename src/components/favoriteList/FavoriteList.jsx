import "./FavoriteList.css";
import React from "react";
import Navigation from "../common/navigation/Navigation";

import { useQuery } from "@tanstack/react-query";
import fetchFavoriteList from "../../api/pet/fetchFavorites";
import List from "../common/list/List";
import { UserContext } from "../../context/auth/UserContext";
import { useContext } from "react";

function FavoriteList() {
  const { currentUser } = useContext(UserContext);

  const userId = currentUser.userId;
  
  const { data, isLoading, isError } = useQuery(
    ["favoriteList", { userId }],
    fetchFavoriteList
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }
  
  return (
    <div>
      <Navigation />
      <div className="container">
        <List title="Animals for adoption" list={data}></List>
      </div>
    </div>
  );
}

export default FavoriteList;
