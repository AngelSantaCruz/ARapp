import {  StyleSheet} from 'react-native';

import {  useImage } from '@shopify/react-native-skia';
import { useCallback, useEffect, useRef, useState } from 'react';
import{ captureScreen } from 'react-native-view-shot';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Chat from '../../components/Chat';
import View3D from '../../components/View3D';
import * as MediaLibrary from 'expo-media-library';
import { router } from 'expo-router';
import * as ScreenCapture from 'expo-screen-capture';
import { imageList } from '../../constants/ImageCache';

export default function TabChatScreen() {
  const [open,setOpen]=useState(false)
  const [Model,setModel]=useState('normal')
  const [albums, setAlbums] = useState<MediaLibrary.Album[]>([]);
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const image = useImage(require("../../assets/images/gradient-bg.png"));
  const [status, requestPermission] = MediaLibrary.usePermissions();
  
  const hasPermissions = async () => {
    const { status } = await ScreenCapture.requestPermissionsAsync();
    if(status !== 'granted'){
      requestPermission()
    }
    
    return status === 'granted';
  };
  
  async function getAlbums() {
    
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });
    return fetchedAlbums
    
  }

  async function getAlbumAssets() {
    const albumsData= await getAlbums()
    if(albumsData.length>0){
     
      albumsData.forEach(async (album)=>{
        if(album.title==='Screenshot'){
           const albumAssets = await MediaLibrary.getAssetsAsync({ album,first:100  })
           console.log(albumAssets)
           await AsyncStorage?.setItem(`capture${Math.random()*100}`,JSON.stringify(albumAssets.assets[album.assetCount-1]));
          
           setAssets(albumAssets.assets);
            
        }
      
      })
    }
    
    
  }

  
  useEffect(() => {
    let subscription:any;

    const addListenerAsync = async () => {
      if (await hasPermissions()) {
        subscription = ScreenCapture.addScreenshotListener(async() => {
          await getAlbumAssets();
          alert('Capture tomada con exito😊');
          
        });
     
      } else {
        console.error('Permissions needed to subscribe to screenshot events are missing!');
      }
    };
    addListenerAsync();

    return () => {
      subscription?.remove();
      
    };
  }, []);

 


  if (status === null) {
    requestPermission();
  }


  const onSaveImageAsync = async () => {
   
  
    try {

      const localUri = await captureScreen({
        height: 240,
        quality: 1,
        format:'jpg',
        result:"tmpfile"
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
        imageList.push(localUri);
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  const takeScreen= async()=>{
    await onSaveImageAsync()
   }
  return (
  <>
  <View3D model={Model} open={open} takeScreen={takeScreen}/>
  <Chat open={open} selectModel={setModel} setOpen={setOpen} />
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    position:'relative',
    flexDirection:'column'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  
  xIcon:{
    position:'relative',
    width:25,
    height:25,
    flex:0.10,
    alignItems:'flex-end',
    justifyContent:'flex-end'
  },
  camera: {
    position:'relative',
    width:'100%',
    height:'100%',
    flex:1
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64, 
    
    
   
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    
    zIndex:20,
    position:'absolute',
    bottom:25
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    
  },
 
});
