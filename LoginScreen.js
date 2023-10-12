import React, { useState,useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ToastAndroid
} from 'react-native';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginPressed, setIsLoginPressed] = useState(false);
    const handleLogin = () => {

        if (username === '' || password === '') {
            ToastAndroid.show('Tên đăng nhập và mật khẩu không được để trống!!', ToastAndroid.SHORT);
            return; // Ngừng xử lý
        }

        const loginData = {
            username,
            password,
        };
        // Gửi yêu cầu POST
        fetch('https://example.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })
            .then((res) => {
                if (res.status === 200) {
                    // Đăng nhập thành công
                    navigation.navigate('HomeScreen'); // Chuyển đến HomeScreen
                } else if (res.status === 401) {
                    // Đăng nhập thất bại
                    ToastAndroid.show('Tên đăng nhập hoặc mật khẩu không đúng', ToastAndroid.SHORT);
                }
            })
            .catch((e) => {
                console.error(e);
                ToastAndroid.show('Lỗi kết nối', ToastAndroid.SHORT);
            });

    };

    return (

            <View style={styles.container}>
                <View>
                    <Image style={{ width: 173, height: 52, marginBottom:-20,marginTop:20 }} source={require('./Image/logo1.png')} />
                </View>



                <View style={styles.ctn}>
                    <View style={styles.input}>
                        <Text style={{fontSize:15,paddingBottom:2,fontWeight:'bold',color:'gray'}}>Số điện thoại/gmail</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Nhập số điện thoại/gmail của bạn"
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => setUsername(text)}// Ẩn đường gạch dưới trên Android
                        />
                    </View>
                    <View style={styles.input}>
                        <Text style={{fontSize:15,paddingBottom:2,fontWeight:'bold',color:'gray'}}>Mật khẩu</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Nhập mật khẩu của bạn"
                            secureTextEntry={true}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => setPassword(text)}// Ẩn đường gạch dưới trên Android
                        />
                    </View>
                    <Text style={{marginLeft:400,marginTop:7,color:'gray'}}>Quên mật khẩu!</Text>
                </View>
                <TouchableOpacity style={styles.btn_login} onPress={handleLogin}>
                    <Text style={styles.btn_txt}>ĐĂNG NHẬP</Text>
                </TouchableOpacity>

                <Text style={styles.registerText}>
                    Chưa có tài khoản?{' '}
                    <Text
                        style={{color:'blue'}}
                        onPress={() => navigation.navigate('Register')}
                    >
                        Đăng ký ngay
                    </Text>
                </Text>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom:200,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 18,
    },
    ctn: {
        marginLeft:-10,
        marginTop:60
    },
    convert:{
      flexDirection:'row'
    },

    btn_login: {
        width:300,
        marginTop:50,
        backgroundColor: '#319AB4',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
    },

    btn_txt: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    input: {
        marginBottom:10,
        borderBottomWidth: 1, // Độ dày của đường gạch dưới
        borderBottomColor: 'gray', // Màu của đường gạch dưới
        marginVertical: 3, // Khoảng cách giữa TextInput và đường gạch dưới
    },
    input2: {
        borderBottomWidth: 1, // Độ dày của đường gạch dưới
        borderBottomColor: 'gray', // Màu của đường gạch dưới
        marginVertical: 3, // Khoảng cách giữa TextInput và đường gạch dưới
    },
    textInput: {
        width:500,
        height: 40,
        paddingBottom:10// Chiều cao của TextInput
    },
    registerText:{
        marginTop:20,
        fontSize:15
    }
});
