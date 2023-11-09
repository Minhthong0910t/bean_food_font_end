import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import React, { useEffect } from "react";
import HeaderRestaurant from "../Item/itemrestauran/HeaderRestaurant";
import CoffeeShopScreen from "../Item/itemrestauran/HeaderRestaurant";
import DiscountItem from "../Item/itemrestauran/DiscountItem";
import MenuRestaurant from "../Item/itemrestauran/MenuRestaurant";
import NoibatRestaurant from "../Item/itemrestauran/NoibatRestaurant";
import KhuyenmaiRestaurant from "../Item/itemrestauran/KhuyenmaiRestaurant";

const { width, height } = Dimensions.get("window");
const RestaurantScreen = ({ navigation , route  }) => {
  const {restaurant} = route.params;


useEffect(()=>{

},[])
  return (
    <View style={styles.container}>
      {/* <HeaderRestaurant/> */}
      <ScrollView>
        <CoffeeShopScreen  navigation = {navigation} datarestaurant = {restaurant}/>
        <DiscountItem  navigation = {navigation} />
        <NoibatRestaurant  navigation = {navigation} />
        <KhuyenmaiRestaurant  navigation = {navigation} />
        <MenuRestaurant  navigation = {navigation}/>
      </ScrollView>
    </View>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: width * 0.12,
  },
});
