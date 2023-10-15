import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList, Dimensions, ScrollView } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('window')
const Voucher = ({ navigation }) => {
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
                <Text style={{ fontWeight: 'bold', textAlign: 'center', flex: 1 }}>Voucher</Text>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.item}>
                                <View style={{ flexDirection: 'row' }}>

                                    <View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width-68, marginTop: 5 }}>
                                            <View>
                                                <Text style={{ alignSelf: 'flex-start', marginLeft: 5, marginTop: 5 }}>{item.name}</Text>
                                                <Text style={{ alignSelf: 'flex-start', marginLeft: 5, marginTop:10 }}>{item.date}</Text>
                                            </View>
                                            <TouchableOpacity style={{ alignSelf: 'center', width: 67, height: 30, 
                                            backgroundColor:'#FFAA00', justifyContent:'center',
                                            borderRadius:8
                                            }}
                                            >
                                                <Text style={{alignSelf:'center', color:'white'}}>
                                                    Sử dụng
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
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

export default Voucher

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
    total: {
        height: 132,
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 5
    }
})