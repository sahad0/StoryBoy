import { View, Text, Platform, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react';
import Contacts from "react-native-contacts";

const ContactList = () => {
    const [access,setAccess] = useState(false);
    const [list,setList] = useState([]);

    useEffect(()=>{
        const x = hasAndroidPermission();
        
    },[]);

    useEffect(()=>{
        if(access){
            fetchList();
        }
    },[access]);


    async function fetchList(){
        try {
            const list = await Contacts.getAll();
            if(list){
                setList(list);
            }
            console.log(JSON.stringify(list[1]));
        } catch (error) {
            console.log(error);
        }
    }


    async function hasAndroidPermission() {
        try {
            const permission =  PermissionsAndroid.PERMISSIONS.READ_CONTACTS;
      
            const hasPermission = await PermissionsAndroid.check(permission);
            if (hasPermission) {
                setAccess(true);
                return true;
            }
      
            const status = await PermissionsAndroid.request(permission);
            
            return status === 'granted';
        } catch (error) {
            console.log(error);
        }
      }



  return (
    <View>
      <Text>ContactLIst</Text>
    </View>

  )
}

export default ContactList