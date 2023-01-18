import { View, Text, Dimensions, TouchableOpacity, TextInput, Pressable, Keyboard, Button, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import RNOTPVerify, { useOtpVerify , requestHint} from 'react-native-otp-verify';
import Icons from 'react-native-vector-icons/Ionicons'

export default function OTPBox({maxLength = 4,navigation}) {
    const {width,height} = Dimensions.get("screen");
   


    const [code,setCode] = useState("");
    const [focused,setFocused] = useState(false);
    const [hint,setHint] = useState("");

    const [no,setNo] = useState(0);
    const ref = useRef(0);
    let arr = [];
    arr.length = maxLength;
    arr.fill(" ");


 

    useEffect(()=>{
        RNOTPVerify.getHash().then(k=>{console.log(k);});
        requestHint().then((val)=>setHint(val)).catch();
        RNOTPVerify.getOtp().then(p =>{
            RNOTPVerify.addListener(message => {
                try {
                    if(message){
                        const otp = /(\d{4})/g.exec(message)[1];
                        setCode(otp);
                    }
                    } catch (error) {
                        // console.log(error);
                    }
            })

        }).catch()

        return ()=>{RNOTPVerify.removeListener()}
    },[]);



    // useEffect(()=>{
    //     console.log(hint);
    // },[hint])
       
   
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
        // console.log(no);
    },[code]);


    const OTPhandler = ()=> {
        console.log("Started");
        startOtpListener(message => {
        // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
        
      });
    }

  

  return (
    <>
    <View style={{flex:1,backgroundColor:"white"}}>
    <View style={{alignItems:"center",justifyContent:"center",flex:1,backgroundColor:"white"}}>

    <TouchableOpacity activeOpacity={1} onPress={()=>{setFocused(false),Keyboard.dismiss()}}  style={{flex:1}}>

    <View >
        {/* <Image source={require('../../assets/images/pika.png')} style={{height:150,width:150}} resizeMode={"contain"} /> */}
        <TouchableOpacity onPress={()=>{navigation.navigate("Home")}} style={{backgroundColor:"white",height:height*0.075,width:height*0.075,margin:20,borderRadius:height,borderColor:"black",elevation:8,justifyContent:"center",alignItems:"center"}}>
                <Icons name='ios-chevron-back-outline' size={30}  color={"black"} />
        </TouchableOpacity>
        {
            hint ? <Text style={{color:"gray",margin:25,marginBottom:0,fontFamily:"OswaldL",fontSize:20}}>Otp has been sent to your mobile no: {hint?hint:""}</Text> : <><Text style={{color:"gray",margin:25,marginBottom:0,fontFamily:"OswaldL",fontSize:20}}>Sorry, no phone no detected !</Text></>
        }

        <View style={{backgroundColor:"black",marginTop:height*0.1,backgroundColor:"white",flexDirection:"row",justifyContent:"space-around",width:width}}>
        
        {
                arr.map((_,i)=>{
                    return (
                        <TouchableOpacity activeOpacity={0.5} onPress={()=>{setFocused(true)}} key={i} style={{elevation:3,height:50,width:50,borderColor:code[i] ? "#050167": no===i?"#050167":"black",borderWidth:2,borderRadius:width*0.02}}>
                            <Text style={{fontSize:height*0.04,color:"black",alignSelf:"center"}}>{code[i]? code[i]:" "}</Text>
                        </TouchableOpacity>
                    )
                })
        }
        
        </View>
        <View style={{flexDirection:"row",margin:22,marginTop:50}}>
            <Text style={{color:"gray",}}>Didn't recieve code?</Text>
            <TouchableOpacity>
            <Text style={{color:"black",marginLeft:7,textDecorationLine:"underline"}}>Request again</Text>
            </TouchableOpacity>
        </View>

    </View> 
    {/* <Button title='WO' />  */}
    
    </TouchableOpacity>
       
    </View>
    <TextInput  onChangeText={(e)=>{setCode(e)}}  ref={ref} style={{position:"absolute",color:"black",opacity:0,marginTop:height*2}} keyboardType={"number-pad"} maxLength={maxLength} />
    
    <TouchableOpacity onPress={()=>{navigation.navigate("Action")}} style={{backgroundColor:"white"}}>
    <Image source={require('../../assets/images/gym.png')} style={{height:75,width:75,margin:50,marginLeft:width*0.75}} resizeMode={"contain"} />

    </TouchableOpacity>
    </View>
    </>
  )
}