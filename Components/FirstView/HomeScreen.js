import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
const logo = require('../../assets/images/poke.png');
const ball = require('../../assets/images/ball.png');


export default function HomeScreen() {

    const{width,height} = Dimensions.get("screen");

  return (
    <>
    <View  >
      {/* <Text>HomeScreen</Text> */}
      <Image source={logo} style={{height:height*0.6,width:width,alignSelf:"center"}} resizeMode={"contain"}  />
    </View>
    <TouchableOpacity  >
    <Image source={ball} style={{height:75,width:75,alignSelf:"center" }}/>
    </TouchableOpacity>
    </>


  )
}


