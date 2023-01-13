import { View, Text, Dimensions,Image, Button, TouchableOpacity  } from 'react-native'
import React from 'react'
import Animated, { interpolate, SensorType, useAnimatedSensor, useAnimatedStyle,withTiming,  } from 'react-native-reanimated';
import OTPBox from './OTPBox';


export default function BackgroundImage() {

    const {width, height} = Dimensions.get("screen");
    const PI = Math.PI;
    const HALF = PI/2;
    const sensor = useAnimatedSensor(SensorType.ROTATION,{interval:1000});

    console.log(sensor.sensor.value);

    const parallaxStyle = useAnimatedStyle(()=>{
        const {pitch,roll,yaw} = sensor.sensor.value;
        return {
            left:withTiming(interpolate( roll,[-PI,PI],[-200,200]), { duration: 800 }), 
            top:withTiming(interpolate(pitch,[-PI,PI],[-200,0]), { duration: 800 }), 
        }
    });

  return (
<>
    <Text style={{position:"absolute",color:"white",fontFamily:"Speedy",fontSize:height*0.03,marginTop:height*0.8,zIndex:1,marginLeft:width*0.32}}>StoryBoy</Text>
    <TouchableOpacity style={{position:"absolute",marginTop:height*0.7,zIndex:5555,backgroundColor:"#deb9ff",width:width*0.1,borderRadius:height,alignSelf:"center"}}>
        <Image source={require("../../assets/images/logo.jpg")} style={{margin:0,borderRadius:height,padding:30,alignSelf:"center",height:20,width:20,}} resizeMode={"cover"}  />

    </TouchableOpacity>
    <View>
        <View style={{padding:height,position:"absolute",borderColor:"purple",borderWidth:0.2,borderRadius:height,alignSelf:"center",width:width*0.6,backgroundColor:"black",marginTop:height*0.6}} >
       
        </View>
       
        
        <Animated.Image source={require("../../assets/images/spider.png")} style={[parallaxStyle,{height:height*0.8,width:width,position:"absolute",zIndex:-1,transform:[{scale:1.3}]}]}  />

       

    </View>
    </>
  )

}