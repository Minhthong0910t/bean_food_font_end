import {React,useEffect,useState} from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import ToolBar from '../components/ToolBar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../const/const';
import ProductItemOrder from '../Item/ProductItemOder';

const Detailhistory = ({ route, navigation }) => {
    const { orderId } = route.params; // Get the orderId passed via navigation
    const [orderDetails, setOrderDetails] = useState(null);
    const deliveryFee = 35000;
    const discount = 0;

    // Lấy userId từ AsyncStorage
    const getStatusLabel = (status) => {
      switch (status) {
          case 0:
              return 'Chờ xác nhận';
          case 1:
              return 'Đã xác nhận';
          case 2:
              return 'Đang giao';
          case 3:
              return 'Đã giao';
          case 4:
              return 'Đã huỷ';
          default:
              return 'Trạng thái không xác định';
      }
  };

    
    useEffect(() => {
      const fetchOrderDetails = async () => {
          try {
              console.log('id:', orderId);
              const response = await fetch(`${URL}api/don-hang/${orderId}`);
              const data = await response.json();
              console.log('data:', data);
              setOrderDetails(data); // Lưu trữ đối tượng JSON trực tiếp
          } catch (error) {
              console.error('Error fetching order details:', error);
          }
      };
      if (!orderDetails) { // Chỉ fetch khi orderDetails là null hoặc undefined
          fetchOrderDetails();
      }
  }, [orderId]);

  const calculateTotalPurchase = (products) => {
    return products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
  };
  const goHome = async() => {
      navigation.navigate('Home')
    };


  return (
    <View>
    <ToolBar title="Thông tin đơn hàng" onBackPress={() => navigation.goBack()} />
    {orderDetails && ( 
                <>
    <ScrollView >
      <View style={styles.orderDetails}>
        <Text style={styles.orderStatus}>BeanFood</Text>
        <Text style={styles.orderStatus}>Trạng thái: {getStatusLabel(orderDetails.status)}</Text>
        <Text style={styles.orderNumber}>Đơn hàng: B-{orderDetails._id}</Text>
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.restaurantAddress}>Nhà hàng: {orderDetails.products[0].restaurantId.name}</Text>
        <Icon name="arrow-drop-down" size={30} color="#000" />
        <Text style={styles.deliveryAddress}>Địa điểm đến: {orderDetails.address}</Text>
      </View>
      <View style={styles.foodItemContainer}>
      {orderDetails.products.map(product => (
         <ProductItemOrder products={product} />
        ))}

      </View>
      
        <View style={styles.containerHD}>
            <View style={styles.row}>
              <Text style={styles.label}>Đơn mua</Text>
              <Text style={styles.value}>{calculateTotalPurchase(orderDetails.products)}đ</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Phí giao hàng (dự kiến)</Text>
              <Text style={styles.value}>{deliveryFee}đ</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Khuyến mãi</Text>
              <Text style={styles.value}>{discount}đ</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.totalLabel}>Tổng thanh toán</Text>
              <Text style={styles.totalValue}>{orderDetails.toltalprice}đ</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.totaltt}>Phương thức thanh toán</Text>
              <Text style={styles.totaltt}>{orderDetails.phuongthucthanhtoan}</Text>
            </View>
          </View>
      

      <View style={styles.helpContainer}>
        
        <TouchableOpacity style={styles.reorderButton} onPress={goHome}>
          <Text style={styles.reorderButtonText}>Quay về trang chủ</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </>
            )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  orderHeader: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  orderDetails: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  orderStatus: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  orderNumber: {
    fontSize: 16,
    color: '#000',
    marginTop: 4,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  driverImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  driverTextContainer: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  driverDetails: {
    fontSize: 14,
    color: '#646464',
  },
  addressContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  restaurantAddress: {
    fontSize: 16,
    color: '#000',
    fontWeight:'bold'
  },
  deliveryAddress: {
    fontSize: 16,
    color: '#000',
    marginTop: 4,
    fontWeight:'bold'
  },
  distance: {
    fontSize: 16,
    color: '#646464',
    marginTop: 4,
  },
  foodItemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  foodItem: {
    fontSize: 16,
    color: '#000',
  },
  foodItemNote: {
    fontSize: 14,
    color: '#646464',
    marginTop: 4,
  },
  paymentInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  paymentAmount: {
    fontSize: 16,
    color: '#000',
    marginTop: 4,
  },
  paymentTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 8,
  },
  paymentMethod: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 8,
  },
  receiptButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  receiptButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  helpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    marginBottom: 16,
  },
  helpButton: {
    padding: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  helpButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  reorderButton: {
    padding: 16,
    backgroundColor: '#FFC107',
    borderRadius: 4,
  },
  reorderButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
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
    margin: 10
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
  totaltt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  
});

export default Detailhistory;
