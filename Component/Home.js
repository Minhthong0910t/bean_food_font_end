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
    const data = [
      {
        id: '1',
        image: (
          <Image
            source={require('./../Image/slider2.png')}
            resizeMode="stretch"
            style={{
              width: 0.925 * width,
              height: 0.25 * height,
              borderRadius: 15,
            }}
          />
        ),
      },
      {
        id: '2',
        image: (
          <Image
            source={require('./../Image/slider1.png')}
            resizeMode="stretch"
            style={{
              width: 0.925 * width,
              height: 0.25 * height,
              borderRadius: 15,
            }}
          />
        ),
      },
      {
        id: '3',
        image: (
          <Image
            source={require('./../Image/slider2.png')}
            resizeMode="stretch"
            style={{
              width: 0.925 * width,
              height: 0.25 * height,
              borderRadius: 15,
            }}
          />
        ),
      },
      {
        id: '4',
        image: (
          <Image
            source={require('./../Image/slider2.png')}
            resizeMode="stretch"
            style={{
              width: 0.925 * width,
              height: 0.25 * height,
              borderRadius: 15,
            }}
          />
        ),
      },
    ];

    setimageslider(data);
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
        {imageslider.map((data , index) => <View key={index}>{data.image}</View>)}
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
              <Image source={require('./../Image/ganban.png')} style={{width:30 , height:30}}/>
            </TouchableOpacity>

            <Text style={{color:'#616161'}}>Gần bạn</Text>
          </View>
          <View style={{flexDirection:'column' , justifyContent:'center', alignItems:'center',marginLeft:40}}>
            <TouchableOpacity  onPress={()=>{navigation.navigate('Comxuat')}}>
              <Image source={require('./../Image/comxuat.png')} style={{width:30 , height:30}}/>
            </TouchableOpacity>

            <Text style={{color:'#616161'}}>Cơm xuất</Text>
          </View>
          <View style={{flexDirection:'column' , justifyContent:'center', alignItems:'center',marginLeft:40}}>
            <TouchableOpacity  onPress={()=>{navigation.navigate('BunPho')}}>
              <Image source={require('./../Image/noodle.png')} style={{width:30 , height:30}}/>
            </TouchableOpacity>

            <Text style={{color:'#616161'}}>Bún phở</Text>
          </View>
          <View style={{flexDirection:'column' , justifyContent:'center', alignItems:'center',marginLeft:40}}>
            <TouchableOpacity  onPress={()=>{navigation.navigate('Chicken')}}>
              <Image source={require('./../Image/fried_chicken.png')} style={{width:30 , height:30}}/>
            </TouchableOpacity>

            <Text style={{color:'#616161'}}>Gà rán</Text>
          </View>

        </View>
        <View style={{flexDirection:'row', alignItems:'center' }}>
          <View style={{flexDirection:'column' , justifyContent:'center', alignItems:'center' , margin:20}}>
            <TouchableOpacity  onPress={()=>{navigation.navigate('AnVat')}}>
              <Image source={require('./../Image/snack.png')} style={{width:30 , height:30}}/>
            </TouchableOpacity>

            <Text style={{color:'#616161'}}>Ăn vặt</Text>
          </View>
          <View style={{flexDirection:'column' , justifyContent:'center', alignItems:'center',marginLeft:35}}>
            <TouchableOpacity  onPress={()=>{navigation.navigate('DoUong')}}>
              <Image source={require('./../Image/milk_tea.png')} style={{width:30 , height:30}}/>
            </TouchableOpacity>

            <Text style={{color:'#616161'}}>Đồ uống</Text>
          </View>
          <View style={{flexDirection:'column' , justifyContent:'center', alignItems:'center',marginLeft:40}}>
            <TouchableOpacity  onPress={()=>{navigation.navigate('BanhMi')}}>
              <Image source={require('./../Image/burger.png')} style={{width:30 , height:30}}/>
            </TouchableOpacity>

            <Text style={{color:'#616161'}}>Bánh mì</Text>
          </View>
          <View style={{flexDirection:'column' , justifyContent:'center', alignItems:'center',marginLeft:40}}>
            <TouchableOpacity  onPress={()=>{navigation.navigate('Healthy')}}>
              <Image source={require('./../Image/diet1.png')} style={{width:30 , height:30}}/>
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
    const datadiscount = [
      {id:'1' , expirationdate:'10/11/2023' , discount:25000 , pricefrom:50000},
      {id:'2' , expirationdate:'11/11/2023' , discount:25000 , pricefrom:40000}
    ]
      setdiscount(datadiscount)
  },[])
return(
  <View>

    <ScrollView horizontal   showsHorizontalScrollIndicator={false}>
     {discount.map((data , index)=>
     <View key={index} style={{width:0.65*width , height:64 , backgroundColor:'#F0F0F0' , marginLeft:15 , borderRadius:15}}>
     <View style = {{flexDirection:'row', margin:10}}>
       <View style={{flexDirection:'column' }}>
         <Text style={{fontWeight:'bold',color:'#616161'}}>Giảm {Math.floor(data.discount)/1000}k cho đơn từ { Math.floor(data.pricefrom / 1000)}k</Text>
         <Text style={{  fontWeight:'bold' ,color:'#616161'}}>HSD: {data.expirationdate}</Text>
       </View>

       <TouchableOpacity style={{width:60 , height:40 , marginLeft:10 , borderRadius:10 , backgroundColor:'#319AB4' , alignItems:'center' , justifyContent:'center'}}>
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
        <TouchableOpacity style = {{width:0.5*width}}>
          <Image source={require('./../Image/loteria.png')} />
        </TouchableOpacity>

        <View style = {{flexDirection:'column'  , position:'relative' }}>
        <TouchableOpacity style = {{ marginBottom:10 ,  }}>
          <Image source={require('./../Image/tocotoco.png')} style = {{width:0.45*width , borderRadius:10}}/>
        </TouchableOpacity>
        <TouchableOpacity>
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
        const data = [
          {
            id:'1' , 
            image: <Image source={require('./../Image/namerestauran.png')}/> , 
            name:'The Coffee House',
            timeon:'8:00 AM' , 
            timeoff:'10:00 PM' ,
            adress:'Lê Trọng Tấn, Thanh Xuân'
          },
          {
            id:'2' , 
            image: <Image source={require('./../Image/namerestauran.png')}/> , 
            name:'The Coffee House',
            timeon:'8:00 AM' , 
            timeoff:'10:00 PM',
            adress:'Lê Trọng Tấn, Thanh Xuân'
          }
        ]

        setdatarestauran(data)
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
        {data.image}
       </View>
    
        <View style = {{flexDirection:'row' , alignItems:'center' }}>
          <View style = {{flexDirection:'column' , marginLeft:15}}>
            <Text style={{fontWeight:'bold' , fontSize:20 ,color:'#616161'}}>{data.name}</Text>
    
            <Text style={{fontWeight:'bold' ,color:'#616161'}}>{data.timeon}-{data.timeoff}</Text>
            <Text style={{fontWeight:'bold' ,color:'#616161'}}>{data.adress}</Text>
          </View>
          <TouchableOpacity style={{marginLeft:'auto' , }} >
            <Image source={require('./../Image/right_arrow.png')} style = {{width:15 , height:15}}/>
          </TouchableOpacity>
        </View>
      </View>)}
    </ScrollView>
  </View>
)
}

const Goiymonan = ()=>{

  const[datamonangoiy , setdatamonan] = useState([])

  useEffect(()=>{
    const data = [{
      id:'1' , 
      race:4.9,
      name:'Cơm Niêu Singapore' , 
      adress:'D29, Phạm Văn Bạch' , 
      desscription:'ngon' , 
      image: <Image source={require('./../Image/imagedoan.png')}/>,

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
    setdatamonan(data)
  },[])
  return(
    <View>
        <ScrollView>
          {datamonangoiy.map((data , index)=>
          <View style = {{margin:15   , flexDirection:'row' , height:90 ,alignItems:'center'}} >
            
              <View >
              {data.image}
              </View>
              <View style = {{flexDirection:'column' , paddingLeft:10  , marginLeft:10}}>
                <Text style = {{ fontWeight:'bold' , fontSize:15 ,color:'#616161'}}>{data.name}</Text>
              <View style={{flexDirection:'row'}}>
                 <Image source={require('./../Image/star.png')} style = {{width:20 , height:20 , marginTop:5}}/>
                 <Text style={{padding:5  , fontWeight:'bold',color:'#616161'}}>{data.race}</Text>
                </View>
                <Text style = {{color:'#616161'}}>{data.adress}</Text>
              </View>
              <TouchableOpacity style = {{marginLeft:'auto'}}>
              <Image source={require('./../Image/right_arrow.png')} style = {{width:15 , height:15}}/>
              </TouchableOpacity>
          </View>)}
        </ScrollView>
    </View>
  )
}
const Home = ({navigation}) => {
  return (
    <View>
          
      <ScrollView   showsVerticalScrollIndicator={false} StickyHeaderComponent={HeaderHome}>
      <HeaderHome  navigation={navigation}/>  
        <SliderHome />
        <Menu navigation={navigation}/>
        <Discount/>
        <Discountforeveryday/>
        <Foodngonquanhday/>
        <Goiymonan/>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
