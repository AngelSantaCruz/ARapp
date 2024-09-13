import { BackdropBlur, Canvas, Fill, FitBox,  Path, rect } from '@shopify/react-native-skia'
import React, {  useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Animated, Button, FlatList, StyleSheet, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native'
import {botMsj,
  getPrices,
  tablesMtMsj,
  productsMsj,
  tablesEMsj,
  tablesMsj,
  supportMsj,
   getOrders} from '../constants/Bot'
import {cameraIcon,
  insideCamera,
    xIcon,
    questionsIcon,
    sendIcon,
    botIcon} from '../constants/Icons'
import { router } from 'expo-router'

interface prop{
    open:boolean,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    selectModel:React.Dispatch<React.SetStateAction<string>>
}

interface DataType {
  user: string;
  data: {
    textType: string;
    text: string;
  };
}

function Chat({open, setOpen,selectModel}:prop) {
const [text, setText] = useState('');

const [chatContext, setchatContext] = useState(botMsj);

const flatListRef = useRef<FlatList<DataType>>(null);


const animatedValues=React.useRef(new Animated.Value(600)).current;

const scaleValues=React.useRef(new Animated.Value(0.8)).current;

const translateInterpolation= animatedValues.interpolate({
    inputRange:[0,600],
    outputRange:[30,600]
})

const scaleInterpolation= scaleValues.interpolate({
  inputRange:[0,1],
  outputRange:[0.8,1.2]
})
const StartAnimationOpen=()=>{
    Animated.spring(animatedValues, {
        useNativeDriver:true,
        toValue:5
    }).start()
}
const StartAnimationClose=()=>{
    Animated.spring(animatedValues, {
        useNativeDriver:true,
        toValue:600
    }).start()
    Animated.spring(scaleValues, {
      useNativeDriver:true,
      toValue:0.8
  }).start()
}

const scale=()=>{
  Animated.spring(scaleValues, {
      useNativeDriver:true,
      toValue:1.2
  }).start()
}
const animatedStyle={
    transform:[
        {
            translateY:translateInterpolation
        }
    ]
}
const AnimatedScale={
  transform:[
    {
      scale: scaleInterpolation
    }
  ]
  
}

useEffect(() => {
  if (flatListRef.current) {
    flatListRef.current.scrollToEnd({ animated: true });
  }
}, [chatContext]);

  return (
    <>
    <Animated.View style={[styles.chatOpen,animatedStyle]} >
              <View  style={{position:'relative',width:'100%',height:600,paddingBottom:0,display:'flex', flexDirection:'column', alignItems:'center' }}>
                <Canvas style={{
                  position:'absolute',
                  height:'100%', 
                  width:'100%',  
                  borderWidth: 5,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  flex:1}} >
                  
                <BackdropBlur blur={4} >
                  <Fill color="rgba(255, 255, 255, 0.4)" />
                </BackdropBlur>
                  
          
                </Canvas>
                <View style={{position:'relative', flex:0.1, top:20 , display:'flex' ,flexDirection:'row', width:'100%',padding:20,justifyContent:'center', height:80}}>
                  <View style={{ display:'flex' ,flexDirection:'row', gap:5,position:'relative',flex:0.9}}>
                
                        <Canvas style={{ width: 30, height: 30 }}>
                        <FitBox src={rect(0, 0, 24, 24)} dst={rect(0, 0, 30, 30)}>
                        <Path 
                        path={"M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"} 
                        color="#ffffff"
                        strokeCap="round"
                        strokeJoin="round"
                        style="stroke"
                        strokeWidth={1.8}/>
                        </FitBox>
                      </Canvas>
                    <Text style={{color:'white', fontSize:20}}>
                  Chat</Text>
                  </View>  
                  <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    style={{padding:8, borderRadius:10}}
                    onPress={() =>{ 
                        StartAnimationClose()
                        setOpen(false)}}> 
                    
                      <Canvas style={{ width: 30, height: 30 }}>
                        <FitBox src={rect(0, 0, 24, 24)} dst={rect(0, 0, 30, 30)}>
                        <Path 
                        path={xIcon} 
                        color="#ffffff"
                        strokeCap="round"
                        strokeJoin="round"
                        style="stroke"
                        strokeWidth={3}/>
                        </FitBox>
                      </Canvas>
                  </TouchableHighlight>
                </View>
                <FlatList
                  ref={flatListRef}
                  style={{position:'relative', display:'flex' ,flexDirection:'column', width:'100%',padding:15 , flex:0.7,paddingBottom:30}}
                      data={chatContext}
                      renderItem={({item,index}) => {
                        
                          if( item.data.text === 'loading...'){
                            return item?.user !== 'bot' ? 
                            <View style={styles.msj} key={index}>
                             <ActivityIndicator size="small" color="#0000ff"  />
                            </View>
                            : <View style={styles.msjBot} key={index}>
                              <ActivityIndicator size="small" color="#0000ff"  />
                            </View>
                            }else{
                              return  item?.user !== 'bot' ? 
                              <View style={styles.msj} key={index}> 
                                <View style={{backgroundColor:'black', opacity:0.2, width:'100%', height:'100%', position:'absolute',padding:15, borderRadius:10}}></View>        
                                <Text style={{fontSize:16,color:'white', fontWeight:'600',padding:15}}>{item.data.text}</Text>
                              </View>
                              :
                              <TouchableWithoutFeedback  key={index} onPress={()=>{
                                  if(item.data.textType==='button'){
                                    setchatContext((e)=>{
                                      return[ ...e, {user:'user',data: {textType:'tittle', text:item.data.text}}]
                                    });
                                    setText('');
                                    setTimeout(()=>{
                                    
                                        setchatContext((e)=>{
                                          if(item.data.text === 'Cuales son los productos más vendidos?'){
                                            return e.concat(productsMsj)
                                          }else if(item.data.text === 'En cuanto tiempo obtendré mi orden?'){
                                            return e.concat(getOrders)
                                          }else if (item.data.text === 'Cómo puedo saber el precio de los productos?'){
                                            return e.concat(getPrices)
                                          }else if (item.data.text === '1) Mesa de exteriores'){
                                            selectModel('exterior')
                                            return e.concat(tablesEMsj)
                                          }else if (item.data.text === '2) Mesa interiores clasica'){
                                            selectModel('normal')
                                            return e.concat(tablesMsj)
                                          }else if (item.data.text === '3) Mesa interiores Moderna'){
                                            selectModel('moderno')
                                            return e.concat(tablesMtMsj)
                                          }else{
                                            return e.concat(supportMsj)
                                          }
                                          
                                        });
                                    }, 500)
                              
                                  }else{
                                    return null
                                  }
                                }}>
                                <View style={styles.msjBot}>
                                  <View style={{backgroundColor:'black', opacity:0.2, width:'100%', height:'100%', position:'absolute',padding:15, borderRadius:10}}></View>        
                                  <View style={{padding:15,flex:0.4,borderRadius:15, width:'100%',display:'flex',flexDirection:'row',gap:4, alignItems:'center'}}>
                                  {item.data.textType!=='button'?
                                  <Canvas style={{ width: 30, height: 35, }}>
                                    <FitBox src={rect(0, 0, 24, 20)} dst={rect(0, 0, 40, 40)}>
                                    <Path 
                                    path={botIcon} 
                                    color="#ffffff"
                                    strokeCap="round"
                                    strokeJoin="round"
                                    style="stroke"
                                    strokeWidth={1}/>
                                    </FitBox>
                                  </Canvas>
                                  :
                                  <Canvas style={{ width: 30, height: 35 }}>
                                  <FitBox src={rect(0, 0, 24, 20)} dst={rect(0, 0, 30, 30)}>
                                  <Path 
                                  path={questionsIcon} 
                                  color="#ffffff"
                                  strokeCap="round"
                                  strokeJoin="round"
                                  style="stroke"
                                  strokeWidth={1}/>
                                  </FitBox>
                                  </Canvas>}
                                  <Text style={{fontSize:16,width:'90%', color:'white'}}>{item.data.text}</Text>
                                  </View>
                                </View>
                              </TouchableWithoutFeedback>;
                          }
                        
                       
                      }}
                />
                <View style={{alignItems:'flex-start',gap:4 ,position:'relative',display:'flex' ,flexDirection:'row', width:'100%',padding:20,justifyContent:'center', backgroundColor:'#454545', opacity:0.55,flex:0.2 }}>
                  <View style={{ display:'flex' ,flexDirection:'row', gap:5,position:'relative',flex:1 , width:200, height:50, backgroundColor:'white', padding:10, borderRadius:10}}>
                      <TextInput
                          style={{height: 25 , width:180}}
                          placeholder="Escribe aqui!"
                          onChangeText={newText => setText(newText)}
                          defaultValue={text}
                          onSubmitEditing={()=>{
                            if(text!== '' && text){
                              setchatContext((e)=>{
                              return[ ...e, {user:'user',data: {textType:'tittle', text:text}}]
                              });
                              setText('');
                              setchatContext((e)=>{
                                if(text.includes('/productos')){
                                  return e.concat(productsMsj)
                                }else if(text.includes('/soporte')){
                                  return e.concat(supportMsj)
                                }else if (text.includes('/precios')){
                                  return e.concat(getPrices)
                                }else if (text === '/tableExterior'){
                                  selectModel('exterior')
                                  return e.concat(tablesEMsj)
                                }else if (text === '/tableInteriorClasica'){
                                  selectModel('normal')
                                  return e.concat(tablesMsj)
                                }else if (text === '/tableInteriorModerna'){
                                  selectModel('moderno')
                                  return e.concat(tablesMtMsj)
                                }else{
                                  return e
                                }
                                
                              });
                            }
                          }}
                        />
                  </View>  
                  <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    style={{padding:4, borderRadius:10, height:40, width:40}}
                    onPress={() =>{ 
                      if(text!== '' && text){
                        setchatContext((e)=>{
                        return[ ...e, {user:'user',data: {textType:'tittle', text:text}}]
                        });
                        setText('');
                        setchatContext((e)=>{
                          if(text.includes('/products')){
                            return e.concat(productsMsj)
                          }else if(text.includes('/supports')){
                            return e.concat(supportMsj)
                          }else if (text.includes('/price')){
                            return e.concat(getPrices)
                          }else if (text.includes('/tableExterior')){
                            selectModel('exterior')
                            return e.concat(tablesEMsj)
                          }else if (text.includes('/tableInteriorClasica')){
                            selectModel('normal')
                            return e.concat(tablesMsj)
                          }else if (text.includes('/tableInteriorModerna')){
                            selectModel('moderno')
                            return e.concat(tablesMtMsj)
                          }else{
                            return e
                          }
                          
                        });
                      }
                      }}> 
                    
                      <Canvas style={{ width: 30, height: 25 }}>
                        <FitBox src={rect(0, 0, 20, 24)} dst={rect(0, 0, 28, 28)}>
                        <Path 
                        path={sendIcon} 
                        color="#ffffff"
                        strokeCap="round"
                        strokeJoin="round"
                        style="stroke"
                        strokeWidth={2}/>
                        </FitBox>
                      </Canvas>
                  </TouchableHighlight>
                </View>
                
              </View>
    </Animated.View> 
    <TouchableWithoutFeedback
    onPress={()=>{
        scale()
        StartAnimationOpen()
        setOpen(true)}}  >
        <Animated.View  style={[styles.button,AnimatedScale, open?{display:'none'}:null]} >
            <Canvas style={{width:32,height:32 , display:'flex', alignItems:'center', justifyContent:'center' }}>
                <FitBox src={rect(0, 0, 20, 20)} dst={rect(0, 0, 28, 28)}>
                    <Path 
                    path={"M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"} 
                    color="#ffffff"
                    strokeCap="round"
                    strokeJoin="round"
                    style="stroke"
                    strokeWidth={1.8}/>
                </FitBox>
            </Canvas>
        </Animated.View>
    </TouchableWithoutFeedback>
    
    <TouchableWithoutFeedback
    onPress={()=>{
      router.push("/(tabs)/")}}  >
       

        <Animated.View  style={[styles.buttonBack,AnimatedScale]} >
            <Canvas style={{width:22,height:22 , display:'flex', alignItems:'center', justifyContent:'center' }}>
                <FitBox src={rect(0, 0, 20, 20)} dst={rect(0, 0, 20, 20)}>
                    <Path 
                    path={"M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"} 
                    color="#ffffff"
                    strokeCap="round"
                    strokeJoin="round"
                    style="stroke"
                    strokeWidth={1.8}/>
                </FitBox>
            </Canvas>
        </Animated.View>
    </TouchableWithoutFeedback>
    </>
  )
}
const styles = StyleSheet.create({
    chatOpen:{
        position: 'absolute',
        width:'100%',
        height:600,
        bottom:0,
        paddingBottom:0,
        display:'flex',
        flexDirection:'column',
        borderRadius:4,
        zIndex:20
        
      },
      button:{
        position:'absolute', 
        bottom:20, 
        right:20,
        padding:15,
        backgroundColor:'black',
        borderRadius:15,
        opacity:0.8,
        zIndex:10
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
      buttonBack:{
        position:'absolute', 
        top:40, 
        left:20,
        padding:15,
        backgroundColor:'black',
        borderRadius:15,
        opacity:0.8,
        zIndex:10
      },
      msj:{
        position:'relative',
        flex:0.4,
        borderRadius:15,
        width:'80%',
        marginBottom:20,
        marginLeft:'20%'

      },
      msjBot:{
        
        flex:0.4,
        width:'80%',
        marginBottom:20,
      
        

      }


})
export default Chat