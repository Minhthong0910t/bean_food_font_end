import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList, Dimensions, ScrollView } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('window')
const History = ({ navigation }) => {
    const data = [
        {

            name: 'Giảm 25k cho đơn từ 50k',
            date: 'HSD:  16/12/2020',

        },
        {

            name: 'Giảm 25k cho đơn từ 50k',
            date: 'HSD:  16/12/2020',

        },
        {

            name: 'Giảm 25k cho đơn từ 50k',
            date: 'HSD:  16/12/2020',

        },

        {

            name: 'Giảm 25k cho đơn từ 50k',
            date: 'HSD:  16/12/2020',

        },
        {

            name: 'Giảm 25k cho đơn từ 50k',
            date: 'HSD:  16/12/2020',

        },
        {

            name: 'Giảm 25k cho đơn từ 50k',
            date: 'HSD:  16/12/2020',

        },



    ]
    return (
        <SafeAreaView style={{ marginTop: 0, flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 100, backgroundColor: "white" }}>
                <TouchableOpacity style={{ marginRight: 'auto' }} onPress={() => navigation.goBack()}>
                    <Image source={require('./../Image/left_arrow.png')} style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', textAlign: 'center', flex: 1 }}>History</Text>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.item}>
                                <View style={styles.content}>
                                    <View style={styles.text}>
                                        <Text style={{ color: '#616161', fontSize: 25 }}>The Coffe House</Text>
                                        <Text style={{ fontSize: 16, color: '#616161', marginTop: 10 }}>Chi tiết</Text>
                                        <Text style={{ fontSize: 16, color: '#616161', marginTop: 10 }}>Thời gian</Text>
                                        <Text style={{ color: '#616161', fontSize: 16, marginTop: 10 }}>Đã hoàn thành</Text>
                                    </View>
                                    <View style={styles.let}>
                                        <TouchableOpacity
                                            style={styles.button}
                                        >
                                            <Text style={styles.buttonText}>Đặt lại</Text>
                                        </TouchableOpacity>
                                        <Text style={{ marginTop: 40, color: '#616161', fontSize: 16 }}>10/11/2023</Text>
                                        <Text style={{ marginTop: 15, fontSize: 16, color: '#616161' }}>100.000đ</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />

            </View>

        </SafeAreaView>
    )
}

export default History

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    text: {
        fontSize: 15,
        color: '#868686',
        marginTop: 10
    },
    textInput: {
        marginHorizontal: 20,
        marginVertical: 10
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: 'gray',
        marginHorizontal: 20
    },
    // button: {
    //     height: 50,
    //     marginHorizontal: 20,
    //     backgroundColor: '#22A45D',
    //     borderRadius: 8,
    //     justifyContent: 'center',
    //     marginTop: 30
    // },
    item: {
      
    },
    total: {
        height: 132,
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 5
    },
    content:{
        flexDirection: 'row',
        backgroundColor: '#d3d3d3',
        height: 190,
        padding: 20,
        marginBottom: 25,
        margin: 20,
        justifyContent:'space-between'
    },
    let: {
        paddingLeft: 10,

    },
    button: {
        alignItems: 'center',
        backgroundColor: '#ffa500', // Màu nền của nút
        padding: 10,
        borderRadius: 5,
        marginTop: 2

    },
    buttonText: {
        fontSize: 14,
        color: 'white', // Màu chữ
    },
})