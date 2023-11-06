import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Image, Button, TextInput, Alert, TouchableOpacity} from 'react-native';
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
            const response = await fetch(`http://192.168.1.15:3000/api/users/info/${userId}`, {
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
            const response = await fetch(`http://192.168.1.15:3000/api/users/update/${userId}`, {
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
                    {isEditing ? (
                        <View style={styles.horizontalContainer}>
                            <View style={styles.avatarContainer}>

                                {editedUserInfo.avatar ? (
                                    <Image source={{ uri: editedUserInfo.avatar }} style={styles.avatarImage} />
                                ) : null}
                            </View>
                            <View style={styles.infoContainer}>
                                <TextInput
                                    style={styles.infoTextInput}
                                    value={editedUserInfo.gender}
                                    onChangeText={(text) => setEditedUserInfo({ ...editedUserInfo, gender: text })}
                                />
                                <TextInput
                                    style={styles.infoTextInput}
                                    value={editedUserInfo.avatar}
                                    onChangeText={(text) => setEditedUserInfo({ ...editedUserInfo, avatar: text })}
                                />
                                <TextInput
                                    style={styles.infoTextInput}
                                    value={editedUserInfo.birthday}
                                    onChangeText={(text) => setEditedUserInfo({ ...editedUserInfo, birthday: text })}
                                />
                                <TextInput
                                    style={styles.infoTextInput}
                                    value={editedUserInfo.phone}
                                    onChangeText={(text) => setEditedUserInfo({ ...editedUserInfo, phone: text })}
                                />
                            </View>
                        </View>
                    ) : (
                        <View style={styles.horizontalContainer}>
                            <View style={styles.avatarContainer}>
                                {editedUserInfo.avatar ? (
                                    <Image source={{ uri: editedUserInfo.avatar }} style={styles.avatarImage} />
                                ) : null}
                            </View>
                            <View style={styles.infoContainer}>
                                <Text style={styles.text}>Tên người dùng: {userInfo.username}</Text>
                                <Text style={styles.text}>Giới tính: {userInfo.gender}</Text>
                                <Text style={styles.text}>Ngày sinh: {userInfo.birthday}</Text>
                                <Text style={styles.text}>Số điện thoại: {userInfo.phone}</Text>
                            </View>
                        </View>
                    )}

                    {isEditing ? (
                        <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                            <Text style={styles.buttonText}>Lưu</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
                            <Text style={styles.buttonText}>Cập nhật thông tin</Text>
                        </TouchableOpacity>
                        // <TouchableOpacity title="Chỉnh sửa" onPress={() => setIsEditing(true)} style={styles.btn} />
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
        marginTop: 50,

    },
    horizontalContainer: {
        flexDirection: 'row', // Đặt chiều ngang
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#DFE0EB',
        borderRadius: 20,
    },
    avatarContainer: {
        alignItems: 'center',
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 10,
    },
    text:{
        fontSize:18,
        paddingBottom:5
    },
    avatarTextInput: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 10,
    },
    infoContainer: {
        flex: 1, // Chia tỷ lệ 1:1 giữa các phần tử con
        marginLeft: 20,

    },
    infoTextInput: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 15,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#319AB4',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        marginTop: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

});
