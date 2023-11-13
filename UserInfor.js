import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Alert,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function UserInfor() {
    const [userInfo, setUserInfo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUserInfo, setEditedUserInfo] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        getStoredUserId();
    }, []);

    const getStoredUserId = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (userId) {
                fetchUserInfo(userId);
            }
        } catch (error) {
            console.error('Lỗi khi lấy ID người dùng từ AsyncStorage:', error);
        }
    };

    const fetchUserInfo = async (userId) => {
        try {
            const response = await fetch(
                `http://192.168.1.12:3000/api/users/info/${userId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

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

            const response = await fetch(
                `http://192.168.1.12:3000/api/users/update/${userId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updateData),
                }
            );

            if (response.status === 200) {
                Alert.alert('Thông báo', 'Cập nhật thông tin thành công');
                setIsEditing(false);
                fetchUserInfo(userId);
            } else {
                Alert.alert('Lỗi', 'Cập nhật thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật:', error);
        }
    };

    const fieldsToDisplay = [
        { key: 'username', label: 'Tên người dùng' },
        { key: 'phone', label: 'Số điện thoại' },
        { key: 'gender', label: 'Giới tính' },
        { key: 'birthday', label: 'Ngày sinh' },
    ];

    return (
        <View style={styles.container}>
            {userInfo ? (
                <View style={styles.horizontalContainer}>
                    <View style={styles.avatarContainer}>
                        {editedUserInfo.avatar ? (
                            <Image
                                source={{ uri: editedUserInfo.avatar }}
                                style={styles.avatarImage}
                            />
                        ) : null}
                    </View>
                    <View style={styles.infoContainer}>
                        {fieldsToDisplay.map((field) => (
                            <View key={field.key} style={styles.textInfo}>
                                <Text style={{ color: 'gray', fontSize: 15, marginTop: 10 }}>
                                    {field.label}
                                </Text>
                                {isEditing ? (
                                    <TextInput
                                        style={[
                                            styles.infoTextInput,
                                            { borderBottomWidth: 0 },
                                        ]}
                                        value={editedUserInfo[field.key]}
                                        onChangeText={(text) =>
                                            setEditedUserInfo({
                                                ...editedUserInfo,
                                                [field.key]: text,
                                            })
                                        }
                                        underlineColorAndroid="transparent"
                                    />
                                ) : (
                                    <Text style={styles.text}>{userInfo[field.key]}</Text>
                                )}
                            </View>
                        ))}

                        <View style={styles.textInfo}>
                            <Text style={{ color: 'gray', fontSize: 15, marginTop: 10 }}>
                                Xác minh thông tin
                            </Text>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => setIsEditing(!isEditing)}
                            >
                                <Text style={{ fontSize: 20, color: '#ff0000' }}>
                                    {isEditing ? 'Hủy' : 'Chỉnh sửa thông tin'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ) : (
                <Text>Đang tải thông tin...</Text>
            )}

            {isEditing && (
                <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                    <Text style={styles.buttonText}>LƯU</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 630,
        elevation: 2,
        margin: 20,
        paddingTop: 30,
    },
    textInfo: {
        borderBottomWidth: 0.3,
        borderBottomColor: 'gray',
        paddingBottom: 10,
        marginBottom: 10,
        backgroundColor: '#f1f8fc',
        width: 480,
        height: 80,
    },
    horizontalContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 50,
    },
    avatarContainer: {
        width: '100%',
    },
    avatarImage: {
        width: 150,
        height: 150,
        borderRadius: 50,
        margin: 10,
    },
    text: {
        fontSize: 20,
        paddingBottom: 5,
        fontWeight: 'normal',
    },
    infoContainer: {
        marginTop: 30,
        margin: 10,
    },
    infoTextInput: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        //borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        //borderRadius: 15,
        fontWeight: '100',
    },
    button: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#319AB4',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    btn: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
});
