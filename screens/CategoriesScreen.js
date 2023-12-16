import CategoryGridTile from '../components/CategoryGridTile';
import { CATEGORIES } from '../data/dummy-data';
import { FlatList } from 'react-native';


function CategoriesScreen({navigation}){

  function renderCategoryItem(itemData){

    function onPressHandler(){
      // Navigate
      //console.log("PRESSED 1")
      navigation.navigate("MealsOverview", {
        categoryId: itemData.item.id,
      }); //Pass the name of the target screen here 
    }
  
    return (
      <CategoryGridTile title={itemData.item.title} 
      color={itemData.item.color}
      onPress={onPressHandler}
      />
    )
  }

  return (
    <FlatList 
    data={CATEGORIES} 
    keyExtractor={(item) => item.id} 
    renderItem={renderCategoryItem}
    numColumns={2}
    >
      
    </FlatList>
  )
}

export default CategoriesScreen;