import React, { useState,useEffect  } from 'react';
import {View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ToastAndroid} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function RegisterScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); //hiển thị mật khẩu
    const [validateUser, setValidateUser] = useState('');
    const [validatePass, setValidatePass] = useState('');
    const [validaRepass, setValidateRepass] = useState('');


    const navigation = useNavigation();

    const handleRegister = async (username,password,rePassword) => {

        if (username === '' || username.length < 3) {
            setValidateUser('Tên đăng nhập không hợp lệ');
            return; // Ngừng xử lý
        } else {
            setValidateUser(''); // Xóa thông báo
        }

        //mật khẩu
        if (password === '' || password.length < 6) {
            setValidatePass('Mật khẩu không hợp lệ');
            return;
        } else {
            setValidatePass('');
        }

        //xác nhận mật khẩu
        if (password !== rePassword) {
            setValidateRepass('Mật khẩu nhập lại không khớp');
            return;
        } else {
            setValidateRepass('');
        }


        // Tạo dữ liệu
        const registrationData = {
            "username":username,
            "password":password,
            "rePassword":rePassword
        };

        // Gửi yêu cầu POST
        await fetch('https://example.com/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationData),
        })

            .then(res => {
                if (res.status == 200) {
                    ToastAndroid.show('Đăng ký thành công',ToastAndroid.SHORT)
                    setUsername("");
                    setPassword("");
                    setRePassword("");
                } else if (res.status == 500) {
                    ToastAndroid.show('Tên tài khoản đã được sử dụng!! ',ToastAndroid.SHORT)
                }
            })
            .catch(e => {
                console.error(e);
                ToastAndroid.show('Lỗi kết nối',ToastAndroid.SHORT)
            });
    }

    return (
        <View style={styles.container}>
            <View>
                <Image style={{ width: 173, height: 52, marginBottom:-20,marginTop:20 }} source={require('./Image/logo1.png')} />
            </View>

<View style={styles.ctn}>
    <View style={styles.input}>
        <Text style={{fontSize:15,paddingBottom:10,fontWeight:'bold',color:'gray'}}>Số điện thoại/gmail</Text>
        <TextInput
            style={styles.textInput}
            placeholder="Nhập số điện thoại/gmail của bạn"
            underlineColorAndroid="transparent"
            onChangeText={(text) => setUsername(text)}// Ẩn đường gạch dưới trên Android
        />
        <Text style={{ color: 'red' }}>{validateUser}</Text>
    </View>
    <View style={styles.input}>
        <Text style={{fontSize:15,paddingBottom:10,fontWeight:'bold',color:'gray'}}>Mật khẩu</Text>
        <TextInput
            style={styles.textInput}
            placeholder="Nhập mật khẩu của bạn"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.passwordVisibilityButton}
        >
            <Icon
                name={isPasswordVisible ? 'eye' : 'eye-slash'} // Chọn biểu tượng dựa trên trạng thái isPasswordVisible
                size={20}
                color="gray"
            />
        </TouchableOpacity>
        <Text style={{ color: 'red' }}>{validatePass}</Text>
    </View>
    <View style={styles.input}>
        <Text style={{fontSize:15,paddingBottom:2,fontWeight:'bold',color:'gray'}}>Nhập lại mật khẩu</Text>
        <TextInput
            style={styles.textInput}
            placeholder="Nhập lại mật khẩu của bạn"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={(text) => setPassword(text)}// Ẩn đường gạch dưới trên Android
        />
        <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.passwordVisibilityButton}
        >
            <Icon
                name={isPasswordVisible ? 'eye' : 'eye-slash'} // Chọn biểu tượng dựa trên trạng thái isPasswordVisible
                size={20}
                color="gray"
            />
        </TouchableOpacity>
        <Text style={{ color: 'red' }}>{rePassword}</Text>

    </View>
</View>
            <TouchableOpacity style={styles.btn_register} onPress={handleRegister}>
                    <Text style={styles.btn_txt}>ĐĂNG KÝ</Text>
            </TouchableOpacity>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom:180,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ctn: {
        width:370,
        marginTop:60,
    },

    btn_register: {
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
        marginBottom:5,
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
        width:240,
        height: 40,
        paddingBottom:10// Chiều cao của TextInput
    },
    passwordVisibilityButton: {
        position: 'absolute',
        right: 0,
        top: 20,
        padding: 5,
    },


});
