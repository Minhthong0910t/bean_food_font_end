import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList, Dimensions, ScrollView } from 'react-native'
import React from 'react'
const {width, height} = Dimensions.get('window')
const Oder = ({ navigation }) => {
    
    return (
        <SafeAreaView style={{ marginTop: 0, flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 100, backgroundColor: "white" }}>
                <TouchableOpacity style={{ marginRight: 'auto' }} onPress={() => navigation.goBack()}>
                    <Image source={require('./../Image/left_arrow.png')} style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', textAlign: 'center', flex: 1 }}>Đơn hàng </Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Đơn hàng của bạn</Text>
                <FlatList
             
                    
                />
                <View style={styles.total}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 5}}>
                        <Text>Đơn mua</Text>
                        <Text>45.000đ</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'  ,marginBottom: 5 }}>
                        <Text>Phí giao hàng</Text>
                        <Text>55.000d</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                        <Text>Khuyến mãi</Text>
                        <Text>0d</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{fontSize: 20}}>Tổng thanh toán</Text>
                        <Text style={{ fontSize: 20 }}>100.000d</Text>
                    </View>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default Oder

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    text: {
        fontSize: 15,
        color: '#868686',
        marginLeft: 20,
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
    button: {
        height: 50,
        marginHorizontal: 20,
        backgroundColor: '#22A45D',
        borderRadius: 8,
        justifyContent: 'center',
        marginTop: 30
    },
    item: {
        height: 68,
        marginHorizontal: 20,
        backgroundColor: '#F0F0F0',
        borderRadius: 5,
        marginBottom: 8,
        marginTop: 5
    },
    total:{
        height:132,
        backgroundColor:'#F0F0F0',
        paddingHorizontal:20,
        paddingTop: 10,
        paddingBottom:5
    }
})