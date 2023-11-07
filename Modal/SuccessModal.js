import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const SuccessModal = ({ isVisible, navigation }) => {
    const goHome = () => {
        navigation.navigate('Home')
      };
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.container}>
        <Image source={require('../Image/Image/logo_bean.png')} style={styles.image} />
        <Text style={styles.heading}>BẠN ĐÃ ĐẶT HÀNG</Text>
        <Text style={styles.subheading}>THÀNH CÔNG</Text>
        <Text style={styles.instruction}>Kiểm tra đơn hàng của bạn trong mục "Lịch sử đơn hàng"!</Text>
        <TouchableOpacity style={styles.button} onPress={goHome}>
          <Text style={styles.buttonText}>TRANG CHỦ</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  image: {
    width: 250,
    height: 150,  // Giảm chiều cao ảnh xuống
    marginBottom: 10,  // Giảm khoảng cách dưới ảnh
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 5,
  },
  instruction: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
    
    marginHorizontal: 10,  // Tăng khoảng cách ngang để văn bản không sát biên
  },
  button: {
    marginTop: 15,  // Giảm khoảng cách trên nút
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SuccessModal;
