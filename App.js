import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import AppNavigator from './AppNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
        
            <AppNavigator/>
            {/* <Stack.Navigator initialRouteName="Login">
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
            </Stack.Navigator> */}
        </NavigationContainer>
    );
}
