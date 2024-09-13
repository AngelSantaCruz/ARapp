import { StyleSheet, Platform, ImageBackground, Text, TouchableOpacity, View, ScrollView, Button } from 'react-native';

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  useTheme,
} from "@react-navigation/native";
import { router, useFocusEffect } from 'expo-router';
import Header from '../../components/Header';
import { useState } from 'react';
import { Image } from "expo-image";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [source, setSource]=useState<string>('close')
  const [Cap, setCap]=useState<any>([])

  const [hasExecuted, setHasExecuted] = useState(false);
  const colorScheme = useTheme();

  const asyncCap = async ()=>{
    try {
      const allkeys= await AsyncStorage.getAllKeys()
      const value = await AsyncStorage.multiGet(allkeys);
      if (value !== null) {
        setCap(value)
      }
    } catch (e) {
      // error reading value
    }
  }
 


useFocusEffect(() => {
  if(!hasExecuted){
    asyncCap()
    setHasExecuted(true);
  }
});
  return (
    <ThemeProvider
    value={colorScheme.dark === false ? DarkTheme : DefaultTheme}
  >
    <ScrollView style={styles.container}>
        <ImageBackground
          source={colorScheme.dark === false ?require('../../assets/images/gradient-bg.png') : require('../../assets/images/gradient-bg-dark.png')}
          style={styles.mainContainer}
        >
          <Header atHome={true} />
          <View style={styles.cards}>
            <View style={styles.cardsRow}>
              <TouchableOpacity
                style={[
                  styles.card,
                  styles.cardFullWidth,
                  {
                    backgroundColor:
                      colorScheme.dark === false ? "#FFFFFF" : "#0D1822",
                    borderColor:
                      colorScheme.dark === false
                        ? "rgba(0, 0, 0, 0.1)"
                        : "rgba(255, 255, 255, 0.1)",
                  },
                ]}
                onPress={() => {
                  router.push('/(tabs)/chat');
                }}
              >
                {colorScheme.dark === false ? (
                  <ImageBackground source={require('../../assets/images/chat.png')} style={styles.cardIcon} />
                ) : (
                  <ImageBackground
                    source={require('../../assets/images/chat-dark.png')}
                    style={styles.cardIcon}
                  />
                )}
                <Text style={styles.cardHeader}>Comienza a chatear</Text>
                <Text>
                  Chatea con nuestro chatBot y obtén una vista previa de nuestros productos
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cardsRow}>
              <TouchableOpacity
                style={[
                  styles.card,
                  {
                    backgroundColor:
                      colorScheme.dark === false ? "#FFFFFF" : "#0D1822",
                    borderColor:
                      colorScheme.dark === false
                        ? "rgba(0, 0, 0, 0.1)"
                        : "rgba(255, 255, 255, 0.1)",
                  },
                ]}
                onPress={() => {
                  router.push("/(tabs)/ideas");
                }}
              >
                {colorScheme.dark === false ? (
                  <ImageBackground source={require('../../assets/images/ideas.png')} style={styles.cardIcon} />
                ) : (
                  <ImageBackground
                    source={require('../../assets/images/ideas-dark.png')}
                    style={styles.cardIcon}
                  />
                )}
                <Text style={styles.cardHeader}>Ideas</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.card,
                  {
                    backgroundColor:
                      colorScheme.dark === false ? "#FFFFFF" : "#0D1822",
                    borderColor:
                      colorScheme.dark === false
                        ? "rgba(0, 0, 0, 0.1)"
                        : "rgba(255, 255, 255, 0.1)",
                  },
                ]}
                onPress={() => {
                  router.push("/(tabs)/news");
                }}
              >
                {colorScheme.dark === false ? (
                  <ImageBackground source={require('../../assets/images/news.png')} style={styles.cardIcon} />
                ) : (
                  <ImageBackground
                    source={require('../../assets/images/news-dark.png')}
                    style={styles.cardIcon}
                  />
                )}
                <Text style={styles.cardHeader}>Noticias</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.card,
                  {
                    backgroundColor:
                      colorScheme.dark === false ? "#FFFFFF" : "#0D1822",
                    borderColor:
                      colorScheme.dark === false
                        ? "rgba(0, 0, 0, 0.1)"
                        : "rgba(255, 255, 255, 0.1)",
                  },
                ]}
                onPress={() => {
                  router.push("/(tabs)/help");
                }}
              >
                {colorScheme.dark === false ? (
                  <ImageBackground source={require('../../assets/images/help.png')} style={styles.cardIcon} />
                ) : (
                  <ImageBackground
                    source={require('../../assets/images/help-dark.png')}
                    style={styles.cardIcon}
                  />
                )}
                <Text style={styles.cardHeader}>Soporte</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.savedShotsContainer} >
         <Text style={{fontSize:20, fontWeight:"bold" }}>Captures recientes</Text> 
        {Cap.length > 0? 
          <Button   title="Eliminar"/>
          :
          null}
          <View style={styles.savedShots}>
            {Cap?.map((item:any, index:any)=>{
              if(typeof item !== null || typeof item !== undefined  ){
                return <Image
                onTouchStart={()=>{
                  setSource(JSON.parse(item[1]).uri)
                }}
                key={index} 
                source={JSON.parse(item[1]).uri} 
                alt="capture" 
                contentFit="cover" 
                style={{width:'auto', height:100, flexBasis:'30%',backgroundColor:'red', borderRadius:15}}
                  />
              }
          
       
          })}
          </View>
         
       </View>
      { source==='close'?null:
      <>
      <View onTouchStart={()=>{
        setSource('close')

      }} style={{position:'absolute',zIndex:50,width:'100%', height:'100%', backgroundColor:'#000000', opacity:0.7}} ></View>
       <View 

       style={{padding:10,position:"absolute",zIndex:60,width:'80%', height:'70%',top:'15%',left:'10%',maxHeight:500 ,maxWidth:500, backgroundColor:'#ffffff'}} >
        <Image
        style={{ width:'100%', height:'100%'}}
        source={source}
        alt="capture" 
        contentFit="fill" 
        />
      </View>
      </>}
    </ScrollView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
    display:'flex',
    flexDirection:'column'
  },
  mainContainer: {
    width: "100%",
    height: 'auto',
    display: "flex",
  },
  cards: {
    padding: 20,
    width: "100%",
    gap: 20,
  },
  cardsRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    width: "30%",
    minHeight: 80,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
    padding: 15,
    gap: 20,
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: "700",
  },
  cardFullWidth: {
    width: "100%",
  },
  cardIcon: {
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  savedShots: {
    width: "100%",
    height: "auto",
    position: "relative",
    display:'flex',
    gap:4,
    flexDirection:'row',
    flexWrap:"wrap",
    marginTop:10,
    

  },
  savedShotsContainer: {
    width: "100%",
    height: 400,
    padding: 20,
    position: "relative",
    marginTop: 10,
    display:'flex',  
    gap:4,
    flexDirection:'column',

  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: "700",
  },
  shotsRow: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shot: {
    width: "48%",
    height: 100,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    display:'flex',
    flexBasis:'33%'
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
    height:'100%'
  },
});
