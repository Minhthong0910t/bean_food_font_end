import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, Platform, FlatList } from 'react-native';
import { URL } from '../const/const';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationScreen = () => {
  const [historyData, setHistoryData] = useState([]);
  const [dataUid, setDataUid] = useState('');
  useEffect(() => {
    const fetchDataHistory = async () => {
      try {
        const response = await fetch(URL + 'api/history');
        const data = await response.json();
        const filteredData = data.filter(item => item.userId === dataUid);
        setHistoryData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (dataUid) {
      fetchDataHistory();
    }
    console.log("ls", historyData);
  }, [dataUid]);
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('_id');
        if (userId !== null) {
          setDataUid(userId);
        }
      } catch (error) {
        console.error('Error fetching userId:', error);
      }
    };
    fetchUserId();
  }, []);
  console.log('historyData', historyData);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./../Image/logo_bean.png')} // Thay đổi đường dẫn ảnh
          style={styles.logo}
        />
        <Text style={styles.title}>Notification Food</Text>
      </View>

      <FlatList
        data={historyData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {

          return (
            <View style={{
             
              backgroundColor: '#F2F6FD',
              borderBottomColor: '#DFE0EB',
              marginTop: 14,
              borderRadius: 18,
              marginHorizontal: 16,
              paddingVertical: 15
            }} key={index}>

              <View style={{
                flexDirection: 'row',
                paddingLeft: 10,
                paddingTop: 15
              }}>
                <Image source={{ uri: 'https://cdn4.vectorstock.com/i/1000x1000/92/63/complete-order-icon-in-line-style-for-any-projects-vector-35249263.jpg' }}

                  style={{
                    width: 49, height: 49
                  }}
                />
                <View style={{
                  justifyContent: 'space-between',
                  marginVertical: 3,
                  marginLeft: 17
                }}>
                  <Text style={{
                    fontSize: 14,
                    // fontFamily: 'Bold',
                    // fontWeight: '700',
                    color: '#242426'
                  }}>Payment Order</Text>
                  <Text style={{ color: '#848688' }}>{moment(item.time).format('HH:mm - DD/MM')}</Text>

                </View>
              </View>
              <View style={{ height: 1, backgroundColor: '#F2F2F2', marginTop: 12 }}></View>
              <Text style={{ textAlign: 'left', marginLeft: 12, marginTop: 10, fontSize: 12, color: '#747475' }} numberOfLines={3}>
                Bạn đã đặt hàng thành công đơn hàng 
                <Text style={{ color: 'green' }}> {item._id  ?? ''} </Text>
                với số tiền cần thanh toán 
                <Text style={{color: 'red'}}> {item.toltalprice}VND</Text>
              </Text>

            </View>
          )
        }}

        keyExtractor={(item) => item.id}
      />
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

export default NotificationScreen;
