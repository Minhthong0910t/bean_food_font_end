import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HistoryItem from '../Item/HistoryItem';
import { URL } from '../const/const';
import ToolBar from '../components/ToolBar';

const History = ({ navigation }) => {
    const [historyData, setHistoryData] = useState([]);
    const [dataUid, setDataUid] = useState('');

    // Lấy userId từ AsyncStorage
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const userId = await AsyncStorage.getItem('_id');
                if (userId !== null) {
                    setDataUid(userId);
                }
            } catch (error) {
                console.error('Error fetching userId:', error);
            }
        };
        fetchUserId();
    }, []);

    // Fetch lịch sử mua hàng và lọc dữ liệu trên client
    useEffect(() => {
        const fetchDataHistory = async () => {
            try {
                const response = await fetch(URL+'api/history');
                const data = await response.json();
                const filteredData = data.filter(item => item.userId === dataUid);
                setHistoryData(filteredData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (dataUid) {
            fetchDataHistory();
        }
        console.log("ls", historyData);
    }, [dataUid]);

    return (
        <SafeAreaView style={styles.container}>
        <ToolBar 
                title="Lịch Sử Mua Hàng" 
                onBackPress={() => navigation.goBack()} 
            />
            <FlatList
                data={historyData}
                renderItem={({ item }) => <HistoryItem item={item} />}
                keyExtractor={item => item._id.toString()} // Giả định mỗi item có một trường _id là duy nhất
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    // Các styles khác của bạn
});

export default History;
