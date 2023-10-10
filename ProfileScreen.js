import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <View style={styles.userInfo}>
            <Image
              source={require('./Image/logo_bean.png')}
              style={styles.userImage}
            />
            <Text style={styles.username}>JohnDoe</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.link}>Đăng ký</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.link}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containers}>
            <TouchableOpacity style={styles.menuItem}>
                <Icon name="user" size={20} color="black" style={styles.icon} />
                <Text style={styles.menuText}>Thông tin cá nhân</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <Icon name="history" size={20} color="black" style={styles.icon} />
                <Text style={styles.menuText}>Lịch sử mua hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <Icon name="cog" size={20} color="black" style={styles.icon} />
                <Text style={styles.menuText}>Cài đặt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <Icon name="question" size={20} color="black" style={styles.icon} />
                <Text style={styles.menuText}>Trung tâm trợ giúp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <Icon name="info" size={20} color="black" style={styles.icon} />
                <Text style={styles.menuText}>Về BeanFood</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton}>
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
  containers:{
    flex:1,
    padding:5
  },
  header: {
    height: 180,
    backgroundColor: 'orange',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
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
    backgroundColor: 'red',
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
