import React, { useState, useEffect } from 'react';
import { 
  View, Text, Image, Button, TouchableOpacity, TextInput, StyleSheet, 
  SafeAreaView, ScrollView ,Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';

import { useCart } from '../Component/CartContext';
import CommentItem from '../Item/CommentItem';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { addproducttocart } from '../Redux/ActionAddtoCart';



const ProductDetailScreen = ({ navigation, route }) => {
  const { product } = route.params;
  const { state, dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const dispatchproduct = useDispatch();
  const products = useSelector(state => state.products);
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('_id'); // Thay 'key' bằng khóa lưu trữ của bạn
        if (storedData !== null) {
          setData(storedData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  
  }, []);
  


  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedUserId = await AsyncStorage.getItem('_id');
        
        if (storedUsername && storedUserId) {
          
          setIsLoggedIn(true);
          setCurrentUser({ username: storedUsername, _id: storedUserId });
          console.log("User name:", storedUsername);
          console.log("User ID:", storedUserId); // Log giá trị của userId
          console.log("Is Logged In:", true);    // Log trạng thái đăng nhập là true
        } else {
          console.log("User ID:", storedUserId);
          console.log("Is Logged In:", false);   // Log trạng thái đăng nhập là false
        }
        
      } catch (error) {
        console.error('Error retrieving stored data:', error);
      }
    };
    // console.log("đây là id pr ==>>",product);
    checkLoginStatus();
    fetchComments()
   
  }, []);

  

  const fetchComments = async () => { 
    try {
      let response = await fetch('http://192.168.1.11:3000/api/comment/getAll');
      let jsonResponse = await response.json();     
      if (response.status === 200) {
        // Lọc các bình luận dựa trên idProduct._id
        let filteredComments = jsonResponse.data.filter(comment => comment.idProduct._id === product._id);
        // console.log("vippp ",filteredComments);
  
        if (filteredComments.length > 0) {
          setComments(filteredComments);
        } else {
          Toast.show({
            type: 'info',
            text1: 'Thông báo',
            text2: 'Không có dữ liệu bình luận cho sản phẩm này.',
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Lỗi!',
          text2: jsonResponse.msg || 'Không thể lấy dữ liệu từ server',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi!',
        text2: error.message || 'Không thể kết nối đến server',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const goBack = () => {
    navigation.goBack();
  };
  const goCart = () => {
    navigation.navigate('Order');
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    setTotalPrice(product.price * (quantity + 1));
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setTotalPrice(product.price * (quantity - 1));
    }
  };
  const saveDataToAsyncStorage = async (key, data) => {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonData);
      console.log('Data saved successfully.');
    } catch (error) {
      console.log('Error saving data: ', error);
    }
  };
  const addToCart = () => {
    if(storedUserId){
    calculateTotalPrice();
    const newCartProduct = {
      idproductcart:new Date().getTime().toString(),
      nameproduct:product.name , 
      quantityproduct :quantity ,
      total :totalPrice,
      price:product.price,
      idusser:data
    }
    dispatchproduct(addproducttocart(newCartProduct))


  console.log(data)
  Toast.show({
    type: 'success',
    text1: 'Món ngon đã được thêm vào giỏ hàng của bạn!',
    text2: 'Mời đến giỏ hàng',
  });
  setQuantity(1)
  setTotalPrice(product.price)
 }else{
  Toast.show({
    type: 'error',
    text1: 'Bạn phải đăng nhập mới được thêm đồ ăn',
  });
 }

    // Show a toast message

    console.log(data)
    Toast.show({
      type: 'success',
      text1: 'Món ngon đã được thêm vào giỏ hàng của bạn!',
      text2: 'Mời đến giỏ hàng',
    });
    setQuantity(1)
    setTotalPrice(product.price)

    
    
  };
  useEffect(()=>{
    console.log(products)
    saveDataToAsyncStorage('products' , products)
  } , [products])
 

  const calculateTotalPrice = () => {
    let total = 0;
    state.cart.forEach((product) => {
      total += product.price * product.quantity;
    });
    setTotalPrice(total);
  };

  const submitComment = () => {
    if (!newComment || newComment.trim() === "") {
      ToastAndroid.show('Người dùng phải nhập bình luận, không được để trống!', ToastAndroid.SHORT);
      return;
  } 
    if (!isLoggedIn) {
        setNewComment('');
        Alert.alert(
          "Thông báo",
          "Vui lòng đăng nhập để bình luận!",
          [
            {
              text: "Hủy bỏ",
              style: "cancel",
            },
            {
              text: "Đăng nhập",
              onPress: () => navigation.navigate("Login"),
            },
          ],
          { cancelable: false }
        );
        return;
    }



    const apiUrl = 'http://192.168.1.7:3000/api/comment/create';


  

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idProduct: product._id,
        idUser: currentUser._id, // id user
        title: newComment
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Lỗi mạng hoặc máy chủ");
      }
      return response.json();
    })
    .then(data => {
      setComments(prevComments => [...prevComments, data.comment]);
      setNewComment('');
      fetchComments();
    })
    .catch(error => console.error("Có lỗi khi thêm bình luận", error));
};
    const renderLoading = () => (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  
    const renderProductDetails = () => (
      <SafeAreaView style={{ flex: 1, marginTop: 25 }}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            {/* Back button */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('./../Image/left_arrow.png')} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
            {/* Title */}
            <Text style={{ fontWeight: 'bold', flex: 1, fontSize: 24 }}> Chi tiết sản phẩm </Text>
  
            {/* Cart button */}
            <TouchableOpacity style={styles.menuButton} onPress={goCart}>
              <Image source={require('./../Image/menu-icon.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>
  
          <ScrollView>
            {/* Product image */}
            <Image source={{uri: product.images[0]}} style={styles.image} />
  
            {/* Product name and price */}
            <View style={styles.contentRow}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price} VND</Text>
            </View>
  
            {/* Product description */}
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{product.description}</Text>
            </View>
  
            {/* Product rating */}
            <View style={styles.danhGiaRow}>
              <Text style={styles.DanhgiaTitle}>Đánh giá {product.race}</Text>
              <Image source={require('./../Image/star.png')} style={styles.iconstar} />
            </View>
  
            {/* Comments section */}
            <View style={styles.commentSection}>
              <TextInput
                placeholder="Nhập bình luận..."
                style={styles.commentInput}
                multiline
                onChangeText={(text) => setNewComment(text)}
                value={newComment}
              />
              <TouchableOpacity onPress={submitComment}>
                <Icon name="send" size={24} color="#319AB4" style={styles.sendIcon} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView}>
                    {comments.map((comment, index) => (
                      <CommentItem 
                        key={index}
                        username={comment.idUser.username} 
                        title={comment.title} 
                        avatar={comment.idUser.avatar}
                      />
                    ))}
                  </ScrollView>
            
          </ScrollView>
  
          {/* Bottom bar with quantity and payment button */}
          <View style={styles.bottomRow}>
            <View style={styles.quantityContainer}>
              <Text style={styles.totalPrice}>Total: {totalPrice} VND</Text>
              <Button title="-" onPress={decreaseQuantity} />
              <Text style={styles.quantityText}>{quantity}</Text>
              <Button title="+" onPress={increaseQuantity} />
            </View>
            <TouchableOpacity style={[styles.button, styles.bottomButton]} onPress={addToCart}>
              <Image source={require('./../Image/money-icon.png')} style={styles.icon} />
              <Text style={styles.buttonText}>Thêm món</Text>
            </TouchableOpacity>
          </View>
  
          {/* Initialize Toast container */}
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
      </SafeAreaView>
    );
  
    return isLoading ? renderLoading() : renderProductDetails();
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
  },
  scrollView:{margin:10},
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  danhGiaRow:{ 
  flexDirection: 'row',
  padding: 10,},
  iconstar:{
    width:10,
    height:10,
    
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  descriptionContainer: {
    padding: 8,
  },
  description: {
    fontSize: 16,
  },

  commentSection: {
    flexDirection: 'row',
    margin: 10,
  },
  commentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  DanhgiaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft:5
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  sendIcon: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 100,
  },
  
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  quantityText: {
    fontSize: 18,
  },
  totalPrice: {
    fontSize: 18,
    padding: 10,
    fontWeight: 'bold',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 8
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
    marginBottom: 10
  },
  bottomButton: {
    flex: 1,
    marginHorizontal: 5,
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
  
});

export default ProductDetailScreen;
