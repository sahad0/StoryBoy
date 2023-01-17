import { View, Text, Dimensions,Image, Button, TouchableOpacity  } from 'react-native'
import React from 'react'
import Animated, { interpolate, SensorType, useAnimatedSensor, useAnimatedStyle,withTiming,  } from 'react-native-reanimated';



export default function SensorHelper({imgSrc,index}) {
    const {width, height} = Dimensions.get("screen");
    const PI = Math.PI;
    const HALF = PI/2;
    const sensor = useAnimatedSensor(SensorType.ROTATION,);


    const parallaxStyle = useAnimatedStyle(()=>{
        const {pitch,roll,yaw} = sensor.sensor.value;
        // console.log(roll.toFixed(1));
        return {
            left:withTiming(interpolate( roll,[-1,1],[0,35*index]), {  duration:200}), 
            top:withTiming(interpolate(pitch,[-1,0],[35*index,0]), {duration:200  }), 
        }
    });

  return (
    <>
    <Animated.Image  source={imgSrc} style={[parallaxStyle,{width:width+20,height:height+50,position:"absolute",top:0,left:0}]} />
    </>
  )
}