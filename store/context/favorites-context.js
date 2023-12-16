import { createContext, useState } from 'react';


export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

function FavoritesContextProvider({children}){

  // Logic for the above functions
  const [favoriteMealIds, setFavoriteMealIds] = useState([]);

  function addFavorite(id){
    setFavoriteMealIds((currentFavIds) => [...currentFavIds, id]);
  }

  function removeFavorite(id){
    setFavoriteMealIds((currentFavIds) => 
      currentFavIds.filter(mealId => mealId !== id)) // Filters out the id we got as parameter
  }

  const value = {
    ids: favoriteMealIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  }

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export default FavoritesContextProvider;