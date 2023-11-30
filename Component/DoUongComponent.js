import { StyleSheet, Text, View , SafeAreaView  , Image , TouchableOpacity  , FlatList , ScrollView , Dimensions} from 'react-native'
import React , {useEffect , useState} from 'react'
import { URL } from '../const/const'

const { width, height } = Dimensions.get('screen');
const DoUongComponent = ({navigation}) => {
  const[douong , setdouong] = useState([])

  useEffect(()=>{
    const fetchData = async () => {
      try {

        const response = await fetch(`${URL}api/productDanhmuc/douong`);
        const jsonData = await response.json();

        console.log("jsondata" , jsonData.products);
        setdouong(jsonData.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

  
    
  },[])


  


 

  return (
    <SafeAreaView style ={{marginTop:25}}> 
    <View style = {{flexDirection:'row'  , alignItems:'center' , justifyContent:'center' , height:100}}>
      <TouchableOpacity style={{marginRight:'auto'}} onPress={()=>navigation.goBack()}>
        <Image source={require('./../Image/left_arrow.png')} style = {{width:25  , height:25}}/>
      </TouchableOpacity>
      <Text style = {{ fontWeight:'bold' , textAlign:'center' , flex:1}}>Đồ Uống</Text>
    </View>
    <ScrollView >
        {douong.map((data, index) =>
          <View key={index} style={{ backgroundColor: '#f0f0f0', marginTop: 6, marginRight: 5, borderRadius: 10 }}>
            <TouchableOpacity
              style={{ margin: 15, flexDirection: 'row', height: 90, alignItems: 'center' }}
              onPress={() => navigation.navigate('ProductDetail', { product: data })}
            >
              <View >
                <Image source={{ uri: data.image }} style={{ borderWidth: 1, width: width * 0.25, height: width * 0.25 , borderRadius:10 }} />
              </View>
              <View style={{ flexDirection: 'column', paddingLeft: 10, marginLeft: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#616161' }}>Name: {data.name}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  
                  <Text style={{ paddingTop:5 , paddingBottom:5, fontWeight: 'bold', color: '#616161' }}>Gía: {data.realPrice}</Text>
                </View>
                <Text style={{ color: '#616161', width: 0.6 * width }} numberOfLines={2}>Mô tả:{data.description}</Text>
              </View>
            </TouchableOpacity>
          </View>



        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default DoUongComponent

const styles = StyleSheet.create({})