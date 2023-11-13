import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions,TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckOrderModal from '../Modal/CheckOderModal';
import SuccessModal from '../Modal/SuccessModal';
import ProductItem from '../Item/ProductItem';
import ProductItemOder from '../Item/ProductItemOder';
import LocationModal from '../Modal/LocationModal';




const screenWidth = Dimensions.get('window').width;

const PayScreen = ({ route, navigation }) => {
  const { products } = route.params;
  const [totalproduct,settotalproduct] = useState(0)
  // Sử dụng trạng thái cho quantity và totalPrice
  const [text, setText] = useState('');
  const deliveryFee = 15000;
  const discount = 0;
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' hoặc 'bank'

  const [isCheckOrderModalVisible, setCheckOrderModalVisible] = useState(false);
  const [isCheckLocalModalVisible, setCheckLocalModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

  const handleOrderPress = () => {
    if (paymentMethod === 'bank') {
      // Chuyển đến màn hình PaymentVN
      navigation.navigate('PaymentScreen', { totalPrice: ordertotalPrice, products: products });
    } else {
      // Logic cho phương thức thanh toán tiền mặt
      setCheckOrderModalVisible(true);
    }
  };
//địa điểm
  const toggleLocationModal = () => {
    setCheckLocalModalVisible(!isCheckLocalModalVisible);
  };

  const handleOrderSuccess = () => {
    setCheckOrderModalVisible(false);
    setSuccessModalVisible(true);
  };
  const toltalproducts = () => {
     var total=0
      for (var i =0;i<products.length;i++) {
        price=parseFloat(products[i].total)
        total+=price
        console.log('giá: ',products[i].total);
      }
      console.log('====>tổng tiền: ',total);
      settotalproduct(total);
  };

  const ordertotalPrice = totalproduct + deliveryFee - discount;

  const goBack = () => {
    navigation.goBack();
  };


  // Sử dụng hook useEffect để cập nhật totalPrice mỗi khi quantity thay đổi
  useEffect(() => {
    toltalproducts()
  }, [products]);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 25 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Image source={require('./../Image/left_arrow.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Thanh Toán</Text>
      </View>
      <ScrollView style={styles.container}>
      <View style={styles.ngang}>
        <Text style={styles.deliveryText}>Giao hàng đến:</Text>
        <TouchableOpacity style={styles.buttondd} onPress={toggleLocationModal}>
          <Text>Thay đổi địa điểm</Text>
        </TouchableOpacity>
        <LocationModal 
          visible={isCheckLocalModalVisible} 
          onClose={toggleLocationModal} // Bạn cần đảm bảo rằng LocationModal có prop onClose
        />
      </View>
        <Text style={styles.addressText}>D29, Phạm Văn Bạch, Cầu Giấy, Hà Nội</Text>
        {products.map(products =><ProductItemOder products={products} />)}
        
        

        
        <View style={styles.containerHD}>
          <View style={styles.row}>
            <Text style={styles.label}>Đơn mua</Text>
            <Text style={styles.value}>{totalproduct}đ</Text>
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
      <Button title="Đặt hàng" onPress={handleOrderPress} style={styles.buttontt} />
        <CheckOrderModal 
          modalVisible={isCheckOrderModalVisible} 
          setModalVisible={setCheckOrderModalVisible} 
          onOrderSuccess={handleOrderSuccess}
        />
        <SuccessModal 
          isVisible={isSuccessModalVisible} 
          navigation={navigation}
      />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0.05 * screenWidth,

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0.05 * screenWidth,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  ngang:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
    
  },
  buttondd:{
    borderRadius: 15,
    backgroundColor: '#009966',
    padding: 10

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
  productsContainer: {
    flexDirection: 'row',
    marginBottom: 0.025 * screenWidth,
    padding: 0.025 * screenWidth,
    alignItems: 'center',
  },
  productsImage: {
    width: 0.2 * screenWidth,
    height: 0.2 * screenWidth,
    marginRight: 0.04 * screenWidth,
  },
  productsName: {
    fontSize: 0.04 * screenWidth,
    flex: 1,
  },
  productsQuantity: {
    fontSize: 0.035 * screenWidth,
  },
  productsPrice: {
    marginLeft: 5,
    fontSize: 0.04 * screenWidth,
    fontWeight: 'bold',
  },
  totalPriceText: {
    fontSize: 0.045 * screenWidth,
    fontWeight: 'bold',
    marginBottom: 0.025 * screenWidth,
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
  buttontt:{
    marginBottom:100
  }
});

export default PayScreen;
