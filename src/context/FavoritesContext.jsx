import React, { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [userFavorites, setUserFavorites] = useState([]); // always array

  const toggleFavorite = (job) => {
    if (!job?.postId) return;
    const exists = userFavorites.find(fav => fav.postId === job.postId);
    if (exists) {
      setUserFavorites(userFavorites.filter(fav => fav.postId !== job.postId));
    } else {
      setUserFavorites([...userFavorites, job]);
    }
  };

  return (
    <FavoritesContext.Provider value={{ userFavorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
