import React, { useState ,useReducer } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, Platform, TouchableOpacity, Alert } from 'react-native';
import { useCart } from './Component/CartContext'; // Import the useCart hook

const OrderScreen = () => {
  const { state, dispatch } = useCart(); // Get the cart state and dispatch

  const [totalPrice, setTotalPrice] = useState(0);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  // Function to calculate the total price
  const calculateTotalPrice = () => {
    let total = 0;
    state.cart.forEach((product) => {
      total += product.price * product.quantity;
    });
    setTotalPrice(total);
  };

  const checkout = () => {
    // Navigate to the payment screen
  };

  const deleteProduct = (product) => {
    Alert.alert(
      'Delete Product',
      'Do you want to remove this item from the cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            dispatch({ type: 'REMOVE_FROM_CART', payload: product });
            calculateTotalPrice();
            forceUpdate(); // Manually trigger a re-render
          },
        },
      ]
    );
  };
  

  const incrementQuantity = (product) => {
    product.quantity += 1;
    dispatch({ type: 'UPDATE_CART', payload: product });
    calculateTotalPrice();
  };

  const decrementQuantity = (product) => {
    if (product.quantity > 1) {
      product.quantity -= 1;
      dispatch({ type: 'UPDATE_CART', payload: product });
      calculateTotalPrice();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./Image/logo_bean.png')} style={styles.logo} />
        <Text style={styles.title}>Order Food</Text>
      </View>

      <Text style={styles.sectionTitle}>Selected Products:</Text>
      <ScrollView>
        {state.cart.map((product, index) => (
          <View key={index} style={styles.productContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price} VND</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => decrementQuantity(product)}>
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{product.quantity}</Text>
              <TouchableOpacity onPress={() => incrementQuantity(product)}>
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.deleteButtonContainer}>
              <TouchableOpacity onPress={() => deleteProduct(product)}>
                <Image source={require('./Image/delete-icon.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomRow}>
        <Text style={styles.totalPrice}>Total: {totalPrice} VND</Text>
        <TouchableOpacity style={[styles.button, styles.bottomButton]} onPress={checkout}>
          <Text style={styles.buttonText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 70,
    height: 50,
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 16,
  },
  productContainer: {
    margin: 15,
    flexDirection: 'row',
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#616161',
  },
  productPrice: {
    color: '#319AB4',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    padding: 10,
    fontWeight: 'bold',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#319AB4',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  bottomButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    paddingHorizontal: 8,
  },
  deleteButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default OrderScreen;
