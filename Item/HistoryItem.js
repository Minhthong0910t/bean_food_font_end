import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HistoryItem = ({ item }) => {
    // Tạo một chuỗi các tên món ăn, cách nhau bởi dấu phẩy
    const productNames = item.products.map(product => product.name).join(', ');
    const formatTime = (timeString) => {
        const date = new Date(timeString);
        const formattedTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        return `${formattedTime} ${formattedDate}`;
    };
    const getStatusText = (status) => {
        switch (status) {
            case 0:
                return 'Đang xử lý';
            case 1:
                return 'Đang giao';
            case 2:
                return 'Đã giao';
            default:
                return 'Trạng thái không xác định';
        }
    };

    return (
        <View style={styles.item}>
            <Text style={styles.name}>{productNames}</Text>
            <Text style={styles.detail}>Thời gian: {formatTime(item.time)}</Text>
            <Text style={styles.detail}>Phương thức thanh toán: {item.phuongthucthanhtoan}</Text>
            <Text style={styles.detail}>Trạng thái: {getStatusText(item.status)}</Text>
            <TouchableOpacity style={styles.button} onPress={() => {/* Thêm hành động khi nhấn nút */}}>
                <Text style={styles.buttonText}>Đặt lại</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10, // Thêm margin dưới để tạo khoảng cách giữa tên món ăn và chi tiết
    },
    detail: {
        fontSize: 14,
        color: '#555',
    },
    button: {
        marginTop: 10,
        backgroundColor: '#ffa500',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    }
});

export default HistoryItem;
