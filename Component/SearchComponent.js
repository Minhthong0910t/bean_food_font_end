import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Dimensions, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { URL } from '../const/const'
const { width, height } = Dimensions.get('window')
const SearchComponent = ({ navigation }) => {
  const [inputText, setInputText] = useState('');
  const [data, setData] = useState([]);
  const handleButtonPress = () => {
    axios.post(URL + 'api/product/getbyname', {
      name: inputText
    }).then(response => {setData(response.data); console.log(data, "DATA");})
  };




  const numColumns = 3; // Số cột trên mỗi hàng
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth / numColumns;

  const renderItem = ({ item }) => {
    return (
      <View style={{ margin: 15, flexDirection: 'row', height: 90, alignItems: 'center' }} >

        <View >
          <Image source={require('./../Image/imagedoan.png')} />
        </View>
        <View style={{ flexDirection: 'column', paddingLeft: 10, marginLeft: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#616161' }}>{item.name}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Image source={{uri: item.image}} style={{ width: 20, height: 20, marginTop: 5 }} />
            <Text style={{ padding: 5, fontWeight: 'bold', color: '#616161' }}>{item}</Text>
          </View>
          <Text style={{ color: '#616161' }}>{item}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ marginTop: 25 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 100 }}>
        <TouchableOpacity style={{ marginRight: 'auto' }} onPress={() => navigation.goBack()}>
          <Image source={require('./../Image/left_arrow.png')} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold', textAlign: 'center', flex: 1 }}>Tìm kiếm</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => { navigation.navigate('Search') }}>
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
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <FlatList
          data={data}
          horizontal={false} // Hiển thị theo chiều ngang và dọc
          renderItem={(item, index)=>{
            console.log(item.name)
            const product = item.item
            return(
              <TouchableOpacity style={{ margin: 15, flexDirection: 'row', height: 90, alignItems: 'center', marginTop: 20 }} onPress={() => { navigation.navigate('ProductDetail', { product })}} >

                <View >
                  <Image source={{ uri: item.item.image }}  style={{width: 100, height: 100}}/>
                </View>
                <View style={{ flexDirection: 'column', paddingLeft: 10, marginLeft: 10 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#616161' }}>{item.item.name}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ padding: 5, fontWeight: 'bold', color: '#616161' }}>{item.item.realPrice} {'VND'}</Text>
                  </View>
                  <Text style={{ color: '#616161' }}>{item.item.description}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
        />
      
      </View>

      <View>
      </View>
    </SafeAreaView>
  )
}

export default SearchComponent

const styles = StyleSheet.create({})