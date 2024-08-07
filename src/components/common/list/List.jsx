import React from "react";
import "./List.css";
import { useState, useContext } from "react";
import { UserContext } from "../../../context/auth/UserContext";
import Paginator from "../paginator/Paginator";
import ListItem from "../list-item/ListItem";
import useFavoriteAnimals from "../../../hooks/useFavoriteAnimals";

const List = ({ title, list }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { currentUser } = useContext(UserContext);

  const userId = currentUser.userId;
  const {
    favoriteAnimals,
    isError,
    isLoading,
    addFavoriteMutation,
    deleteFavoriteMutation,
  } = useFavoriteAnimals({userId});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <p>Something went wrong</p>;
  }

  if (!list || list.length === 0) {
    return <p>No items available</p>;
  }

  const itemsPerPage = 8;
  const totalPages = Math.ceil(list.length / itemsPerPage);

  const currentItemStartIndex = (currentPage - 1) * itemsPerPage;
  const currentItemEndIndex = currentPage * itemsPerPage - 1;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageItems = [];
  list.map((elem, index) => {
    if (index >= currentItemStartIndex && index <= currentItemEndIndex) {
      pageItems.push(elem);
    }
  });

  const isFavorite = (itemId) => {
    return favoriteAnimals.some((animal) => animal.id === itemId);
  };
  return (
    <div className="list-container">
      <h1 className="list-header">{title}</h1>
      <ul className="list-card-list">
        {pageItems.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            deleteFavorite={deleteFavoriteMutation}
            addFavorite={addFavoriteMutation}
            isFavorite={isFavorite}
          ></ListItem>
        ))}
      </ul>
      <Paginator
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      ></Paginator>
    </div>
  );
};

export default List;
