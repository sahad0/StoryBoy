import {check,request,PERMISSIONS,RESULTS,checkMultiple ,requestMultiple} from 'react-native-permissions';
import { Platform } from 'react-native';


const PLATFORM_MICROPHONE_PERMISSION = {
    ios: PERMISSIONS.IOS.MICROPHONE,
    android : PERMISSIONS.ANDROID.RECORD_AUDIO
}
const PLATFORM_CAMERA_PERMISSION = {
    ios: PERMISSIONS.IOS.CAMERA,
    android : PERMISSIONS.ANDROID.CAMERA,
}
const PLATFORM_WRITE_EXTERNAL_STORAGE = {
    ios: PERMISSIONS.IOS.MEDIA_LIBRARY,
    android : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
}


const REQUEST_PERMISSION_TYPE = {
    microphone : PLATFORM_MICROPHONE_PERMISSION,
    camera : PLATFORM_CAMERA_PERMISSION,
    writeStorage : PLATFORM_WRITE_EXTERNAL_STORAGE,
}



const PERMISSIONS_TYPE = {
    microphone : 'microphone',
    camera : 'camera',
    writeStorage : 'writeStorage'
}




    const multipleCheck = async (types) =>{
        try {

            for(let i =0;i<types.length;i++){
                const permission = REQUEST_PERMISSION_TYPE[types[i]][Platform.OS];
                console.log(permission);
                if(permission){
                    const result = await requestPermission(permission);
                }
            }
            
           
        } catch (error) {
            
        }
        
    }


















    const checkPermission = async (type) =>{
        const x = REQUEST_PERMISSION_TYPE[type][Platform.OS];
        check(x)
        .then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log('This feature is not available (on this device / in this context)');
              break;
            case RESULTS.DENIED:
              console.log('The permission has not been requested / is denied but requestable');
              requestPermission(x).then(()=>console.log("Granted"))

              break;
            case RESULTS.LIMITED:
              console.log('The permission is limited: some actions are possible');
              break;
            case RESULTS.GRANTED:

              break;
            case RESULTS.BLOCKED:
              console.log('The permission is denied and not requestable anymore');
              break;
          }
        })
        .catch((error) => {
          
        });
    }



    const requestPermission = async (permissions) =>{
        try {
            const result = await request(permissions);
            return result === RESULTS.GRANTED;
        } catch (error) {
            console.log("Denied");
            return false
        }
    }

export  {checkPermission,PERMISSIONS_TYPE,multipleCheck,}