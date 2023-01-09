import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Alert, PermissionsAndroid,Platform } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import  RNFS from "react-native-fs";
import { useIsFocused } from '@react-navigation/native';
import { Gesture, GestureDetector,  } from 'react-native-gesture-handler';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import Reanimated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
  runOnJS
} from "react-native-reanimated"

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera)
Reanimated.addWhitelistedNativeProps({
  zoom: true,
})

export default function CameraDevice() {

    const {height,width} = Dimensions.get("screen");
    const [photoUrl,setPhotoUrl] = useState("");
    const [authorised,setAuthorized] = useState(false);
    const [openCamera,setOpenCamera] = useState(true);
    const [camPosition,setCamPosition] = useState('back');
    const camRef = useRef(0);





  useEffect(()=>{
      permAccess();
  },[])

  useEffect(()=>{
      if(camPosition==='front'){
        device = devices.front;
      }
      else{
        device = devices.back;
      }
  },[camPosition])


  const permAccess = async ()=>{
    try {
      const newCameraPermission = await Camera.requestCameraPermission();
      const newMicrophonePermission = await Camera.requestMicrophonePermission();

      if(newCameraPermission && newMicrophonePermission === "authorized"){
        setAuthorized(true);
      }
    } catch (error) {
      console.log(error);
    }
  }


  const devices = useCameraDevices();
  const supportsCameraFlipping = useMemo(() => devices.back != null && devices.front != null, [devices.back, devices.front]);
  let device =   camPosition === "front" ? devices.front : devices.back; 




  const captureImage = async()=>{
    try {
      console.log("Taking Photo");
      const photo = await camRef.current.takePhoto({
        flash: 'on'
      })
      
      const filePath = photo.path;
      console.log(filePath);
      const newPath = RNFS.ExternalStorageDirectoryPath + "/kkbhjbk.jpg";
      const temp =  await RNFS.moveFile(filePath,newPath) ;
      console.log(newPath);
      setPhotoUrl("file://"+newPath);
      savePicture(photoUrl);
      
      
    } catch (error) {
      console.log("Error SOrry");
    }
  }

    async function hasAndroidPermission() {
      const permission = Platform.Version >= 33 ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    
      const hasPermission = await PermissionsAndroid.check(permission);
      if (hasPermission) {
        return true;
      }
    
      const status = await PermissionsAndroid.request(permission);
      return status === 'granted';
    }

    async function savePicture(tag) {
      if (Platform.OS === "android" && !(await hasAndroidPermission())) {
        return;
      }
      CameraRoll.save(tag, { type:"photo" })
    }


  const onFlipCameraPressed = useCallback(() => {
    setCamPosition((p) => (p === 'back' ? 'front' : 'back'));
  }, []);

  const gestFunc = useCallback(() => {
    onFlipCameraPressed();
  }, [onFlipCameraPressed]);


  const tap = Gesture.Tap().numberOfTaps(2).onEnd(()=>{
      // console.log("Wow");
      try {
        runOnJS(gestFunc)();
        
      } catch (error) {
        console.log(error);
      }
    })










    const zoom = useSharedValue(0)

    const onRandomZoomPress = useCallback(() => {
      zoom.value = withSpring(Math.floor(Math.random()*8));
    }, [])
  
    const animatedProps = useAnimatedProps(
      () => ({ zoom: zoom.value }),
      [zoom]
    )



  // const isFocused = useIsFocused();

  return (
    <>
    <View style={{flex:1,alignItems:"center",justifyContent:"flex-end",marginBottom:height*0.1,zIndex:1,}}>
      <TouchableOpacity style={{margin:30}} onPress={captureImage}>
      <Text style={{color:"white"}}>Camera</Text>
          {/* 
              {supportsCameraFlipping===true ?
                ( <TouchableOpacity onPress={()=>{setCamPosition((p)=>(p=== 'back' ? 'front' : 'back'))}}>
                  <Text style={{color:"white"}}>Reverse</Text>
                </TouchableOpacity>):<></>
              } */}


      </TouchableOpacity>
      <TouchableOpacity style={{margin:30}} onPress={onRandomZoomPress}>
        <Text>Zoom</Text>
      </TouchableOpacity>

    </View>
    {
      device && supportsCameraFlipping  ? 
      <>
      <GestureDetector gesture={tap} >
          <ReanimatedCamera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={openCamera}
            photo={true}
            ref={camRef}
            animatedProps={animatedProps}
          />  
      </GestureDetector>
      </>
      :<><Text>No device found.</Text></>
    }
    </>

  )
}