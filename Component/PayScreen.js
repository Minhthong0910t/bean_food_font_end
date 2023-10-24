import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions,TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';



const screenWidth = Dimensions.get('window').width;

const ProductItem = ({ product, quantity, onUpdateQuantity }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={product.image} style={styles.productImage} />
      <View style={styles.doc}>
      <Text style={styles.productName}>{product.name}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => onUpdateQuantity(quantity - 1)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity onPress={() => onUpdateQuantity(quantity + 1)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
      </View>
      
      <Text style={styles.productPrice}>{product.price}đ</Text>
      <TouchableOpacity style={styles.removeButton}>
        <Text>x</Text>
      </TouchableOpacity>
    </View>
  );
};

const PayScreen = ({ route, navigation }) => {
  const { product } = route.params;
  
  // Sử dụng trạng thái cho quantity và totalPrice
  const [quantity, setQuantity] = useState(route.params.quantity);
  const [totalPrice, setTotalPrice] = useState(route.params.totalPrice);
  const [text, setText] = useState('');
  const deliveryFee = 15000;
  const discount = 0;
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' hoặc 'bank'


  const ordertotalPrice = totalPrice + deliveryFee - discount;

  const goBack = () => {
    navigation.goBack();
  };

  const handleUpdateQuantity = (newQuantity) => {
    // Đảm bảo số lượng không âm
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
    }
  };

  // Sử dụng hook useEffect để cập nhật totalPrice mỗi khi quantity thay đổi
  useEffect(() => {
    setTotalPrice(product.price * quantity);
  }, [quantity]);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 25 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Image source={require('./../Image/left_arrow.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Thanh Toán</Text>
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.deliveryText}>Giao hàng đến:</Text>
        <Text style={styles.addressText}>D29, Phạm Văn Bạch, Cầu Giấy, Hà Nội</Text>
        <ProductItem product={product} quantity={quantity} onUpdateQuantity={handleUpdateQuantity} />
        <View style={styles.containerHD}>
          <View style={styles.row}>
            <Text style={styles.label}>Đơn mua</Text>
            <Text style={styles.value}>{totalPrice}đ</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phí giao hàng (2.3km)</Text>
            <Text style={styles.value}>{deliveryFee}đ</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Khuyến mãi</Text>
            <Text style={styles.value}>{discount}đ</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.totalLabel}>Tổng thanh toán</Text>
            <Text style={styles.totalValue}>{ordertotalPrice}đ</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'', marginVertical: 10 }}>
          <RadioButton
              value="cash"
              status={paymentMethod === 'cash' ? 'checked' : 'unchecked'}
              onPress={() => setPaymentMethod('cash')}
            />
            <Icon name="money" size={24} color="#319AB4" style={{ marginRight: 10 }} /> 
            
            <Text style={{ marginHorizontal: 5 }}>Thanh toán bằng tiền mặt</Text>
            
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <RadioButton
              value="bank"
              status={paymentMethod === 'bank' ? 'checked' : 'unchecked'}
              onPress={() => setPaymentMethod('bank')}
            />
            <Icon name="bank" size={24} color="#319AB4" style={{ marginRight: 10 }} />
            
            <Text style={{ marginHorizontal: 5 }}>Thanh toán bằng ngân hàng</Text>
            
          </View>


        <View style={styles.inputText}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Lời nhắn cho cửa hàng"
          style={styles.textInput}
          multiline={true}
          numberOfLines={4} // Bạn có thể điều chỉnh số dòng tối đa theo mong muốn
        />
    </View>
        <Button title="Đặt hàng" onPress={() => {}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0.05 * screenWidth,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0.05 * screenWidth,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  arrowIcon: {
    width: 0.06 * screenWidth,
    height: 0.06 * screenWidth,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 0.06 * screenWidth,
    flex: 1,
    textAlign: 'center',
  },
  deliveryText: {
    fontSize: 0.04 * screenWidth,
    marginVertical: 0.02 * screenWidth,
  },
  addressText: {
    fontSize: 0.045 * screenWidth,
    fontWeight: 'bold',
    marginBottom: 0.025 * screenWidth,
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 0.025 * screenWidth,
    padding: 0.025 * screenWidth,
    alignItems: 'center',
  },
  productImage: {
    width: 0.2 * screenWidth,
    height: 0.2 * screenWidth,
    marginRight: 0.04 * screenWidth,
  },
  productName: {
    fontSize: 0.04 * screenWidth,
    flex: 1,
  },
  productQuantity: {
    fontSize: 0.035 * screenWidth,
  },
  productPrice: {
    marginLeft: 5,
    fontSize: 0.04 * screenWidth,
    fontWeight: 'bold',
  },
  totalPriceText: {
    fontSize: 0.045 * screenWidth,
    fontWeight: 'bold',
    marginBottom: 0.025 * screenWidth,
  },
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
  textInput: {
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom:25 // Để đảm bảo văn bản bắt đầu từ phía trên trong Android
  },
  containerHD: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    margin:10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PayScreen;
