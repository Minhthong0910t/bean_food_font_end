import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import AccountScreen from "./Screen/AccountScreen";
import HistoryScreen from "./Screen/HistoryScreen";
import AppNavigator from './Screen/AppNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import SearchComponent from './Component/SearchComponent';
import GanbanComponent from './Component/GanbanComponent';
import ComxuatComponent from './Component/ComxuatComponent';
import BunPhoComponent from './Component/BunPhoComponent';
import ChickenComponent from './Component/ChickenComponent';
import AnVatComponent from './Component/AnVatComponent';
import DoUongComponent from './Component/DoUongComponent';
import BanhMiComponent from './Component/BanhMiComponent';
import HealthyComponent from './Component/HealthyComponent';
import ProductDetailScreen from './Screen/ProductDetailScreen';
import { CartProvider } from './Component/CartContext';
import PayScreen from './Screen/PayScreen';
import ProfileInfor from './profile/ProfileInfor';
import UserInfor from "./UserInfor";
import Voucher from './profile/Voucher';
import History from './profile/History';
import Payment from './profile/Payment';
import { AuthProvider } from './AuthContext';
import { Provider } from 'react-redux';
import store from './Redux/StoreAddToCart';
import SplashScreen from './Screen/SplashScreen';
import PaymentScreen from './Service/PaymentScreen';
import RestaurantScreen from './Screen/RestaurantScreen';
import AllRestaurnat from './Screen/AllRestaurnat';
import ProductsFavorite from './Screen/ProductsFavorite';
import AllProducts from './Screen/AllProducts';
import Detailhistory from './profile/Detailhistory';


const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>

                <CartProvider>
                    <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
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
                        <Stack.Screen name="PayScreen" component={PayScreen} options={{ title: 'Thanh toán' }} />

                        <Stack.Screen name='Appnavigator' component={AppNavigator} />
                        <Stack.Screen component={SearchComponent} name='Search' />
                        <Stack.Screen component={GanbanComponent} name='Ganban' />
                        <Stack.Screen component={ComxuatComponent} name='Comxuat' />
                        <Stack.Screen component={BunPhoComponent} name='BunPho' />
                        <Stack.Screen component={ChickenComponent} name='Chicken' />
                        <Stack.Screen component={AnVatComponent} name='AnVat' />
                        <Stack.Screen component={DoUongComponent} name='DoUong' />
                        <Stack.Screen component={BanhMiComponent} name='BanhMi' />
                        <Stack.Screen component={HealthyComponent} name='Healthy' />
                        <Stack.Screen component={ProductDetailScreen} name='ProductDetail' options={{ title: 'Chi tiết sản phẩm' }} />
                        <Stack.Screen component={ProfileInfor} name='ProfileInfor' />
                        <Stack.Screen component={Voucher} name='Voucher' />
                        <Stack.Screen component={History} name='lichsu' />
                        <Stack.Screen component={Payment} name='Payment' />
                        <Stack.Screen component={ProductsFavorite} name='ProductFavoriteScreen' />
                        <Stack.Screen component={UserInfor} name='UserInfor' />
                        <Stack.Screen component={SplashScreen} name='SplashScreen' />
                        <Stack.Screen component={AllProducts} name='AllProducts' />
                        <Stack.Screen component={Detailhistory} name='Detailhistory' />
                        <Stack.Screen component={RestaurantScreen} name='Restaurant'     screenOptions={{
      unmountOnBlur: true,
    }} />
    
                        <Stack.Screen component={PaymentScreen} name='PaymentScreen' />
                        <Stack.Screen component={AllRestaurnat} name='AllRestaurant' />


                    </Stack.Navigator>
                </CartProvider>
            </NavigationContainer>
        </Provider>
    );
}
