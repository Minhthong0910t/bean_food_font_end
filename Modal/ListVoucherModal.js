import { Modal, View, Text, TouchableOpacity, StyleSheet , ScrollView , Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react'
const { width, height } = Dimensions.get('window');
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
const ListVoucherModal = ({visible ,products  , setisvisible, navigation  , totals , onConfirmVoucher , onConfirmIDVoucher}) => {
  const [datadiscount , setdatadiscount] = useState({})

    const getdatadiscount = async (data)=>{
     
      const storedData = await AsyncStorage.getItem('_id'); 
        console.log("data fdsfdsfu" , data.idUser);

        const   checkuid  =  data.idUser.includes(storedData)
      setdatadiscount(data)
      if(data.quantity==0){
        Toast.show({
          type: 'error',
          text1: 'Thông báo!',
          text2: 'Số lượng voucher đã hết',
        });
        setisvisible(false)
        onConfirmVoucher(0)
        onConfirmIDVoucher("")
        return
      }
      if(checkuid){
        Toast.show({
          type: 'error',
          text1: 'Thông báo!',
          text2: 'Bạn đã sử dụng Voucher này rồi',
        });

        setisvisible(false)
        onConfirmVoucher(0)
        onConfirmIDVoucher("")
        return
      }else{
        if(data.limit<=totals){
          setisvisible(false)
          onConfirmVoucher(data.money)
          onConfirmIDVoucher(data._id)
          console.log("data money" , data.money);
        }else{
          Toast.show({
            type: 'error',
            text1: 'Thông báo!',
            text2: 'Đơn hàng không đủ điều kiện sử dụng voucher',
          });
          setisvisible(false)
          onConfirmVoucher(0)
          onConfirmIDVoucher("")
        }
      }
      
      
      }
    
  return (
    <Modal   animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={() => setisvisible(false)}>

     <View style = {styles.modalOverlay}>
  <View style = {styles.modalView}>

  <View >
   < ScrollView    showsVerticalScrollIndicator={false}>
     {products.map((data , index)=>
     <View key={index} style={{width:0.72*width , height:0.08*height ,  backgroundColor:'#F0F0F0' ,  borderWidth:1 ,  alignItems:'center', justifyContent:'center',     marginRight:15,   marginTop:10, borderRadius:10}}>
     <View style = {{flexDirection:'row'  ,justifyContent:'space-around' }}>
       <View style={{flexDirection:'column' }}>

         <Text style={{fontWeight:'bold',color:'#616161'}}>Giảm {Math.round(data.money / 1000)}k cho đơn từ { Math.round(data.limit / 1000)}k</Text>
         <Text style={{  fontWeight:'bold' ,color:'#616161'}}>HSD: {moment(data.HSD).format('DD/MM/YYYY')}</Text>
       </View>

       <TouchableOpacity onPress={()=>getdatadiscount(data)} style={{width:60, height:40 , borderRadius:10, marginLeft:20, alignItems:'center' , justifyContent:'center' , backgroundColor:'#319AB4'}}>
        <Text style = {{color:'white' , fontWeight:'bold'}}> Áp dụng</Text>
       </TouchableOpacity>
     </View>
   </View>
   )}
    </ScrollView>
    </View>
  </View>
     </View>
  
  </Modal>
  )
}

export default ListVoucherModal

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
        
      },
      modalView: { 
        
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        alignItems: 'center',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxWidth: '90%', // Đảm bảo modal không chiếm toàn bộ chiều rộng
      },
})