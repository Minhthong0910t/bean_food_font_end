import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

const {width, height} = Dimensions.get('window');

const HeaderHome = ({navigation}) => {
  return (
    <View style = {{marginTop:30}}>
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        <Image
          source={require('./../Image/placeholder.png')}
          style={{width: 30, height: 30, margin: 15}}
        />

        <Text style={{fontSize: 15, fontWeight: 'bold' , color:'#616161'}}>
          D29, Phạm Văn Bạch
        </Text>

        <TouchableOpacity
          style={{
            justifyContent: 'space-between',
            marginLeft: 'auto',
            margin: 15,
          }}>
          <Image
            source={require('./../Image/menu.png')}
            style={{width: 30, height: 30}}
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
          placeholder="Nhập từ khóa tìm kiếm"
        />
 </TouchableOpacity>


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
    <TouchableOpacity onPress={()=>{navigation.navigate('Search')}}>
    <Image
            source={require('./../Image/search.png')}
            style={{width: 25, height: 25}}
          />
    </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const SliderHome = () => {


  const [imageslider, setimageslider] = useState([]);

  const stepimage = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch('http://192.168.1.7:3000/api/slider/getAll');


        const jsonData = await response.json();
        setimageslider(jsonData.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

  }, []);

  // useEffect(()=>{
  //     if(imageslider.length>0){
  //       let index = 0;
  //         setInterval(()=>{
  //             stepimage.current.scrollTo({x:index*0.925*width , y:0 });
  //             index+=1;
  //             if(index==imageslider.length){
  //               index=0;
  //             }
  //         } , 3000)
  //     }
  // },[imageslider])

const headleScoll = (e)=>{
if(!e){
  return; 
}
const {nativeEvent} = e;

if(nativeEvent &&nativeEvent.contentOffset){
   const currenoffset = nativeEvent.contentOffset.x;
   let imageIndex = 0;

   if(nativeEvent.contentOffset.x>0){
    imageIndex = Math.floor((nativeEvent.contentOffset.x +(0.925*width) /2)/(0.925*width))
   }
 
}

}
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{width: 0.925 * width * imageslider.length}}
         style={{margin: 15, borderRadius: 15}}
        // onScroll={headleScoll}
        scrollEventThrottle={16}
        // ref={stepimage}
      >
        {imageslider.map((data , index) => <View key={index}><Image source={{uri:data.image}}  style={{
              width: 0.925 * width,
              height: 0.25 * height,
              borderRadius: 15,
            }}/></View>)}
      </ScrollView>
    </View>
  );
};

const Menu =({navigation})=>{
  return(
    <View>
        <View style={{flexDirection:'row', alignItems:'center' }}>
          <View style={{flexDirection:'column' , justifyContent:'center', alignItems:'center' , marginLeft:15}}>
            <TouchableOpacity  onPress={()=>{navigation.navigate('Ganban')}}>
              <Image source={require('./../Image/ganban.png')} style={{width:0.08*width , height:0.04*height}}/>
            </TouchableOpacity>

            <Text style={{color:'#616161'}}>Gần bạn</Text>
          </View>
          <View style={{flexDirection:'column' , justifyContent:'center', alignItems:'center',marginLeft:40}}>
            <TouchableOpacity  onPress={()=>{navigation.navigate('Comxuat')}}>
              <Image source={require('./../Image/comxuat.png')} style={{width:0.08*width , height:0.04*height}}/>
            </TouchableOpacity>

            <Text style={{color:'#616161'}}>Cơm xuất</Text>
          </View>
          <View style={{flexDirection:'column' , justifyContent:'center', alignItems:'center',marginLeft:40}}>
            <TouchableOpacity  onPress={()=>{navigation.navigate('BunPho')}}>
              <Image source={require('./../Image/noodle.png')} style={{width:0.08*width , height:0.04*height}}/>
            </TouchableOpacity>

            <Text style={{color:'#616161'}}>Bún phở</Text>
          </View>
          <View style={{flexDirection:'column' , justifyContent:'center', alignItems:'center',marginLeft:40}}>
            <TouchableOpacity  onPress={()=>{navigation.navigate('Chicken')}}>
              <Image source={require('./../Image/fried_chicken.png')} style={{width:0.08*width , height:0.04*height}}/>
            </TouchableOpacity>

            <Text style={{color:'#616161'}}>Gà rán</Text>
          </View>

        </View>
        <View style={{flexDirection:'row', alignItems:'center' }}>
          <View style={{flexDirection:'column' , justifyContent:'center', alignItems:'center' , margin:20}}>
            <TouchableOpacity  onPress={()=>{navigation.navigate('AnVat')}}>
              <Image source={require('./../Image/snack.png')} style={{width:0.08*width , height:0.04*height}}/>
            </TouchableOpacity>

            <Text style={{color:'#616161'}}>Ăn vặt</Text>
          </View>
          <View style={{flexDirection:'column' , justifyContent:'center', alignItems:'center',marginLeft:35}}>
            <TouchableOpacity  onPress={()=>{navigation.navigate('DoUong')}}>
              <Image source={require('./../Image/milk_tea.png')} style={{width:0.08*width , height:0.04*height}}/>
            </TouchableOpacity>

            <Text style={{color:'#616161'}}>Đồ uống</Text>
          </View>
          <View style={{flexDirection:'column' , justifyContent:'center', alignItems:'center',marginLeft:40}}>
            <TouchableOpacity  onPress={()=>{navigation.navigate('BanhMi')}}>
              <Image source={require('./../Image/burger.png')} style={{width:0.08*width , height:0.04*height}}/>
            </TouchableOpacity>
            <Text style={{color:'#616161'}}>Bánh mì</Text>
          </View>
          <View style={{flexDirection:'column' , justifyContent:'center', alignItems:'center',marginLeft:40}}>
            <TouchableOpacity  onPress={()=>{navigation.navigate('Healthy')}}>
              <Image source={require('./../Image/diet1.png')} style={{width:0.08*width , height:0.04*height}}/>
            </TouchableOpacity>
            <Text style={{color:'#616161'}}>Healthy</Text>
          </View>

        </View>
    </View>
  )
}

const Discount = ()=>{

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
return(
  <View>

    <ScrollView horizontal   showsHorizontalScrollIndicator={false}>
     {discount.map((data , index)=>
     <View key={index} style={{width:0.65*width , height:0.075*height , backgroundColor:'#F0F0F0' , marginLeft:15 , borderRadius:10}}>
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

const Discountforeveryday = ()=>{
  return(
    <View>
      <Text style={{margin:15 , fontWeight:'bold' , fontSize:20 ,color:'#616161'}}>Cửa hàng thương hiệu</Text>

      <View style={{flexDirection:'row' , marginLeft:15}}>
        <TouchableOpacity style = {{width:0.5*width , height:0.30*height }}>
          <Image source={require('./../Image/loteria.png')} />
        </TouchableOpacity>

        <View style = {{flexDirection:'column'  , position:'relative' }}>
        <TouchableOpacity style = {{ marginBottom:10 , width:0.45*width , height:0.14*height }}>
          <Image source={require('./../Image/tocotoco.png')} style = {{width:0.45*width , borderRadius:10}}/>
        </TouchableOpacity>
        <TouchableOpacity style = {{  width:0.45*width ,height:0.14*height }}>
          <Image source={require('./../Image/hightlandcoffe.png')}style = {{width:0.45*width , borderRadius:10}}/>
        </TouchableOpacity>

        </View>
      </View>
    </View>
  )
}

const Foodngonquanhday = ()=>{
    const [datarestauran , setdatarestauran] = useState([])

    useEffect(()=>{
      const fetchData = async () => {
        try {

          const response = await fetch('http://192.168.1.7:3000/api/restaurant/getAll');


          const jsonData = await response.json();
          setdatarestauran(jsonData.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();

       
    },[])
  
return(
  <View>
 <View style = {{flexDirection:'row'  ,alignItems:'center'}}>   
  <Text style={{margin:15 , fontWeight:'bold' , fontSize:20 ,color:'#616161'}}>Đồ ngon quanh đây</Text>
  <TouchableOpacity style = {{marginLeft:'auto' , marginRight:5}}>
    <Text>Xem tất cả</Text>
  </TouchableOpacity>
  </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {datarestauran.map((data , index)=>
        <View  style={{width:250}} key={index}>
       <View style={{marginLeft:15}}>
          <Image source={{uri:data.image}} style={{width:0.58*width , height:0.2*height , borderTopLeftRadius:10 , borderTopRightRadius:10}}/>
       </View>
    
        <View style = {{flexDirection:'row' , alignItems:'center' , backgroundColor:'#F0F0F0' , marginLeft:15 ,width:0.58*width , height:0.08*height}}>
          <View style = {{flexDirection:'column' }}>
            <Text style={{fontWeight:'bold' , fontSize:20 ,color:'#616161' , marginTop:20}}>{data.name}</Text>
    
            <Text style={{fontWeight:'bold' ,color:'#616161'}}>{data.timeon} AM-{data.timeoff} PM</Text>
            <Text style={{fontWeight:'bold' ,color:'#616161'}}>{data.adress}</Text>
          </View>
          <TouchableOpacity style={{marginLeft:'auto' ,  backgroundColor:'#FFFFFF' , width:0.05*width , alignItems:'center' ,justifyContent:'center'  , height:0.025*height, borderRadius:20,marginTop:20 , marginRight:10}} >
            <Image source={require('./../Image/right_arrow.png')} style = {{width:15 , height:15}}/>
          </TouchableOpacity>
        </View>
      </View>)}
    </ScrollView>
  </View>
)
}

const Goiymonan = ({ navigation })=>{

  const[datamonangoiy , setdatamonan] = useState([])

  useEffect(()=>{
    const fetchData = async () => {
      try {

        const response = await fetch('http://192.168.1.7:3000/api/product/suggest');


        const jsonData = await response.json();
   
        setdatamonan(jsonData.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
   
  },[])
  return(
    <View>
        <ScrollView >
          {datamonangoiy.map((data , index)=>
            
          <View  key= {index} style = {{backgroundColor:'#f0f0f0' , marginLeft:15 , marginTop:6 ,  marginRight:5, borderRadius:10}}>
              <TouchableOpacity
                style={{margin: 15, flexDirection: 'row', height: 90, alignItems: 'center'}}
                onPress={() => navigation.navigate('ProductDetail', { product: data })}
              >
                <View >
                  <Image source={{uri:data.images[0]}} style={{borderWidth:1 , width:width*0.25 , height:width*0.25}}/>
                </View>
                  <View style={{flexDirection: 'column', paddingLeft: 10, marginLeft: 10}}>
                    <Text style={{fontWeight: 'bold', fontSize: 15, color: '#616161'}}>
                      {data.name}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Image source={require('./../Image/star.png')} style={{width: 20, height: 20, marginTop: 5}} />
                      <Text style={{padding: 5, fontWeight: 'bold', color: '#616161'}}>{data.race}</Text>
                    </View>
                    <Text style={{color:  '#616161' , width:0.6*width }} numberOfLines={2}>{data.description}</Text>
                  </View>
       
              </TouchableOpacity> 
          </View>

              
              
          )}
        </ScrollView>
    </View>
  )
}
const Home = ({navigation}) => {
  return (
    <View style = {{backgroundColor:'white'}}> 
      <ScrollView   showsVerticalScrollIndicator={false} StickyHeaderComponent={HeaderHome}>
      <HeaderHome  navigation={navigation}/>  
        <SliderHome />
        <Menu navigation={navigation}/>
        <Discount/>
        <Discountforeveryday/>
        <Foodngonquanhday/>
        <Goiymonan navigation={navigation}/>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
