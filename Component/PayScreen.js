
import React from 'react';
import { View, Text, Image, Button, StyleSheet,TouchableOpacity,SafeAreaView } from 'react-native';

const PayScreen = ({ route, navigation }) => {
  const { product, quantity, totalPrice } = route.params;
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 25 }}>
    <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('./../Image/left_arrow.png')} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', flex: 1, fontSize: 24 }}>Thanh Toán Đơn Hàng</Text>
          <View style={styles.topRow}>
          <TouchableOpacity style={[ styles.menuButton]}>
            <Image source={require('./../Image/menu-icon.png')} style={styles.icon} />

          </TouchableOpacity>

          </View>
        </View>
    <View style={styles.container}>
    
      {/* <Image source={product.image} style={styles.image} /> */}
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productQuantity}>Số lượng: {quantity}</Text>
      <Text style={styles.productTotalPrice}>Tổng giá: {totalPrice} VND</Text>
      <Button title="Xác nhận thanh toán" />
    </View>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productQuantity: {
    fontSize: 16,
  },
  productTotalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  menuButton: {
    padding: 10,
    borderRadius: 100,
    
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 8
  },
});

export default PayScreen;
