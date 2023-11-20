
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileInfor() {
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [isProfileLoaded, setIsProfileLoaded] = useState(false);

    useEffect(() => {
        // Lấy thông tin người dùng từ AsyncStorage nếu đã tồn tại
        getStoredUserData();
    }, []);

    const getStoredUserData = async () => {
        try {
            const storedPhone = await AsyncStorage.getItem('phone');
            const storedAvatar = await AsyncStorage.getItem('avatar');
            const storedGender = await AsyncStorage.getItem('gender');
            const storedBirthday = await AsyncStorage.getItem('birthday');

            if (storedPhone) {
                setPhone(storedPhone);
            }
            if (storedAvatar) {
                setAvatar(storedAvatar);
            }
            if (storedGender) {
                setGender(storedGender);
            }
            if (storedBirthday) {
                setBirthday(storedBirthday);
            }

            setIsProfileLoaded(true);
        } catch (error) {
            console.error('Lỗi khi lấy thông tin từ AsyncStorage:', error);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('username');
            const userId = await AsyncStorage.getItem('userId');

            const updateData = {
                phone,
                avatar,
                gender,
                birthday,
            };

            // cập nhật thông tin người dùng
            const response = await fetch(URL+'api/users/update/${userId}', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updateData),
            });

            if (response.status === 200) {
                Alert.alert('Thông báo', 'Cập nhật thông tin thành công');
            } else {
                Alert.alert('Lỗi', 'Cập nhật thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật:', error);
        }
    };

    return (
        <View style={styles.container}>
            {isProfileLoaded ? (
                <>
                    <TextInput
                        placeholder="Số điện thoại"
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Avatar URL"
                        value={avatar}
                        onChangeText={(text) => setAvatar(text)}
                        style={styles.input}
                    />
                    {avatar ? <Image source={{ uri: avatar }} style={styles.avatarImage} /> : null}
                    <TextInput
                        placeholder="Giới tính"
                        value={gender}
                        onChangeText={(text) => setGender(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Ngày sinh"
                        value={birthday}
                        onChangeText={(text) => setBirthday(text)}
                        style={styles.input}
                    />
                    <Button title="Cập nhật thông tin" onPress={handleUpdateProfile} style={styles.btn} />
                </>
            ) : (
                <Text>Đang tải thông tin...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 15,
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 10,
    },
    btn: {
        backgroundColor: '#319AB4',
    },
});
