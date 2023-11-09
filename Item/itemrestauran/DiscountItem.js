import { StyleSheet, Text, View  , Dimensions , ScrollView , TouchableOpacity} from 'react-native'
import React, {useState ,useEffect} from 'react'

const {width , height} = Dimensions.get('window')

const DiscountItem = () => {
    const [discount , setdiscount ] = useState([]);
    useEffect(()=>{
      const fetchData = async () => {
        try {
  
          const response = await fetch('http://192.168.1.7:3000/api/discount/getAll');
  
      
  
          const jsonData = await response.json();
          console.log(jsonData.data);
          setdiscount(jsonData.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    },[])
  return (
    <View style = {styles.headerdiscount}>
      <Text style = {styles.nametext}>Mã khuyến mãi được áp dụng cho cửa hàng</Text>
      <ScrollView horizontal   showsHorizontalScrollIndicator={false}>
     {discount.map((data , index)=>
     <View key={index} style={{width:0.65*width , height:0.075*height , backgroundColor:'#F0F0F0' ,  borderWidth:1 ,  marginTop:10, borderRadius:10}}>
     <View style = {{flexDirection:'row', margin:10}}>
       <View style={{flexDirection:'column' }}>
         <Text style={{fontWeight:'bold',color:'#616161'}}>Giảm {Math.floor(data.priceDiscount)/1000}k cho đơn từ { Math.floor(data.money_limit / 1000)}k</Text>
         <Text style={{  fontWeight:'bold' ,color:'#616161'}}>HSD: {data.idVoucher.date}</Text>
       </View>

       <TouchableOpacity style={{width:0.15*width , height:0.04*height , marginLeft:10 , borderRadius:10 , backgroundColor:'#319AB4' , alignItems:'center' , justifyContent:'center'}}>
         <Text style={{color:'white' , fontWeight:'bold'}}>Lấy mã</Text>
       </TouchableOpacity>
     </View>
   </View>)}
    </ScrollView>
    </View>
  )
}

export default DiscountItem

const styles = StyleSheet.create({
    headerdiscount:{
        top:0.05*height,
        marginLeft:15,
   
        
    } , 
    nametext:{
      fontWeight:'bold',
        paddingTop:10
    }
})