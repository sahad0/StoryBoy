import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Alert } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import  RNFS from "react-native-fs";
import { useIsFocused } from '@react-navigation/native';
import { Gesture, GestureDetector,  } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

export default function CameraDevice() {

    const {height,width} = Dimensions.get("screen");
    const [photourl,setPhotoUrl] = useState("");
    const [authorised,setAuthorized] = useState(false);
    const [openCamera,setOpenCamera] = useState(true);
    const [camPosition,setCamPosition] = useState('back');
    
    const   [tapNumber, setTapNumber] = useState(0)
    const camRef = useRef(0);



  useEffect(()=>{
      permAccess();
  },[])


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


  useEffect(()=>{
      if(camPosition==='front'){
        device = devices.front;
      }
      else{
        device = devices.back;
      }
  },[camPosition])

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
      
      
    } catch (error) {
      console.log("Error SOrry");
    }
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
      {
        photourl ? 
        <>
          <Image source={{uri:photourl}} style={{height:height,width:width,zIndex:99999}} />

        </>
         : 
         <></>
      }

     
    </View>
    {
      device  ? 
      <>
      <GestureDetector gesture={tap} >
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={openCamera}
            photo={true}
            ref={camRef}
          />  
      </GestureDetector>
      </>
      :<><Text>No device found.</Text></>
    }
    </>

  )
}