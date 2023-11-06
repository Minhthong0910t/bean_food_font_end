// ProductItemOrder.js

import React,{ useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductItemOder = ({ products, quantity, onUpdateQuantity }) => {
  useEffect(() => {
    console.log('=======> item',products);
  }, [products]);
  return (
    <View style={styles.itemContainer}>
      {/* <Image source={product.image} style={styles.productImage} /> */}
      <View style={styles.doc}>
      <Text style={styles.productName}>{products.nameproduct}</Text>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>{products.quantityproduct}</Text>
      </View>
      </View>
      
      <Text style={styles.productPrice}>{products.price}đ</Text>
      <TouchableOpacity style={styles.removeButton}>
        <Text>x</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    
      doc: {
        flexDirection: 'column',
        margin: 10
      },
      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
      },
      productImage: {
        width: 60,
        height: 60,
        marginRight: 10,
      },
      productName: {
        flex: 2,
        fontSize: 16,
      },
      quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
      },
      quantityButton: {
        fontSize: 20,
        width: 24,
        height: 24,
        textAlign: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
      },
      quantityText: {
        fontSize: 16,
        width: 24,
        textAlign: 'center',
        marginHorizontal: 10,
      },
      productPrice: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
      },
      removeButton: {
        padding: 10,
      },


     
});

export default ProductItemOder;
