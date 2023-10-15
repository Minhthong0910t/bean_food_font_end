import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window')
const Payment = ({ navigation }) => {

    return (
        <SafeAreaView style={{ marginTop: 0, flex: 1 , backgroundColor:'white' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 100, backgroundColor: "white" }}>
                <TouchableOpacity style={{ marginRight: 'auto' }} onPress={() => navigation.goBack()}>
                    <Image source={require('./../Image/left_arrow.png')} style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', textAlign: 'center', flex: 1 }}>Payment</Text>
            </View>
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 30
                }}>

                    <View style={{
                        flexDirection: 'row',

                    }}>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={{ uri: 'https://th.bing.com/th?id=OIP.WX6gmydfc72tUO6X-C1MswHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2' }}
                        />
                        <View style={{ alignSelf: 'center', marginLeft: 5 }}>
                            <Text>LiliPay</Text>
                            <Text>****270208</Text>
                        </View>

                    </View>
                    <Text style={{ alignSelf: 'center' }}>{'>'}</Text>
                </View>

            </View>
            <TouchableOpacity style={{ height: 50, backgroundColor:'#FFAA00' , marginHorizontal: 70 , marginTop: 20, justifyContent:'center'}}>
                <Text style={{alignSelf:'center' , color:'white', fontSize: 20}}>
                    Thêm liên kết
                </Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default Payment

const styles = StyleSheet.create({
    container: {
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
    content: {
        flexDirection: 'row',
        backgroundColor: '#d3d3d3',
        height: 190,
        padding: 20,
        marginBottom: 25,
        margin: 20,
        justifyContent: 'space-between'
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