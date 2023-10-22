import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from "@react-navigation/native";


const ProfileScreen = () => {

  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigation = useNavigation();


  useEffect(() => {
    const getStoredUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
          setIsLoggedIn(true); // Đã đăng nhập
        }
      } catch (error) {
        console.error('Lỗi khi truy xuất tên người dùng đã lưu:', error);
      }
    };
    getStoredUsername();
  }, []);

  const handleLogin = () => {
    navigation.navigate('Login');
  }
  const handleLogout = () =>{
    AsyncStorage.clear();
    navigation.replace('Login');
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={require('./Image/user.png')}
            style={styles.userImage}
          />
          <View>
            <Text style={styles.username}>Xin chào: {username}</Text>
          </View>
          {isLoggedIn ? null : (
          <View style={styles.btnlogin}>
            <Button
                title="Đăng nhập"
                onPress={handleLogin}
                color="#319AB4"
            />
          </View>
          )}

        </View>
      </View>
      <View style={styles.containers}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ProfileInfor')}>
          <Icon name="user" size={20} color="black" style={styles.icon} />
          <Text style={styles.menuText}>Thông tin cá nhân</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Oder')}>
          <Icon name="history" size={20} color="black" style={styles.icon} />
          <Text style={styles.menuText}>Lịch sử mua hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Voucher')} >
          <Icon name="cog" size={20} color="black" style={styles.icon} />
          <Text style={styles.menuText}>Voucher</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('lichsu')}>
          <Icon name="question" size={20} color="black" style={styles.icon} />
          <Text style={styles.menuText}>Lịch sử</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Payment')}>
          <Icon name="info" size={20} color="black" style={styles.icon} />
          <Text style={styles.menuText}>Ví liên kết</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} >
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containers: {
    padding: 5
  },
  header: {
    height: 130,
    backgroundColor: 'white',
    marginBottom: 8,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    width: '100%'

  },
  btnlogin:{
    marginLeft:170
  },

  edit: {
    fontSize: 12,
    color: '#ABABAB'
  },
  loginButton:{
      backgroundColor: '#FFAA00',
      padding: 16,
      marginBottom: 8,
      borderRadius: 8,
      elevation: 2,

  },
  topRow: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  actions: {
    marginLeft: 150,
    marginBottom: 20,
    flexDirection: 'row',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:20
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 20,
    alignSelf: 'center'
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  link: {
    fontSize: 16,
    marginHorizontal: 8,
    color: 'black',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  logoutButton: {
    backgroundColor: '#FFAA00',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  logoutButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default ProfileScreen;
