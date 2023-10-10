import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, Platform } from 'react-native';

const OrderScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./Image//logo_bean.png')} // Thay đổi đường dẫn ảnh
          style={styles.logo}
        />
        <Text style={styles.title}>Oder Food</Text>
      </View>
      
      {/* Thêm danh sách nhà hàng ở đây */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0, // Điều này sẽ giữ khoảng cách 15px trên Android, không có gì trên iOS
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1, // Thêm đường viền dưới cùng của header
    borderBottomColor: '#ccc', // Màu đường viền
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
  // Thêm các kiểu CSS khác ở đây
});

export default OrderScreen;
