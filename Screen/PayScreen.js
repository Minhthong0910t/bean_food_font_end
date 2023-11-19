import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions,TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckOrderModal from '../Modal/CheckOderModal';
import SuccessModal from '../Modal/SuccessModal';
import ProductItem from '../Item/ProductItem';
import ProductItemOder from '../Item/ProductItemOder';
import LocationModal from '../Modal/LocationModal';
import CurrentLocationMap from '../components/CurrentLocationMap';
import * as Location from 'expo-location';
import { URL } from '../const/const';
import ToolBar from '../components/ToolBar';



const screenWidth = Dimensions.get('window').width;

const PayScreen = ({ route, navigation }) => {
  const { products,dataUid } = route.params;
  const [totalproduct,settotalproduct] = useState(0);
  const [orderData, setOrderData] = useState({});

  // const [address, setAddress] = useState('D29, Phạm Văn Bạch, Cầu Giấy, Hà Nội');
  // Sử dụng trạng thái cho quantity và totalPrice
  const [text, setText] = useState('');
  const deliveryFee = 15000;
  const discount = 0;
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' hoặc 'bank'

  const [isCheckOrderModalVisible, setCheckOrderModalVisible] = useState(false);
  const [isCheckLocalModalVisible, setCheckLocalModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

//lấy vị trí hiện tại người dùng
const [address, setAddress] = useState('Đang lấy vị trí...');

useEffect(() => {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setAddress('Quyền truy cập vị trí bị từ chối.');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
    if (reverseGeocode.length > 0) {
      let addr = reverseGeocode[0];
      let fullAddress = `${addr.name || ''} ${addr.street || ''}, ${addr.city || ''}, ${addr.region || ''}, ${addr.country || ''}`;
      setAddress(fullAddress.replace(/, ,/g, ',').replace(/,,/g, ',').trim()); 
    }
  })();
}, []);


  const createOrderData = () => {
    let totalPrice = 0;
    products.forEach(product => {
      totalPrice += product.price * product.quantity;
    });
  
    const orderData = {
      userId: dataUid, // Giả sử 'data' là userId của người dùng hiện tại
      address: address, // Địa chỉ giao hàng
      toltalprice: totalPrice + deliveryFee - discount, // Tính tổng tiền đơn hàng
      phuongthucthanhtoan: paymentMethod, // Phương thức thanh toán
      status: 0, // Trạng thái đơn hàng
      notes: text, // Ghi chú cho đơn hàng
      // Thêm thông tin sản phẩm nếu cần
      time: new Date(),
      products: products.map(product => ({
      productId: product._id, // Giả sử mỗi sản phẩm có trường 'id'
      name: product.name, // Tên sản phẩm
      quantity: product.quantity, // Số lượng
      price: product.price // Giá sản phẩm
      })),
      
    };
  
    return orderData;
  };


  // Đơn hàng

const sendOrderToServer = async (orderData) => {
  try {
    const response = await fetch(URL + 'api/history/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.msg || 'Có lỗi xảy ra khi gửi đơn hàng.');
    }

    console.log('Đơn hàng đã được tạo:', responseData);
    setTimeout(() => {
      setSuccessModalVisible(true);
    }, 1500);
  } catch (error) {
    console.error('Error:', error);
  }
};

  
  // Và sau đó sử dụng trong hàm handleOrderPress
  const handleOrderPress = () => {
    const newOrderData = createOrderData();
    setOrderData(newOrderData);
  
    if (paymentMethod === 'bank') {
      navigation.navigate('PaymentScreen', { orderData: newOrderData });
    } else {
      setCheckOrderModalVisible(true);
    }
  };
  


//địa điểm
  const toggleLocationModal = () => {
    setCheckLocalModalVisible(!isCheckLocalModalVisible);
  };


  const toltalproducts = () => {
     var total=0
      for (var i =0;i<products.length;i++) {
        price=parseFloat(products[i].quantity*products[i].price)
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
    console.log("products: ",products);
    console.log("products user: ",dataUid);
  }, [products]);

  useEffect(() => {
    console.log("new orders", orderData);
  }, [orderData]);

  return (
    <SafeAreaView style={{flex:1 }}>
      <ToolBar
        title="Thanh Toán Đơn Hàng" 
        onBackPress={() => navigation.goBack()} 
      />


      <View style={styles.container}>
      <ScrollView >
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
        <Text style={styles.addressText}>{address}</Text>
        <View >
          <CurrentLocationMap/>
        </View>
   
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
             <Text style={{ marginHorizontal: 5 }}>Thanh toán bằng tiền mặt</Text>
            <Icon name="money" size={24} color="#319AB4" style={{ marginRight: 10 }} /> 
            
           
            
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <RadioButton
              value="bank"
              status={paymentMethod === 'bank' ? 'checked' : 'unchecked'}
              onPress={() => setPaymentMethod('bank')}
            />
             <Text style={{ marginHorizontal: 5 }}>Thanh toán bằng VNPay</Text>
            <Image source={require('../Image/vnpay-logo2.jpg')} style={{ marginRight: 10, width:45,height:40 }}/>
            {/* <Icon name="bank" size={24} color="#319AB4" style={{ marginRight: 10 }} /> */}
            
           
            
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
          orderData={orderData} // Truyền orderData
          onOrderSuccess={sendOrderToServer}
        />
        <SuccessModal 
          isVisible={isSuccessModalVisible} 
          navigation={navigation}
      />
      </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:9.5,
    padding: 0.05 * screenWidth,

  },
  header: {
    flex:0.5,
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
