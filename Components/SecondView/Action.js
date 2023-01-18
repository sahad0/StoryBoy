import { View, Text, Dimensions, Image } from 'react-native'
import React, { useEffect } from 'react'
import Icons from"react-native-vector-icons/Fontisto";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { arr } from '../../Constants.js';
import { useNetInfo } from '@react-native-community/netinfo';

export default function Action() {

  const {width,height} = Dimensions.get('screen');

  const NetInfo = useNetInfo();

  console.log(NetInfo);

  return (
    <View style={{backgroundColor:"white",flex:1,}}>
      <View style={{flexDirection:"row",justifyContent:"space-between",}}>

        <View>
          <Text style={{color:"black",fontFamily:"Oswald",fontSize:30,margin:40,marginLeft:25,marginBottom:0}}>Welcome, </Text>
          <Text style={{color:"gray",fontFamily:"OswaldL",fontSize:18,margin:2,marginLeft:25}}>Trainer Fif ! </Text>
        </View>

        <View style={{margin:20,marginTop:50}}>
          {/* <Icons name='wifi' size={25} color={"black"} /> */}
          {
            NetInfo.type==='cellular' ? 

            NetInfo.isInternetReachable ? 
              <>
                <Icon name='network-strength-4' size={25} color={"black"} />
              </> 
           
              :
              <>
                <Icon name='network-strength-4-alert' size={25} color={"black"} />
              </>
              :

              NetInfo.isInternetReachable ? 

              
                <>
                  <Icon name='wifi' size={25} color={"black"} />
                </>
              :
              <>
                  <Icon name='wifi-alert' size={25} color={"black"} />
              </>
          }

        </View>

      </View>

      <View style={{height:height*0.35}}>
          <View style={{height:height*0.35,margin:15,flexDirection:"row",flexWrap:'wrap',justifyContent:"space-between",backgroundColor:"#DBE7F7",borderRadius:30}} >

          {
            arr.map((k,i)=>(
              <TouchableOpacity key={i}  style={{marginTop:height*0.04}}>
              <Image source={k.imgUrl} style={{height:80,width:80}} resizeMode={"contain"} />
              </TouchableOpacity>
            ))
          }



          </View>
      </View>

      <View style={{height:height*0.25,marginTop:10}}>
          <View style={{height:height*0.1,margin:15,backgroundColor:"#C7F6B6",borderRadius:10,flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
              <Text style={{color:"black",fontFamily:"Oswald"}}>Don't miss out!</Text>
              <TouchableOpacity style={{borderColor:"white",elevation:10}}>
                <Text style={{backgroundColor:"black",color:"white",padding:15,borderRadius:10,}}>Grab the Poké</Text>
              </TouchableOpacity>
          </View>

      </View>


      <View>
      <Image source={require('../../assets/images/star.png')}  style={{height:80,width:80,alignSelf:"flex-end",marginRight:15}} resizeMode={"contain"} />

      </View>
    </View>
  )
}