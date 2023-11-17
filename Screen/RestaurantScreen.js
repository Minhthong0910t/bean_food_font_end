import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderRestaurant from "../Item/itemrestauran/HeaderRestaurant";
import CoffeeShopScreen from "../Item/itemrestauran/HeaderRestaurant";
import DiscountItem from "../Item/itemrestauran/DiscountItem";
import MenuRestaurant from "../Item/itemrestauran/MenuRestaurant";

import KhuyenmaiRestaurant from "../Item/itemrestauran/KhuyenmaiRestaurant";
import { URL } from "../const/const";
const { width, height } = Dimensions.get("window");
const RestaurantScreen = ({ navigation , route  }) => {

  const [datarestaurnat , setdatarestaurant] = useState([])
  const {restaurant} = route.params;



  useEffect(()=>{

    
    const fetchData = async()=>{
      const response = await fetch(`${URL}api/restaurant/${restaurant}`)

      const jsondata = await response.json();
  
        setdatarestaurant(jsondata.data[0])
    }
    fetchData()
    console.log("restaurnat id" , restaurant);
  } , [])


useEffect(()=>{

},[])
  return (
    <View style={styles.container}>
      {/* <HeaderRestaurant/> */}
      <ScrollView>

  
        <CoffeeShopScreen  navigation = {navigation} data = {datarestaurnat}/>
        {/* <DiscountItem  navigation = {navigation} /> */}
        <KhuyenmaiRestaurant  navigation = {navigation} />
        <MenuRestaurant  navigation = {navigation} data = {restaurant} />
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
