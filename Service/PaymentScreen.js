import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import CryptoJS from 'crypto-js';
import * as Network from 'expo-network';
import { format } from 'date-fns';

const screenWidth = Dimensions.get('window').width;

const PaymentScreen = ({ route, navigation }) => {
  const { totalPrice, products } = route.params;
  const [paymentUrl, setPaymentUrl] = useState('');
  const [encodedDateTime, setEncodedDateTime] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const vnp_TmnCode = '6FJIV8KG';
  const vnp_HashSecret = 'YHGQPFMBSJMRDGUULBDWUGRIFJOHDWYC';

   // Hàm lấy thời gian bắt đầu
  function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }
  //// Hàm lấy thời gian kết thúc
  const getExpireDateTime = (offsetMinutes = 30) => {
    // Tạo ra một đối tượng ngày mới với thời gian hiện tại
    const now = new Date();
  
    // Thêm offset (ví dụ: 30 phút) vào thời gian hiện tại
    now.setMinutes(now.getMinutes() + offsetMinutes);
  
    // Định dạng thời gian theo yêu cầu: yyyyMMddHHmmss
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
  
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  };


  const generateRandomNumberString = (length) => {
    let randomString = '';
    while (randomString.length < length) {
      // Tạo một số ngẫu nhiên và loại bỏ phần '0.' ở đầu
      randomString += Math.random().toString().slice(2);
    }
    // Cắt chuỗi để có độ dài mong muốn và trả về
    return randomString.substr(0, length);
  };
///
const generateEncodedDateTime = () => {
  // Current date and time
  const currentDateTime = new Date();

  // Format the date and time in the desired format
  const formattedDateTime = `${currentDateTime.getFullYear()}-${(currentDateTime.getMonth() + 1).toString().padStart(2, '0')}-${currentDateTime.getDate().toString().padStart(2, '0')} ${currentDateTime.getHours().toString().padStart(2, '0')}:${currentDateTime.getMinutes().toString().padStart(2, '0')}:${currentDateTime.getSeconds().toString().padStart(2, '0')}`;

  // Construct the original string with the current date and time
  const originalString = `Thanh toan don hang thoi gian: ${formattedDateTime}`;

  // URL encode the string, replacing spaces with plus signs
  const encodedString = encodeURIComponent(originalString).replace(/%20/g, '+');

  console.log("Encoded DateTime: " + encodedString);
  setEncodedDateTime(encodedString);
  return encodedString;
};


  useEffect(() => {
    // Hàm lấy địa chỉ IP và cập nhật trạng thái
    const fetchIpAddress = async () => {
      try {
        const ip = await Network.getIpAddressAsync();
        setIpAddress(ip);
      } catch (e) {
        console.error(e);
      }
    };
  
    fetchIpAddress();
  }, []);
   useEffect(() => {
    const createPaymentUrl = () => {
      // Tạo các tham số cơ bản cho giao dịch
       // Các thông số cần thiết cho URL
  const vnp_Params = {
    vnp_Amount: totalPrice*100,
    vnp_BankCode: 'NCB',
    vnp_Command: 'pay',
    vnp_CreateDate: getCurrentDateTime(),
    vnp_CurrCode: 'VND',
    vnp_ExpireDate: getExpireDateTime(),
    vnp_IpAddr: ipAddress,
    vnp_Locale: 'vn',
    vnp_OrderInfo: generateEncodedDateTime(),
    vnp_OrderType: 'food',
    vnp_ReturnUrl: 'https%3A%2F%2Fsandbox.vnpayment.vn%2Ftryitnow%2FHome%2FVnPayReturn',
    vnp_TmnCode: vnp_TmnCode,
    vnp_TxnRef: generateRandomNumberString(6),
    vnp_Version: '2.1.0'
    // vnp_SecureHash sẽ được thêm sau khi tạo chuỗi băm
  };

      // Sắp xếp các tham số theo thứ tự alphabet
      const sortedKeys = Object.keys(vnp_Params).sort();
      let signData = sortedKeys.map(key => `${key}=${vnp_Params[key]}`).join('&');

      // Tạo chuỗi băm
      const secureHash = CryptoJS.HmacSHA512(signData, vnp_HashSecret).toString(CryptoJS.enc.Hex);
      const paymentUrl = `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?${signData}&vnp_SecureHash=${secureHash}`;

      return paymentUrl;
    };

    const url = createPaymentUrl();
    console.log(url);
    // console.log(products);
    setPaymentUrl(url);
  }, [ipAddress,totalPrice, products]);
  

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        // Thay thế 'YOUR_SERVER_ENDPOINT' với endpoint thực tế của bạn
        const response = await fetch('http://192.168.1.11:3000/api/vnpay_return', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderInfo: 'Thông tin đơn hàng',
            transactionRef: 'vnp_TxnRef từ VNPAY',
            // Thêm các thông tin khác cần thiết
          }),
        });
        const result = await response.json();
  
        // Xử lý dựa trên kết quả trả về
        if (result.paymentStatus === 'Success') {
          // Thanh toán thành công, cập nhật UI hoặc chuyển hướng
          navigation.navigate('Home')
        } else {
          // Thanh toán thất bại hoặc tình trạng khác, xử lý tương ứng
        }
      } catch (error) {
        console.error('Lỗi khi kiểm tra tình trạng thanh toán:', error);
      }
    };
  
    checkPaymentStatus();
  }, []);
  

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.goBackButton}>
        <Text>Go Back</Text>
      </TouchableOpacity>
      <View>
      <Text style={styles.title}>Hoá đơn thanh toán đơn hàng</Text>
      </View>
      <View>
     
      <Text style={styles.title}>Tổng tiền: {totalPrice}</Text>
      </View>
      
      <View style={styles.paymentInfoContainer}>
      <Text style={styles.title}>Thanh toán qua ngân hàng</Text>
      {/* Kiểm tra để đảm bảo paymentUrl không phải là chuỗi rỗng */}
      {paymentUrl ? (
        <QRCode
          value={paymentUrl}
          size={screenWidth * 0.8}
          color="black"
          backgroundColor="white"
        />
      ) : (
        <Text>Đang tạo URL thanh toán...</Text>
      )}
     
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goBackButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  paymentInfoContainer: {
    alignItems: 'center',
    margin: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  qrCode: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
    marginBottom: 20,
  },
});

export default PaymentScreen;
