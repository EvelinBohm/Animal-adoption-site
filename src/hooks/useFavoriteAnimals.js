import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addFavoriteAnimal,
  deleteFavoriteAnimal,
} from "../service/favoriteAnimalService";
import fetchFavoriteList from "../api/pet/fetchFavorites";

const useFavoriteAnimals = ({ userId }) => {
  const {
    data: favoriteAnimals,
    isError,
    isLoading,
    refetch,
  } = useQuery(["favoriteList", { userId }], fetchFavoriteList);

  const addFavoriteMutation = useMutation({
    mutationFn: (item) => addFavoriteAnimal({ userId, newAnimal: item }),
    onSuccess: () => {
      refetch();
    },
  });

  const deleteFavoriteMutation = useMutation({
    mutationFn: (item) => deleteFavoriteAnimal({ userId, animalId: item.id }),
    onSuccess: () => {
      refetch();
    },
  });

  return {
    favoriteAnimals,
    isError,
    isLoading,
    addFavoriteMutation,
    deleteFavoriteMutation,
  };
};

export default useFavoriteAnimals;
