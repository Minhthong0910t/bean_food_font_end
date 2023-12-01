import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ToastAndroid } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { URL } from '../const/const';

export default function RegisterScreen() {
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [validateUser, setValidateUser] = useState('');
    const [validatePhone, setValidatePhone] = useState('');
    const [validatePass, setValidatePass] = useState('');
    const [validaRepass, setValidateRepass] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);


    const navigation = useNavigation();

    const handleRegister = async () => {

        const trimmedUsername = username.trim();
        const trimmedPhone = phone.trim();
        const trimmedPassword = password.trim();
        const trimmedRepassword = rePassword.trim();

        if (trimmedUsername =="" || trimmedUsername.length < 3) {
            setValidateUser('Tên đăng nhập không hợp lệ');
            return;
        } else {
            setValidateUser('');
        }
        // Validate phone number
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            setValidatePhone('Số điện thoại không hợp lệ');
            return;
        } else {
            setValidatePhone('');
        }

        //mật khẩu
        if (trimmedPassword.length < 2) {
            setValidatePass('Mật khẩu không hợp lệ');
            return;
        } else {
            setValidatePass('');
        }

        //xác nhận mật khẩu
        if (rePassword !== trimmedPassword) {
            setValidateRepass('Mật khẩu nhập lại không khớp');
            return;
        } else {
            setValidateRepass('');
        }


        // Tạo dữ liệu
        const registrationData = {
            "username":trimmedUsername,
            "phone":trimmedPhone,
            "password":trimmedPassword,
            "rePassword":trimmedRepassword
        };

        // Gửi yêu cầu POST
        await fetch(URL+'api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationData),
        })

            .then(res => {
                if (res.status === 200) {
                    ToastAndroid.show('Đăng ký thành công',ToastAndroid.SHORT)
                    setUsername("");
                    setPhone("");
                    setPassword("");
                    navigation.navigate('Login');
                } else if (res.status === 500) {
                    ToastAndroid.show('Tên tài khoản/email đã được sử dụng!! ',ToastAndroid.SHORT)
                }
            })
            .catch(e => {
                console.error(e);
                ToastAndroid.show('Đăng kí thất bại',ToastAndroid.SHORT)
            });
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('./../Image/logo1.png')} />
            <TextInput
                label="Tên đăng nhập"
                value={username}
                onChangeText={(text) => setUsername(text)}
                style={styles.input}
            />
            <TextInput
                label="Số điện thoại"
                value={phone}
                onChangeText={(text) => setPhone(text)}
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

            <View style={styles.passwordContainer}>
                <TextInput
                    label="Nhập lại mật khẩu"
                    value={rePassword}
                    secureTextEntry={!showRePassword}
                    onChangeText={(text) => setRePassword(text)}
                    style={styles.passwordInputField}
                />
                <Icon
                    name={showRePassword ? 'eye-slash' : 'eye'}
                    size={20}
                    color="gray"
                    onPress={() => setShowRePassword(!showRePassword)}
                    style={styles.passwordIcon}
                />
            </View>
            <Button
                mode="contained"
                onPress={handleRegister}
                style={styles.btn_register}
            >
                ĐĂNG KÝ
            </Button>
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
    btn_register: {
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