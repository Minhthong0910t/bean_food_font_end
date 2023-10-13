import { StyleSheet, Text,  Image, SafeAreaView  , TouchableOpacity , View , FlatList} from 'react-native'
import React , {useEffect , useState} from 'react'

const ComxuatComponent = ({navigation}) => {
  const[comxuat , setcomxuat] = useState([])

  useEffect(()=>{
    const data = [{
      id:'1' , 
      race:4.9,
      name:'Cơm Niêu Singapore' , 
      adress:'D29, Phạm Văn Bạch' , 
      desscription:'ngon' , 
      image: <Image source={require('./../Image/imagedoan.png')}/>,
      categoryId :2

    },
    {
      id:'2' , 
      race:4.9,
      name:'Cơm Niêu Singapore' , 
      adress:'D29, Phạm Văn Bạch' , 
      desscription:'ngon' , 
      image: <Image source={require('./../Image/imagedoan.png')}/>,

    },
    {
      id:'3' , 
      race:4.9,
      name:'Cơm Niêu Singapore' , 
      adress:'D29, Phạm Văn Bạch' , 
      desscription:'ngon' , 
      image: <Image source={require('./../Image/imagedoan.png')}/>,

    }
  ]
  setcomxuat(data)
    
  },[])
  const filteredData = comxuat.filter(item => item.categoryId === 2);

  


  const renderItem = ({ item }) => {
    return (
      <View style = {{margin:15   , flexDirection:'row' , height:90 ,alignItems:'center'}} >
            
      <View >
      {item.image}
      </View>
      <View style = {{flexDirection:'column' , paddingLeft:10  , marginLeft:10}}>
        <Text style = {{ fontWeight:'bold' , fontSize:15 ,color:'#616161'}}>{item.name}</Text>
      <View style={{flexDirection:'row'}}>
         <Image source={require('./../Image/star.png')} style = {{width:20 , height:20 , marginTop:5}}/>
         <Text style={{padding:5  , fontWeight:'bold',color:'#616161'}}>{item.race}</Text>
        </View>
        <Text style = {{color:'#616161'}}>{item.adress}</Text>
      </View>
      <TouchableOpacity style = {{marginLeft:'auto'}}>
      <Image source={require('./../Image/right_arrow.png')} style = {{width:15 , height:15}}/>
      </TouchableOpacity>
  </View>
    );
  };

  return (
    <SafeAreaView style ={{marginTop:25}}> 
    <View style = {{flexDirection:'row'  , alignItems:'center' , justifyContent:'center' , height:100}}>
      <TouchableOpacity style={{marginRight:'auto'}} onPress={()=>navigation.goBack()}>
        <Image source={require('./../Image/left_arrow.png')} style = {{width:25  , height:25}}/>
      </TouchableOpacity>
      <Text style = {{ fontWeight:'bold' , textAlign:'center' , flex:1}}>Cơm Xuất</Text>
    </View>
    <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  )
}

export default ComxuatComponent

const styles = StyleSheet.create({})