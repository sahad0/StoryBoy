import { View, Text, StyleSheet, SafeAreaView, StatusBar} from 'react-native'
import React, { useEffect } from 'react'
import BackgroundImage from './Components/FirstView/BackgroundImage';
import OTPBox from './Components/FirstView/OTPBox';
import Camera from './Components/SecondView/Camera/CameraDevice';
import {PERMISSIONS_TYPE ,multipleRequest,checkPermission,multipleCheck,} from "./Components/Permissions/AppPermission"
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GalleryRoll from './Components/SecondView/GalleryRoll/GalleryRoll';

 function App() {


  useEffect(()=>{
   checkPermission(PERMISSIONS_TYPE.writeStorage);
  },[]);


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaView style={styles.bodyContainer} >
      <StatusBar  hidden/>
      {/* <BackgroundImage /> */}
      {/* <OTPBox />      */}
      {/* <Camera /> */}
      <GalleryRoll />
    </SafeAreaView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({

  bodyContainer : {
    flex : 1,
    backgroundColor:"black"
    
  }
  
})

export default App;
