import { View, Text, StyleSheet, SafeAreaView, StatusBar} from 'react-native'
import React from 'react'
import BackgroundImage from './Components/FirstView/BackgroundImage';
import OTPBox from './Components/FirstView/OTPBox';

 function App() {
  return (
    <SafeAreaView style={styles.bodyContainer} >
      <StatusBar  hidden/>
      {/* <BackgroundImage /> */}
      <OTPBox />     

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  bodyContainer : {
    flex : 1,
    backgroundColor:"black"
    
  }
  
})

export default App;
