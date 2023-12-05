import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,FlatList 
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { URL } from '../const/const';
import SliderHome from '../Item/SliderHome';
import * as Location from 'expo-location';
import Toast from 'react-native-toast-message';
const { width, height } = Dimensions.get('window');
import { useFocusEffect } from '@react-navigation/native';

const HeaderHome = ({ navigation }) => {
  const [address, setAddress] = useState('Đang lấy vị trí...');

useEffect(() => {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setAddress('Quyền truy cập vị trí bị từ chối.');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
    if (reverseGeocode.length > 0) {
      let addr = reverseGeocode[0];
      let fullAddress = `${addr.name || ''} ${addr.street || ''}, ${addr.city || ''}, ${addr.region || ''}, ${addr.country || ''}`;
      setAddress(fullAddress.replace(/, ,/g, ',').replace(/,,/g, ',').trim()); 
    }
  })();
}, []);
  return (
    <View style={{ marginTop: 30 }}>
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <Image
          source={require('./../Image/placeholder.png')}
          style={{ width: 30, height: 30, margin: 15 }}
        />

        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#616161' }}>
          {address}
        </Text>

        <TouchableOpacity
          style={{
            justifyContent: 'space-between',
            marginLeft: 'auto',
            margin: 15,
          }}>
          <Image
            source={require('./../Image/logo_bean.png')}
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontSize: 25,
          color: '#319AB4',
          fontWeight: 'bold',
          marginStart: 15,
        }}>
        Wellcome to BEANFOOD!
      </Text>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => { navigation.navigate('Search') }} style={{flex : 1}}>
          <TextInput
            onFocus={() => { navigation.navigate('Search') }}
            style={{
              // width: 0.8 * width,
              height: 40,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: 'black',
              marginLeft: 15,
              paddingLeft: 10,
            }}
            placeholder="Nhập từ khóa tìm kiếm"
          />
        </TouchableOpacity>


        <View
          style={{
            flex:0.2, 
            // width: 40,
            borderRadius: 15,
            marginLeft: 5,
            marginRight: 15,
            height: 40,
            backgroundColor: '#319AB4',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => { navigation.navigate('Search') }}>
            <Image
              source={require('./../Image/search.png')}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};



const Menu = ({ navigation }) => {
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 15 }}>
          <TouchableOpacity onPress={() => { navigation.navigate('Ganban') }}>
            <Image source={require('./../Image/ganban.png')} style={{ width: 0.08 * width, height: 0.04 * height }} />
          </TouchableOpacity>

          <Text style={{ color: '#616161' }}>Món Bò</Text>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 40 }}>
          <TouchableOpacity onPress={() => { navigation.navigate('Comxuat') }}>
            <Image source={require('./../Image/comxuat.png')} style={{ width: 0.08 * width, height: 0.04 * height }} />
          </TouchableOpacity>

          <Text style={{ color: '#616161' }}>Cơm xuất</Text>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 40 }}>
          <TouchableOpacity onPress={() => { navigation.navigate('BunPho') }}>
            <Image source={require('./../Image/noodle.png')} style={{ width: 0.08 * width, height: 0.04 * height }} />
          </TouchableOpacity>

          <Text style={{ color: '#616161' }}>Bún phở</Text>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 40 }}>
          <TouchableOpacity onPress={() => { navigation.navigate('Chicken') }}>
            <Image source={require('./../Image/fried_chicken.png')} style={{ width: 0.08 * width, height: 0.04 * height }} />
          </TouchableOpacity>

          <Text style={{ color: '#616161' }}>Gà rán</Text>
        </View>

      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 20 }}>
          <TouchableOpacity onPress={() => { navigation.navigate('AnVat') }}>
            <Image source={require('./../Image/snack.png')} style={{ width: 0.08 * width, height: 0.04 * height }} />
          </TouchableOpacity>

          <Text style={{ color: '#616161' }}>Ăn vặt</Text>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 35 }}>
          <TouchableOpacity onPress={() => { navigation.navigate('DoUong') }}>
            <Image source={require('./../Image/milk_tea.png')} style={{ width: 0.08 * width, height: 0.04 * height }} />
          </TouchableOpacity>

          <Text style={{ color: '#616161' }}>Đồ uống</Text>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 40 }}>
          <TouchableOpacity onPress={() => { navigation.navigate('BanhMi') }}>
            <Image source={require('./../Image/burger.png')} style={{ width: 0.08 * width, height: 0.04 * height }} />
          </TouchableOpacity>
          <Text style={{ color: '#616161' }}>Bánh mì</Text>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 40 }}>
          <TouchableOpacity onPress={() =>   
            Toast.show({
        type: 'error',
        text1: 'đang cập nhập thêm món ăn!',
      })}>
            <Image source={require('./../Image/three-dots.png')} style={{ width: 0.07 * width,     height: 0.04 * height }} />
          </TouchableOpacity>
          <Text style={{ color: '#616161' }}>Đồ Khác</Text>
        </View>

      </View>
    </View>
  )
}


// const Discountforeveryday = () => {
//   return (
//     <View style ={{marginRight:20}}>
//       <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 20, color: '#616161' }}>Cửa hàng Nổi Bật</Text>

//       <View style={{ flexDirection: 'row', marginLeft: 15 }}>
//         <TouchableOpacity style={{ width: 0.5 * width, height: 0.30 * height }}>
//           <Image source={require('./../Image/loteria.png')} />
//         </TouchableOpacity>

//         <View style={{ flexDirection: 'column', position: 'relative' }}>
//           <TouchableOpacity style={{ marginBottom: 10, width: 0.45 * width, height: 0.14 * height }}>
//             <Image source={require('./../Image/tocotoco.png')} style={{ width: 0.45 * width, borderRadius: 10 }} />
//           </TouchableOpacity>
//           <TouchableOpacity style={{ width: 0.45 * width, height: 0.14 * height }}>
//             <Image source={require('./../Image/hightlandcoffe.png')} style={{ width: 0.45 * width, borderRadius: 10 }} />
//           </TouchableOpacity>

//         </View>
//       </View>
//     </View>
//   )
// }

const Restaurant = ({ navigation }) => {
  const [datarestauran, setdatarestauran] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {

         const response = await fetch(URL+'api/topRestaurants');
        const jsonData = await response.json();
        const data = jsonData.data ;
        let filterRestaurnats = data.filter(datarestaurnat => datarestaurnat.role === "user");
        setdatarestauran(filterRestaurnats)
      
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();


  }, [])

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 20, color: '#616161' }}>Nhà Hàng Quanh Đây</Text>
        <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 5 }} onPress={()=>navigation.navigate('AllRestaurant'  ,{datarestaurant:datarestauran}) }>
          <Text>Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {datarestauran.map((data, index) =>
       
          <View style={{ width: 250 }} key={data._id}>
          <TouchableOpacity onPress={() => navigation.navigate('Restaurant', { restaurant: data._id  })}>
            <View style={{ marginLeft: 15 }}>
              <Image source={{ uri: data.image }} style={{ width: 0.58 * width, height: 0.2 * height, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0', marginLeft: 15, width: 0.58 * width, height: 0.08 * height }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#616161', marginTop: 20 }}>{data.restaurantName}</Text>

                <Text style={{ fontWeight: 'bold', color: '#616161' }}>{data.timeon} AM-{data.timeoff} PM</Text>
                <Text style={{ fontWeight: 'bold', color: '#616161' }}>{data.adress}</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Restaurant', { restaurant: data._id})} style={{ marginLeft: 'auto', backgroundColor: '#FFFFFF', width: 0.05 * width, alignItems: 'center', justifyContent: 'center', height: 0.025 * height, borderRadius: 20, marginTop: 20, marginRight: 10 }} >
                <Image source={require('./../Image/right_arrow.png')} style={{ width: 15, height: 15 }} />
              </TouchableOpacity>
            </View>
            </TouchableOpacity>
          </View>)}
      </ScrollView>
    </View>
  )
}

const Goiymonan = ({ navigation }) => {

  const [datamonangoiy, setdatamonan] = useState([])
  const fetchData = async () => {
    try {

      const response = await fetch(URL+'api/getTop');


      const jsonData = await response.json();
      const sortedData = jsonData.sort((a, b) => b.likeCount - a.likeCount);
      console.log("sort data" , sortedData);

      setdatamonan(sortedData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();

  }, [])
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  return (
    <View style = {{margin: 15}}>

 <View style ={{justifyContent:'space-between' , flexDirection:'row'}}>
 <Text style={{  fontWeight: 'bold', fontSize: 20, color: '#616161' }}>Gợi ý dành cho bạn</Text>
 <TouchableOpacity onPress={()=>navigation.navigate('AllProducts')}>
  <Text>
    Xem tất cả
  </Text>
 </TouchableOpacity>
 </View>
      <ScrollView >
        {datamonangoiy.map((data, index) =>
          <View key={index} style={{ backgroundColor: '#f0f0f0', marginTop: 6, marginRight: 5, borderRadius: 10 }}>
            <TouchableOpacity
              style={{ margin: 15, flexDirection: 'row', height: 90, alignItems: 'center' }}
              onPress={() => navigation.navigate('ProductDetail', { product: data })}
            >
              <View >
                <Image source={{ uri: data.image }} style={{ borderWidth: 1, width: width * 0.25, height: width * 0.25 , borderRadius:10 }} />
              </View>
              <View style={{ flexDirection: 'column', paddingLeft: 10, marginLeft: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#616161' }}>tên sản phẩm: 
                  {data.name}
                </Text>
                <View style={{ flexDirection: 'row'  }}>
              
                  <Text style={{ paddingBottom:5 , paddingTop:5, fontWeight: 'bold', color: '#616161' }}>Nhà hàng: {data.restaurantId.name}</Text>
                </View>
                <Text style={{ color: '#616161', width: 0.6 * width, fontWeight: 'bold' , paddingRight:15 }} numberOfLines={2}>Số lượng người yêu thích: {data.likeCount}</Text>
              </View>
            </TouchableOpacity>
          </View>



        )}
      </ScrollView>
    </View>
  )
}

const Home = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false} StickyHeaderComponent={HeaderHome}>
        <HeaderHome navigation={navigation} />
        <SliderHome />
        <Menu navigation={navigation} />
{/*   
        <Discountforeveryday /> */}
        <Restaurant navigation={navigation} />
        <Goiymonan navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
