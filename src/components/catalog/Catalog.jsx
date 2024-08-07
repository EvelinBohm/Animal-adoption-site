import "./Catalog.css";
import React, { useEffect,useContext } from "react";
import Navigation from "../common/navigation/Navigation";
import List from "../common/list/List";
import { useQuery } from "@tanstack/react-query";
import fetchAnimalList from "../../api/pet/fetchAnimalList";
import fetchSearchResult from "../../api/search/fetchSearch";
import SearchInputContext from "../../context/SearchInputContext";

function Catalog() {
  const { searchInput, _ }=useContext(SearchInputContext);

  const {
    data: animalData,
    isLoading: isAnimalLoading,
    isError: isAnimalError,
  } = useQuery(["animals"], fetchAnimalList);

 
  const {
    data: searchResults,
    refetch,
    isFetching,
  } = useQuery(["search", searchInput], () => fetchSearchResult({ queryKey: ["search", searchInput] }), {
    enabled: false,
  });

  useEffect(() => {
    if (searchInput) {
      refetch();
    }
  }, [searchInput, refetch]);

  let animals = animalData?.pets;

  if (searchInput && !isFetching && searchResults) {
    animals = searchResults;
  }

  if (isAnimalLoading || (searchInput && isFetching)) {
    return <div>Loading...</div>;
  }

  if (isAnimalError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <Navigation />
      <div className="container">
        <List title="Animals for adoption" list={animals}></List>
      </div>
    </div>
  );
}

export default Catalog;
