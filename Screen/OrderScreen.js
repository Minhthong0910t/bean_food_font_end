import React, { useState ,useReducer, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, Platform, TouchableOpacity, Alert } from 'react-native';
import { useCart } from '../Component/CartContext'; // Import the useCart hook
import { useSelector  , useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteproduct, updatecartproduct } from '../Redux/ActionAddtoCart';
import Toast from 'react-native-toast-message';

const OrderScreen = () => {
  const { state, dispatch } = useCart(); // Get the cart state and dispatch
  const [dataUid, setDataUid] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [products , setProducts] = useState([]);

  const dispathDeleteProductFromCart = useDispatch();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('_id'); // Thay 'key' bằng khóa lưu trữ của bạn
        if (storedData !== null) {
          setDataUid(storedData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

      
const updateItemByIdInAsyncStorage = async (key, idToUpdate, updatedData) => {
  try {
    // Lấy mảng từ AsyncStorage
    const jsonData = await AsyncStorage.getItem(key);
    if (jsonData) {
      let dataArray = JSON.parse(jsonData);

      // Tìm đối tượng dựa trên trường ID
      const index = dataArray.findIndex((item) => item.idproductcart === idToUpdate);

      if (index !== -1) {
        // Cập nhật thuộc tính của đối tượng
        dataArray[index] = { ...dataArray[index], ...updatedData };

        // Lưu lại mảng đã được chỉnh sửa vào AsyncStorage
        await AsyncStorage.setItem(key, JSON.stringify(dataArray));

        console.log('Object updated successfully');
      }
    }
  } catch (error) {
    console.log('Error updating object:', error);
  }
};
  useEffect(() => {
   
  const getDataFromAsyncStorage = async (key, id) => {
    try {
      const jsonData = await AsyncStorage.getItem(key);
      if (jsonData) {
        const dataArray = JSON.parse(jsonData);
        const filteredData = dataArray.filter((obj) => obj.idusser === id);
      setProducts(filteredData)
       
      }
    } catch (error) {
      console.log('Error retrieving data: ', error);
    }
  };
  getDataFromAsyncStorage('products' , dataUid)
  }, [products]);





 

  useEffect(()=>{ 
      calculateTotalPrice();

  },[products])
  useEffect(()=>{
  },[])

  // Function to calculate the total price
  const calculateTotalPrice = () => {
    let total = 0;
if(products && products.length>0){
  products.forEach((product) => {
    total += product.total * product.quantityproduct;
  });
  setTotalPrice(total);
}
  };

  const checkout = () => {
    // Navigate to the payment screen
  };
  const removeItemByIdFromAsyncStorage = async (key, idToRemove) => {
    try {
      // Lấy mảng từ AsyncStorage
      const jsonData = await AsyncStorage.getItem(key);
      if (jsonData) {
        let dataArray = JSON.parse(jsonData);
  
        // Tìm đối tượng dựa trên trường ID
        const index = dataArray.findIndex((item) => item.idproductcart === idToRemove);
  
        if (index !== -1) {
          // Xóa đối tượng khỏi mảng
          dataArray.splice(index, 1);
  
          // Lưu lại mảng đã được chỉnh sửa vào AsyncStorage
          await AsyncStorage.setItem(key, JSON.stringify(dataArray));
  
          console.log('Object removed successfully');
        }
      }
    } catch (error) {
      console.log('Error removing object:', error);
    }
  };
  const deleteProduct = (index) => {
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
            console.log(products[index].idproductcart)
            dispathDeleteProductFromCart(deleteproduct(products[index].idproductcart))// Manually trigger a re-render
            removeItemByIdFromAsyncStorage('products' ,products[index].idproductcart)
            calculateTotalPrice()
          },
        },
      ]
    );
  };

  const incrementQuantity = (product , index) => {
    const quantityproducts = product.quantityproduct ; 
    console.log(product.idproductcart)
    const dataupdate = quantityproducts+1;
    const updatedata = {quantityproduct:dataupdate}
    updateItemByIdInAsyncStorage('products' ,product.idproductcart ,updatedata)
    calculateTotalPrice();
  };

  const decrementQuantity = (product) => {
    if (product.quantityproduct > 1) {
      const quantityproducts = product.quantityproduct ; 
      console.log(product.idproductcart)
      const dataupdate = quantityproducts-1;
      const updatedata = {quantityproduct:dataupdate}
      updateItemByIdInAsyncStorage('products' ,product.idproductcart ,updatedata)
      calculateTotalPrice();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./../Image/logo_bean.png')} style={styles.logo} />
        <Text style={styles.title}>Order Food</Text>
      </View>

      <Text style={styles.sectionTitle}>Selected Products:</Text>
      <ScrollView>
        {products&& products.length>0?(products.map((product, index) => (
          <View key={index} style={styles.productContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{product.nameproduct}</Text>
              <Text style={styles.productPrice}>{products[index].total*products[index].quantityproduct} VND</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => decrementQuantity(product)}>
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{product.quantityproduct}</Text>
              <TouchableOpacity onPress={() => incrementQuantity(product , index)}>
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.deleteButtonContainer}>
              <TouchableOpacity onPress={() => deleteProduct(index)}>
                <Image source={require('./../Image/delete-icon.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        ))):  Toast.show('This is a toast.')}
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
