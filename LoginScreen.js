import React, { useState,useEffect  } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from "@react-navigation/native";



export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLoginPressed] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const navigation = useNavigation();


    const handleLogin = () => {
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        console.log(trimmedUsername);

        if (username === '' || password === '') {
            ToastAndroid.show('Tên đăng nhập và mật khẩu không được để trống!!', ToastAndroid.SHORT);
            return; // Ngừng xử lý
        }

        const loginData = {
            "username":trimmedUsername,
            "password":trimmedPassword,
        };
        // Gửi yêu cầu POST
        fetch('http://192.168.1.8:3000/api/users/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })
        .then(async (res) => {
            const data = await res.json();  // Parse dữ liệu trả về từ máy chủ
    
            if (res.status === 200) {
                // Đăng nhập thành công
                
                 // Lưu trạng thái isLoggedIn vào AsyncStorage
                await AsyncStorage.setItem('username', data.userName);
                console.log("data user ",data);
                // Lưu _id của người dùng vào AsyncStorage nếu _id tồn tại trong dữ liệu trả về
                if (data.userId) {
                    await AsyncStorage.setItem('userId', data.userId);
                    setIsLoggedIn(true); // <-- Cập nhật trạng thái isLoggedIn
                    await AsyncStorage.setItem('isLoggedIn', 'true');
                }
    
                navigation.navigate('Appnavigator');
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
            <Image style={styles.logo} source={require('./Image/logo1.png')} />
            <TextInput
                label="Số điện thoại/gmail"
                value={username}
                onChangeText={(text) => setUsername(text)}
                style={styles.input}
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    label="Mật khẩu"
                    value={password}
                    secureTextEntry={!showPassword}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.passwordInputField}
                />
                <Icon
                    name={showPassword ? 'eye-slash' : 'eye'}
                    size={20}
                    color="gray"
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.passwordIcon}
                />
            </View>
            <Button mode="contained" onPress={handleLogin} style={styles.btn_login}>
                ĐĂNG NHẬP
            </Button>
            <Text style={styles.registerText}>
                Chưa có tài khoản?{' '}
                <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
                    Đăng ký ngay
                </Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 173,
        height: 52,
        marginBottom: 80,
    },
    input: {
        width: '80%',
        marginBottom: 20,
        backgroundColor: 'lightblue',
    },
    passwordContainer: {
        width: '80%',
        marginBottom: 20,
        position: 'relative',
        flexDirection: 'row', // Đặt trong một dòng
        alignItems: 'center', // Căn giữa theo chiều dọc
    },
    passwordInputField: {

        flex: 1, // Để TextInput mở rộng để điền dữ liệu
        backgroundColor: 'lightblue',
    },
    passwordIcon: {
        position: 'absolute',
        right: 10,
    },
    btn_login: {
        width: '80%',
        marginTop: 30,
        backgroundColor: '#319AB4',
        borderRadius: 10,
    },
    registerText: {
        marginTop: 20,
        fontSize: 15,
    },
    registerLink: {
        color: 'blue',
    },
});