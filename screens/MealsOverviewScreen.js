import { useLayoutEffect } from "react";
import { MEALS, CATEGORIES } from "../data/dummy-data";
import { View, FlatList, StyleSheet } from "react-native";
import MealsList from "../components/MealsList/MealsList";

function MealsOverviewScreen({route, navigation}){ 
  // gets the navigation prop bc its registered as a screen in app
  // also gets the route prop for the same reason as navigation
    // route prop has params prop which is where the object you passed to
    // to the screen is held
  const catId = route.params.categoryId;

  const displayMeals = MEALS.filter( (mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });
  
  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
      ).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }), [catId, navigation]

  return <MealsList items={displayMeals}/>
  

}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})