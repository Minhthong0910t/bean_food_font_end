import { View , StyleSheet, Image} from 'react-native';
import React, { useEffect, useState, } from 'react';

const SplashScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            handleLogin();
        }
    }, [isLoading, navigation]);

    const handleLogin = async () => {
        navigation.navigate('Appnavigator');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../Image/logo1.png')} style={styles.logo} />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logo: {
        alignSelf: 'center',
    },
});