import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import {MEALS} from '../data/dummy-data'
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import { useLayoutEffect, useContext } from "react";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/context/favorites-context";



function MealDetailsScreen({route, navigation}){

  const favoriteMealsCtx = useContext(FavoritesContext);

  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId)

  const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId); // Returns true if mealId is part of the ids array

  function changeFavoriteStatusHandler(){
    if(mealIsFavorite){
      favoriteMealsCtx.removeFavorite(mealId);
    } else {
      favoriteMealsCtx.addFavorite(mealId);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <IconButton 
          icon={mealIsFavorite ? 'star' : 'star-outline'}
          onPress={changeFavoriteStatusHandler}
          color="white"
          />
      }
    })
  }, [navigation, changeFavoriteStatusHandler]);


  return(
    <ScrollView style={styles.rootContainer}>
      <Image style = {styles.image} source = {{uri: selectedMeal.imageUrl}}/>
      <Text style = {styles.title}>{selectedMeal.title}</Text>
      <View>
        <MealDetails
         duration={selectedMeal.duration}
         complexity={selectedMeal.complexity}
         affordability={selectedMeal.affordability}
         textStyle={styles.detailText}
         />
      </View>

      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingrediants</Subtitle>
          <List data={selectedMeal.ingredients}/>
            
          <Subtitle children={"Steps"}/>
          <List data={selectedMeal.steps}/>
        </View>
      </View>



    </ScrollView>
   
  )

}

export default MealDetailsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },
  detailText: {
    color: 'white',
  },
  listContainer: {
    width: '80%',
  },
  listOuterContainer: {
    alignItems: 'center',
  }

})