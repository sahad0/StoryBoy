import React, {useEffect, useState} from 'react';
import {Button, ScrollView,View,Image,Text} from 'react-native';
import {CameraRoll, useCameraRoll} from "@react-native-camera-roll/camera-roll";

function GalleryRoll() {
    const [state, setState] = useState([]);

    const _handleButtonPress = () => {
        CameraRoll.getPhotos({
            first: 50,
            after:"25",
            assetType: 'Photos',
          })
          .then(r => {
           setState(r.edges);
          })
          .catch((err) => {
             //Error Loading Images
          });
        };


        useEffect(()=>{
            console.log(JSON.stringify(state));
        },[state])

        return (
            <View>
              <Button title="Load Images" onPress={_handleButtonPress} />
             
              <ScrollView>
              {state && state.map((p, i) => {
                return (
                    <Image
                    key={i}
                    style={{
                        width: 300,
                        height: 100,
                    }}
                    source={{ uri: p.node.image.uri }}
                    />
                );
                })}
                
               
              </ScrollView>
            </View>
          );
  
};

export default GalleryRoll;