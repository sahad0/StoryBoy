import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { GestureDetector ,Gesture} from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { identity4, Matrix4, multiply4 } from 'react-native-redash';
import { Canvas,Image,useImage } from '@shopify/react-native-skia';

export default function StickerView() {

    const {width,height} = Dimensions.get("screen");
    const matrix = useSharedValue(identity4);
    const image = useImage(require("../../assets/images/695962.jpg"));



    const pan = Gesture.Pan().onChange((e)=>{
        matrix.value = multiply4(matrix.value,Matrix4.translate(e.changeX,e.changeY,0));
    });
    const pinch = Gesture.Pinch().onChange((e)=>{
        matrix.value = multiply4(matrix.value,Matrix4.scale(e.scaleChange,e.scaleChange,1));
    });
    const rotation = Gesture.Rotation().onChange((e)=>{
        matrix.value = multiply4(matrix.value,Matrix4.rotateZ(e.rotationChange));
    });


    const style= useAnimatedStyle(()=>{
        return {
            
            transform:[{matrix:matrix.value }]
        }
    })



  return (
    <View>
        <GestureDetector gesture={Gesture.Simultaneous(pan,pinch,rotation)}  >
            <Animated.View style={[style]}>
                <Canvas style={{height:height,width:width}}>
                <Image
                    image={image}
                    fit="cover"
                    x={0}
                    y={0}
                    width={width}
                    height={width}
                />
                    {/* <Image source={require("../../assets/images/696101.jpg")} style={{height:height,width:width}} />  */}
                </Canvas>
            </Animated.View>
      </GestureDetector>
    </View>
  )
}