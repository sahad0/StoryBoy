import { View, Text, Dimensions, TouchableOpacity, TextInput, Pressable, Keyboard, Button } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import RNOTPVerify, { useOtpVerify } from 'react-native-otp-verify';

export default function OTPBox({maxLength = 4,}) {
    const {width,height} = Dimensions.get("screen");
   


    const [code,setCode] = useState("");
    const [focused,setFocused] = useState(false);
    const [no,setNo] = useState(0);
    const ref = useRef(0);
    let arr = [];
    arr.length = maxLength;
    arr.fill(" ");


// You can use the startListener and stopListener to manually trigger listeners again.
// optionally pass numberOfDigits if you want to extract otp
// const { hash, otp, message, timeoutError, stopListener, startListener } = useOtpVerify({numberOfDigits: 4});
    

    useEffect(()=>{
        // RNOTPVerify.getHash().then(k=>{console.log(k);});
        RNOTPVerify.getOtp().then(p =>{
            RNOTPVerify.addListener(message => {
                try {
                    if(message){
                        const otp = /(\d{4})/g.exec(message)[1];
                        setCode(otp);
                    }
                    } catch (error) {
                        console.log(error);
                    }
            })

        }).catch(err=>{console.log(err);})

        return ()=>{RNOTPVerify.removeListener()}
    },[]);




       
   
    useEffect(()=>{
        if(focused){
                ref.current.focus();
        }
        else{
            ref.current.blur();
        }
    },[focused]);

    useEffect(()=>{
        setNo(code.length);
        console.log(no);
    },[code]);


    const OTPhandler = ()=> {
        console.log("Started");
        startOtpListener(message => {
        // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
        
      });
    }

  

  return (
    <>
    <View style={{alignItems:"center",justifyContent:"center",flex:1}}>

    <TouchableOpacity onPress={()=>{setFocused(false),Keyboard.dismiss()}}  style={{flex:1}}>
    <View style={{marginTop:height*0.3}}>
      <Text style={{color:"white",marginLeft:width*0.05,fontFamily:"Speedy",fontSize:height*0.025}}>Spider Auto Fill</Text>

        <View style={{marginTop:height*0.1,flex:1,backgroundColor:"black",alignSelf:"center",flexDirection:"row",justifyContent:"space-around",width:width}}>
        
        {
                arr.map((_,i)=>{
                    return (
                        <TouchableOpacity onPress={()=>{setFocused(true)}} key={i} style={{height:50,width:50,borderColor:code[i] ? "purple": no===i?"purple":"white",borderWidth:1,borderRadius:width*0.02}}>
                            <Text style={{fontSize:height*0.04,color:"purple",alignSelf:"center"}}>{code[i]? code[i]:" "}</Text>
                        </TouchableOpacity>
                    )
                })
        }
        
        </View>

    </View> 
    {/* <Button title='WO' />  */}
    
    </TouchableOpacity>
       
    </View>
    <TextInput  onChangeText={(e)=>{setCode(e)}}  ref={ref} style={{position:"absolute",color:"black",opacity:0,marginTop:height*2}} keyboardType={"number-pad"} maxLength={maxLength} />
    </>
  )
}