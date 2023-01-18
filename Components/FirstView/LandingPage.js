import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'

const LandingPage = () => {

    const{width,height} = Dimensions.get("screen");



  return (
    <View>
      <Image source={require('../../assets/images/Otp.png')} style={{width:width,height:height}} />
    </View>
  )
}

export default LandingPage