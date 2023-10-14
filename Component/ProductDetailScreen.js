import React, { useState } from 'react';
import { View, Text, Image, Button, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import { useCart } from './CartContext';
import CommentItem from './CommentItem'; 



const ProductDetailScreen = ({ navigation, route }) => {
  const { product } = route.params;
  const { state, dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');


  const goBack = () => {
    navigation.goBack();
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

  const addToCart = () => {
    const existingProduct = state.cart.find((p) => p.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
      dispatch({ type: 'UPDATE_CART', payload: existingProduct });
    } else {
      const productWithQuantity = { ...product, quantity: 1 };
      dispatch({ type: 'ADD_TO_CART', payload: productWithQuantity });
    }

    // Calculate the total price
    calculateTotalPrice();

    // Show a toast message
    Toast.show({
      type: 'success',
      text1: 'Món ngon đã được thêm vào giỏ hàng của bạn!',
      text2: 'Mời đến giỏ hàng',
    });
  };

  const calculateTotalPrice = () => {
    let total = 0;
    state.cart.forEach((product) => {
      total += product.price * product.quantity;
    });
    setTotalPrice(total);
  };
  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };
  

    const submitComment = () => {
      if (newComment) {
        // Add the new comment to the list
        addComment({ username: 'User', content: newComment });
        // Clear the input field
        setNewComment('');
      }
    };

  

    const checkout = () => {
      // Chuyển đến màn hình thanh toán và truyền thông tin cần thiết
      navigation.navigate('PayScreen', {
        product,
        quantity,
        totalPrice,
      });
    };
    

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 25 }}>
      <View style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('./../Image/left_arrow.png')} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', flex: 1, fontSize: 24 }}>Chi tiết sản phẩm</Text>
          <View style={styles.topRow}>
          <TouchableOpacity style={[ styles.menuButton]} onPress={addToCart}>
            <Image source={require('./../Image/menu-icon.png')} style={styles.icon} />

          </TouchableOpacity>

          </View>
        </View>
      <ScrollView>
        
        <Image source={require('./../Image/imagedoan.png')} style={styles.image} />
        <View style={styles.contentRow}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price} VND</Text>
        </View>
        <View style={styles.descriptionContainer}>
                  <Text style={styles.description}>{product.desscription}</Text>

              </View>
              <View style={styles.danhGiaRow}>
                  <Text style={styles.DanhgiaTitle}>Đánh giá {product.race}</Text>
                  <Image source={require('./../Image/star.png')} style={styles.iconstar} />
                </View>
                <View style={styles.commentSection}>
                        {/* Display the list of comments */}
                        
                        {/* Your existing comment input */}
                        <View style={styles.commentInputContainer}>
                        
                          <TextInput
                            placeholder="Nhập bình luận..."
                            style={styles.commentInput}
                            multiline
                            // Add onChangeText to update the comment as the user types
                            onChangeText={(text) => setNewComment(text)}
                            value={newComment}
                          />
                          <TouchableOpacity onPress={submitComment}>
                            <Icon name="send" size={24} color="#319AB4" style={styles.sendIcon} />
                          </TouchableOpacity>
                        </View>

                        
                      </View>
                <ScrollView style={styles.scrollView}>
                {comments.map((comment, index) => (
                          <CommentItem key={index} username={comment.username} content={comment.content} />
                        ))}
                </ScrollView>
         </ScrollView>
        </View>
              

              

          

        <View style={styles.bottomRow}>
        <View style={styles.quantityContainer}>
            <Text style={styles.totalPrice}>Total: {totalPrice} VND</Text>
            <Button title="-" onPress={decreaseQuantity} />
            <Text style={styles.quantityText}>{quantity}</Text>
            <Button title="+" onPress={increaseQuantity} />
          </View>
          <TouchableOpacity style={[styles.button, styles.bottomButton]} onPress={checkout}>
            <Image source={require('./../Image/money-icon.png')} style={styles.icon} />
            <Text style={styles.buttonText}>Pay</Text>
          </TouchableOpacity>
        </View>
      
      {/* Initialize Toast container */}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
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
