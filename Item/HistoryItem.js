import React  , {useState , useEffect}from 'react';
import { View, Text, TouchableOpacity, StyleSheet  , Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../const/const';


const HistoryItem = ({ item  ,onStatusUpdate  , navigation}) => {
    const [dataUid, setDataUid] = useState('');
    // Tạo một chuỗi các tên món ăn, cách nhau bởi dấu phẩy
    const productNames = item.products.map(product => product.name).join(', ');
    const formatTime = (timeString) => {
        const date = new Date(timeString);
        const formattedTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        return `${formattedTime} ${formattedDate}`;
    };
    const getStatusText = (status) => {
        switch (status) {
            case 0:
                return 'Đang xử lý';
            case 1:
                return 'Đang giao';
            case 2:
                return 'Đã giao';
            case 3:
            return 'Đã huỷ';
            default:
                return 'Trạng thái không xác định';
        }
    };


    const handlecancel = async()=>{
        Alert.alert(
            'Cảnh báo!!',
            'Bạn có muốn hủy đon hàng không?',
            [
              {
                text: 'Hủy',
                onPress: () => {return},
                style: 'cancel',
              },
              {
                text: 'Đồng ý',
                onPress: async () => {
                 
                    const storedData = await AsyncStorage.getItem('_id');
                    console.log("item id 111" , storedData);

                    try {
                        const apiUrl = `${URL}api/user/cancel`; // Thay thế bằng URL API cập nhật trạng thái đơn hàng với Order ID
                        const response = await fetch(apiUrl, {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({  orderId:item._id , 
                            userId:storedData
                            // Thay thế bằng Order ID cần hủy
                          }),
                        });
                  
                        if (response.ok) {
                          // Cập nhật trạng thái đơn hàng thành công
                       
                          console.log('Cập nhật trạng thái đơn hàng thành công');
                          onStatusUpdate(); // Gọi hàm callback sau khi cập nhật thành công
                        } else {
                          // Xử lý lỗi nếu cần
                          const errorData = await response.json();
                          console.log('Lỗi cập nhật trạng thái đơn hàng:', errorData.msg);
                        }
                      } catch (error) {
                        console.error('Lỗi khi gọi API cập nhật trạng thái đơn hàng:', error);
                      }
        
                  
                },
              },
            ],
            { cancelable: false }
          );
     

     
    }

    const handledatlai = async ()=>{
        console.log("data products " , item.products);
        const dataUid = await AsyncStorage.getItem('_id');

        navigation.navigate('PayScreen' , {products: item.products,dataUid
          });
    }

    return (
        <View style={styles.item}>
            <Text style={styles.name}>{productNames}</Text>
            <Text style={styles.detail}>Thời gian: {formatTime(item.time)}</Text>
            <Text style={styles.detail}>Phương thức thanh toán: {item.phuongthucthanhtoan}</Text>
            <Text style={styles.detail}>Trạng thái: {getStatusText(item.status)}</Text>
            {item.status === 0 && (
                <TouchableOpacity style={styles.buttonCancel} onPress={handlecancel}>
                <Text style={styles.buttonText2}>Huỷ</Text>
            </TouchableOpacity>
            )}
            
            {item.status === 1 && (
                <TouchableOpacity style={styles.buttonload} onPress={() => {/* Thêm hành động khi nhấn nút */}}>
                <Text style={styles.buttonText}>Vui lòng chờ món ngon đang đến...</Text>
            </TouchableOpacity>
            )}
            {item.status === 2 && (
                <TouchableOpacity style={styles.button} onPress={handledatlai}>
                <Text style={styles.buttonText}>Đặt lại</Text>
            </TouchableOpacity>
            )}
            
            
            
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10, // Thêm margin dưới để tạo khoảng cách giữa tên món ăn và chi tiết
    },
    detail: {
        fontSize: 14,
        color: '#555',
    },
    button: {
        marginTop: 10,
        backgroundColor: '#ffa500',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonload: {
        marginTop: 10,
        backgroundColor: '#319AB4',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonCancel: {
        marginTop: 10,
        backgroundColor: '#D3D3D3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
    buttonText2: {
        color: 'black',
    }
});

export default HistoryItem;
