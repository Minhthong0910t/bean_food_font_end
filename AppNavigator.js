import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import OrderScreen from './OrderScreen';
import NotificationScreen from './NotificationScreen';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import biểu tượng
import Home from './Component/Home';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={20} color="brown" /> // Đặt màu nâu và kích thước 20
          ),
          headerShown: false, // Đặt giá trị này ở đây để ẩn tiêu đề của màn hình Home
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-cart" size={20} color="brown" /> // Đặt màu nâu và kích thước 20
          ),
          headerShown: false, // Đặt giá trị này ở đây để ẩn tiêu đề của màn hình Home
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="bell" size={20} color="brown" /> // Đặt màu nâu và kích thước 20
          ),
          headerShown: false, // Đặt giá trị này ở đây để ẩn tiêu đề của màn hình Home
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={20} color="brown" /> // Đặt màu nâu và kích thước 20
          ),
          headerShown: false, // Đặt giá trị này ở đây để ẩn tiêu đề của màn hình Profile
        }}
      />
    
    </Tab.Navigator>
  );
};

export default AppNavigator;
