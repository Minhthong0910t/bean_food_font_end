import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import AccountScreen from "./AccountScreen";
import HistoryScreen from "./HistoryScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="History"
                    component={HistoryScreen}
                    options={{ title: 'Lịch sử' }}
                />
                <Stack.Screen
                    name="Account"
                    component={AccountScreen}
                    options={{ title: 'Tài khoản của tôi' }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ title: 'HELLO' }}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ title: 'Đăng ký' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
