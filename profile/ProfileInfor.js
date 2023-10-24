import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// Default avatar image URL
const defaultAvatarUrl = 'https://tse2.mm.bing.net/th?id=OIP.U096knBymS0Oz-4PAvxH7AHaHa&pid=Api&P=0&h=180';

const ProfileInfor = () => {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState({
        sdt: '',
        avatar: '',
        gender: '',
        birthdate: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('username');
                const token2 = await AsyncStorage.getItem('userId');
                if (token) {
                    setUsername(token);
                    fetchUserInfo(token);
                    console.log("username   "+ token);
                    console.log("username   "+ token2);
                } else {
                    navigation.replace('Login');
                }
            } catch (error) {
                console.error('Lỗi khi kiểm tra trạng thái đăng nhập:', error);
            }
        };

        checkLoginStatus();
    }, []);

    const fetchUserInfo = (token) => {
        fetch(`http://example.com/api/user-info?token=${token}`)
            .then(async (res) => {
                if (res.status === 200) {
                    const userInfo = await res.json();
                    setUsername(userInfo.username);
                    setUserData({
                        sdt: userInfo.sdt || '',
                        avatar: userInfo.avatar || '', // Use the user's avatar or the default
                        gender: userInfo.gender || '',
                        birthdate: userInfo.birthdate || '',
                    });
                }
            })
            .catch((error) => {
                console.error('Lỗi khi lấy thông tin người dùng:', error);
            });
    };

    const handleUpdateUserData = async () => {
        try {
            const token = await AsyncStorage.getItem('username');
            const updateData = {
                sdt: userData.sdt,
                avatar: userData.avatar,
                gender: userData.gender,
                birthdate: userData.birthdate,
            };
            const response = await fetch('http://234324234/api/updateUserData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updateData),
            });

            if (response.status === 200) {
                setIsEditing(false);
                Alert.alert('Thông báo', 'Cập nhật thành công');
            } else {
                Alert.alert('Lỗi', 'Cập nhật thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: userData.avatar || defaultAvatarUrl }}
                    style={styles.avatar}
                />
                <View style={styles.info}>
                    <Text style={styles.usernameText}>Tên đăng nhập: {username}</Text>
                    {isEditing && (
                        <TextInput
                            placeholder="Avatar URL"
                            value={userData.avatar}
                            onChangeText={(text) => setUserData({ ...userData, avatar: text })}
                            style={styles.input}
                            editable={isEditing}
                        />
                    )}
                    <TextInput
                        placeholder="Số điện thoại"
                        value={userData.sdt}
                        onChangeText={(text) => setUserData({ ...userData, sdt: text })}
                        style={styles.input}
                        editable={isEditing}
                    />
                    <TextInput
                        placeholder="Giới tính"
                        value={userData.gender}
                        onChangeText={(text) => setUserData({ ...userData, gender: text })}
                        style={styles.input}
                        editable={isEditing}
                    />
                    <TextInput
                        placeholder="Ngày sinh"
                        value={userData.birthdate}
                        onChangeText={(text) => setUserData({ ...userData, birthdate: text })}
                        style={styles.input}
                        editable={isEditing}
                    />
                </View>
                <View style={styles.buttonEdit}>
                    {isEditing ? (
                        <Button title="Lưu" onPress={handleUpdateUserData} style={styles.btn} />
                    ) : (
                        <Button title="Chỉnh sửa thông tin" onPress={() => setIsEditing(true)} style={styles.btn} />
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 70,
        flex: 1,
        alignItems: 'flex-start',
    },
    header: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 10,
    },
    info: {
        flexDirection: 'column',
        marginLeft: 10,
    },
    input: {
        marginTop: 10,
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 15,
    },
    buttonEdit: {
        marginTop: 20,
        marginLeft: 40,
        borderRadius: 10,
    },
    usernameText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray',
    },
    btn: {
        backgroundColor: '#319AB4',
    },
});

export default ProfileInfor;
