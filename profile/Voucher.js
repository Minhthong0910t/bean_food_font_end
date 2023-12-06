import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { URL } from '../const/const';
import ToolBar from '../components/ToolBar';
import Icon from 'react-native-vector-icons/FontAwesome'; // Đảm bảo bạn đã cài đặt thư viện này

const Voucher = ({ navigation }) => {
    

    return (
        <SafeAreaView style={styles.container}>
            <ToolBar title="Voucher" onBackPress={() => navigation.goBack()} />
            <View style={styles.warningContainer}>
                <Icon name="exclamation-triangle" size={24} color="#FFCC00" />
                <Text style={styles.warningText}>Hiện tại chưa áp dụng chương trình khuyến mãi</Text>
            </View>     
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    warningContainer: {
        flexDirection: 'row', // Chỉnh các item nằm trên cùng một dòng
        alignItems: 'center', // Căn giữa các item theo chiều dọc
        padding: 10, // Padding cho container
        backgroundColor: '#FFFBEA', // Một màu nền nhẹ cho cảnh báo
        margin: 10, // Margin cho container
        borderRadius: 5, // Bo tròn các góc của container
    },
    warningText: {
        marginLeft: 10, // Khoảng cách giữa icon và text
        color: '#555', // Màu cho text
        fontSize: 16, // Cỡ chữ cho text
    },
    // Các styles khác của bạn
});

export default Voucher;
