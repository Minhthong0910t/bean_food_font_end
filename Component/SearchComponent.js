import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View  ,Image , TextInput , Dimensions , FlatList} from 'react-native'
import React , {useEffect , useState} from 'react'
const {width   , height} = Dimensions.get('window')
const SearchComponent = ({navigation}) => {
  const [inputText, setInputText] = useState('');
  const [data, setData] = useState([]);
  const handleButtonPress = () => {
    if (inputText !== '') {
      setData([...data, inputText]);
      setInputText('');
    }
  };




  const numColumns = 3; // Số cột trên mỗi hàng
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth / numColumns;

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={{flexDirection:'row'  , justifyContent:'center' ,alignItems:'center' , marginLeft:15 , marginTop:15, borderWidth:1 , width:item.length*10 , height:40 , borderRadius:15}}>
      <Text style = {{fontWeight:'bold' , alignItems:'center' , justifyContent:'center' }}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
 <SafeAreaView style ={{marginTop:25}}> 
    <View style = {{flexDirection:'row'  , alignItems:'center' , justifyContent:'center' , height:100}}>
      <TouchableOpacity style={{marginRight:'auto'}} onPress={()=>navigation.goBack()}>
        <Image source={require('./../Image/left_arrow.png')} style = {{width:25  , height:25}}/>
      </TouchableOpacity>
      <Text style = {{ fontWeight:'bold' , textAlign:'center' , flex:1}}>Tìm kiếm</Text>
    </View>
 
    <View style={{flexDirection: 'row'}}>
 <TouchableOpacity onPress={()=>{ navigation.navigate('Search')}}>
 <TextInput
          style={{
            width: 0.8 * width,
            height: 40,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: 'black',
            marginLeft: 15,
            paddingLeft: 10,
          }}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          placeholder="Nhập từ khóa tìm kiếm"
        />
 </TouchableOpacity >
        <View
          style={{
            width: 40,
            borderRadius: 15,
            marginLeft: 5,
            height: 40,
            backgroundColor: '#319AB4',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
    <TouchableOpacity onPress={handleButtonPress} >
    <Image
            source={require('./../Image/search.png')}
            style={{width: 25, height: 25}}
          />
    </TouchableOpacity>
        </View>
      </View>
      <View>
      <FlatList
           data={data}
           horizontal={false} // Hiển thị theo chiều ngang và dọc
           renderItem={renderItem}
           keyExtractor={(item) => item.id}
           numColumns={numColumns}
      />
      </View>
            
      <View>
        <FlatList />
      </View>
 </SafeAreaView>
  )
}

export default SearchComponent

const styles = StyleSheet.create({})