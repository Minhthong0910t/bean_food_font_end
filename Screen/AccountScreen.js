import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default function AccountScreen() {

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View>
                    <Image style={{width:84,height:83}} source={require('./../Image/user.png')}/>
                </View>
                <View style={styles.profile}>
                    <Text style={styles.name}>Đinh Thành Huân</Text>
                    <Text style={styles.edit}>Chỉnh sửa</Text>
                </View>

            </View>

            <View style={styles.list}>
                <View style={styles.underline}></View>
                <Text style={styles.text}>Đơn hàng</Text>
                <Text style={styles.text}>Vouchers</Text>
                <Text style={styles.text}>Lịch sử</Text>
                <Text style={styles.text}>Ví liên kết</Text>
                <Text style={styles.text}>Đăng xuất</Text>
            </View>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection:'column'
    },
    header:{
        flex:1,
        flexDirection:'row',
        marginTop:40,
        marginLeft:20,

    },
    profile:{
        paddingLeft:30
    },
    name:{
        fontSize:25,
        color:'#616161',
        fontFamily:'Roboto',
        fontWeight:'bold'
    },
    edit:{
        fontSize:15,
        color:'grey',
        marginTop:6
    },
    list:{
        flexDirection:'column',
        paddingBottom:350,
        paddingLeft:20

    },
    underline:{
        width: 500, // Chiều rộng tương đương với văn bản
        borderBottomWidth: 1, // Độ rộng của đường viền mờ
        borderColor: 'rgba(0, 0, 0, 0.2)', // Màu của đường viền mờ

    },
    text:{
        fontSize:20,
        fontWeight:'bold',
        color:'#616161',
        marginTop:40
    }



});
