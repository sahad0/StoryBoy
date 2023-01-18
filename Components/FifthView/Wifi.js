import { View, Text, Button, Linking, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import WifiManager from 'react-native-wifi-reborn';

export default function Wifi() {

    const [wifi,setWifi] = useState(false);
    const [list,setList] = useState([]);
    useEffect(()=>{
        turnOn();
    },[]);

    useEffect(()=>{
        console.log(wifi);
    },[wifi])


    const turnOn = async()=>{
        const enabled = await WifiManager.isEnabled();

        if(!enabled){
          Platform.OS === 'ios' 
          ? Linking.openURL('App-Prefs:Bluetooth')
          : Linking.sendIntent("android.settings.WIFI_SETTINGS");
          const enabled = await WifiManager.isEnabled();
          setWifi(true);

        }

        else{

          const y = await WifiManager.loadWifiList();
          if(y){
            setList(y);
          }
        }
    }


  return (
    <View>
<Button
    title={wifi ?  "Connect to WIfi":  'Wifi Settings' }
      onPress={turnOn}
  />
    </View>
  )
}