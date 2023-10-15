import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image , TextInput} from 'react-native'
import React from 'react'

const ProfileInfor = ({ navigation }) => {
  return (
      <SafeAreaView style={{ marginTop: 0 , flex:1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 100 , backgroundColor:"white"}}>
              <TouchableOpacity style={{ marginRight: 'auto' }} onPress={() => navigation.goBack()}>
                  <Image source={require('./../Image/left_arrow.png')} style={{ width: 25, height: 25 }} />
              </TouchableOpacity>
              <Text style={{ fontWeight: 'bold', textAlign: 'center', flex: 1 }}>Thông Tin Cá Nhân </Text>
          </View>
          <View style={styles.container}>
                <View>
                  <Text style={styles.text}>Full name</Text>
                  <TextInput
                      value='Nawaf Azim'
                      style={styles.textInput}
                  />
                  <View style={styles.line}></View>
              </View>
              <View>
                  <Text style={styles.text}>Email address</Text>
                  <TextInput
                      value='Nawafazim@icloud.com'
                      style={styles.textInput}
                  />
                  <View style={styles.line}></View>
              </View>
              <View>
                  <Text style={styles.text}>Phone number</Text>
                  <TextInput
                      value='0996543355'
                      style={styles.textInput}
                  />
                  <View style={styles.line}></View>
              </View>

              <TouchableOpacity style={styles.button} >
                  <Text style={{alignSelf:'center', color:'white',}}>Change settings</Text>
              </TouchableOpacity>
          </View>
             
      </SafeAreaView>
  )
}

export default ProfileInfor

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    text:{
        fontSize:15,
        color:'#868686',
        marginLeft:20,
        marginTop:10
    },
    textInput:{
        marginHorizontal: 20,
        marginVertical:10
    },
    line:{
        height :1,
        width : '100%',
        backgroundColor :'gray',
        marginHorizontal:20
    },
    button:{
        height:50,
        marginHorizontal:20,
        backgroundColor:'#FFAA00',
        borderRadius:8,
        justifyContent:'center',
        marginTop:30
    }
})