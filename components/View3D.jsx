import { Canvas, FitBox, Path, rect, rotateY } from "@shopify/react-native-skia";
import {
  Viro3DObject,
  ViroARScene,
  ViroARSceneNavigator,
  ViroAmbientLight,
  ViroController,
  ViroMaterials,
  ViroNode,
  ViroOrbitCamera,
} from "@reactvision/react-viro";
import React, { Ref, useEffect, useRef, useState } from "react";
import { PermissionsAndroid, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useIsFocused } from "@react-navigation/native";
const initSceneAR = () => { 
  ViroMaterials.createMaterials({ wood: {
    shininess: 2.0, 
    lightingModel: "Blinn",
   diffuseTexture: require('../assets/models/obj/Image.png'), 
   }
   });
  return (
    <ViroARScene>
      <ViroNode
        
       position={[0,0,-1]}
       scale={[0.1,0.1,0.1]}
       dragType="FixedToWorld"
      onDrag={(dragToPos, source) => {    
        console.log('Drag', dragToPos, source);
      }}
  
      >
     <Viro3DObject 
        source={ require('../assets/models/normal/normal.obj')}
        resources={[
        require('../assets/models/normal/normal.mtl')]}
        materials={['wood']}
        type="OBJ"
      />
     </ViroNode>
      

      <ViroAmbientLight influenceBitMask={5}  color="#ffffff"/>
    </ViroARScene>
  );
};
const secondSceneAR=()=>{
  ViroMaterials.createMaterials({ wood: {
    shininess: 2.0, 
    lightingModel: "Blinn",
   diffuseTexture: require('../assets/models/obj/Image.png'), 
   }
   });

  return <ViroARScene>
  
    <ViroNode
     position={[0,0,-1.5]}
     scale={[0.1,0.1,0.1]}
     dragType="FixedToWorld"
    
    onDrag={(dragToPos, source) => { 
      source=2;   
      console.log('Drag', dragToPos, source);
      
      
    }}
  
    >
   <Viro3DObject 
      source={ require('../assets/models/exterior/exterior.obj')}
      resources={[
        require('../assets/models/exterior/exterior.mtl')]}
      materials={['wood']}
      type="OBJ"
    />
   </ViroNode>
   
   
       
    <ViroAmbientLight influenceBitMask={5} intensity={2020}  color="#ffffff"/>
  </ViroARScene>

}
const threeSceneAR=()=>{

  return <ViroARScene>
  
    <ViroNode
     position={[0,0,-1]}
     scale={[0.5,0.5,0.5]}
     dragType="FixedToWorld"
    

    onDrag={(dragToPos, source) => {    
      console.log('Drag', dragToPos, source);
      
    }}
  
    >
   <Viro3DObject 
      source={ require('../assets/models/moderno/moderno.obj')}
      resources={[
        require('../assets/models/moderno/moderno.mtl')]}
      type="OBJ"
    />
   </ViroNode>
   
   
       
    <ViroAmbientLight influenceBitMask={5} intensity={2020}  color="#ffffff"/>
  </ViroARScene>

}

export default (props) => {
  
  const ArRef=useRef(null)
 
  const isFocused = useIsFocused();
  useEffect(()=>{
    if(props.model==='exterior' &&  props?.ref?.current !== null){
    ArRef.current.arSceneNavigator.replace({ scene:secondSceneAR })
    }else if(props.model==='moderno' && ArRef.current !== null){
     ArRef.current.arSceneNavigator.replace({ scene:threeSceneAR })
    }else if( ArRef.current !== null) {
     ArRef.current.arSceneNavigator.replace({ scene:initSceneAR })
    }

  },[props.model])

 
  
  return (
    <>
    {isFocused?
    <>
    <ViroARSceneNavigator
      shadowsEnabled={true}
      worldAlignment='Gravity'
      autofocus={true}
      ref={ArRef}

      initialScene={{
        scene: ()=>initSceneAR(),
      }}
      style={styles.f1}
    />
   
    </>:null
    }</>
  );
};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
  button2:{
    position:'absolute', 
    bottom:20, 
    left:20,
    padding:15,
    backgroundColor:'black',
    borderRadius:15,
    opacity:0.8,
    zIndex:10
  },
});
