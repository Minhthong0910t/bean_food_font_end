import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

export default function UserInfor() {
    const [userInfo, setUserInfo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUserInfo, setEditedUserInfo] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        // Lấy ID người dùng từ AsyncStorage
        getStoredUserId();
    }, []);

    const getStoredUserId = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            console.log(userId);
            if (userId) {
                // Gọi hàm để lấy thông tin người dùng dựa trên userId
                fetchUserInfo(userId);
            }
        } catch (error) {
            console.error('Lỗi khi lấy ID người dùng từ AsyncStorage:', error);
        }
    };

    const fetchUserInfo = async (userId) => {
        try {
            // Gọi API máy chủ để lấy thông tin người dùng
            const response = await fetch(`http://192.168.1.17:3000/api/users/info/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const userData = await response.json();
                setUserInfo(userData);
                setEditedUserInfo(userData);
            } else {
                console.error('Lỗi khi lấy thông tin người dùng từ máy chủ.');
            }
        } catch (error) {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
        }
    };

    const handleSaveChanges = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const userId = await AsyncStorage.getItem('userId');

            const updateData = {
                phone: editedUserInfo.phone,
                avatar: editedUserInfo.avatar,
                gender: editedUserInfo.gender,
                birthday: editedUserInfo.birthday,
            };

            // Cập nhật thông tin người dùng
            const response = await fetch(`http://192.168.1.17:3000/api/users/update/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updateData),
            });

            if (response.status === 200) {
                Alert.alert('Thông báo', 'Cập nhật thông tin thành công');
                setIsEditing(false); // Kết thúc chỉnh sửa
                fetchUserInfo(userId); // Tải lại thông tin sau khi lưu
            } else {
                Alert.alert('Lỗi', 'Cập nhật thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật:', error);
        }
    };

    return (
        <View style={styles.container}>
            {userInfo ? (
                <>
                    <Text>Tên: {userInfo.username}</Text>
                    {userInfo.avatar && <Image source={{ uri: userInfo.avatar }} style={styles.avatarImage} />}
                    {isEditing ? (
                        <TextInput
                            value={editedUserInfo.gender}
                            onChangeText={(text) => setEditedUserInfo({ ...editedUserInfo, gender: text })}
                        />
                    ) : (
                        <Text>Giới tính: {userInfo.gender}</Text>
                    )}
                    {isEditing ? (
                        <TextInput
                            value={editedUserInfo.birthday}
                            onChangeText={(text) => setEditedUserInfo({ ...editedUserInfo, birthday: text })}
                        />
                    ) : (
                        <Text>Ngày sinh: {userInfo.birthday}</Text>
                    )}
                    {isEditing ? (
                        <TextInput
                            value={editedUserInfo.phone}
                            onChangeText={(text) => setEditedUserInfo({ ...editedUserInfo, phone: text })}
                        />
                    ) : (
                        <Text>Số điện thoại: {userInfo.phone}</Text>
                    )}
                    {isEditing ? (
                        <Button title="Lưu" onPress={handleSaveChanges} style={styles.btn} />
                    ) : (
                        <Button title="Chỉnh sửa" onPress={() => setIsEditing(true)} style={styles.btn} />
                    )}
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
        justifyContent: 'center',
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
