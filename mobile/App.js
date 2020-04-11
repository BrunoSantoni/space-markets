import React, { useState } from 'react'
import { View, StatusBar } from 'react-native'
import * as Font from 'expo-font' 
import { AppLoading } from 'expo'
import Routes from './src/Routes'

const getFonts = () => Font.loadAsync({
    'rubik-regular': require('./assets/fonts/Rubik-Regular.ttf'),
    'rubik-medium': require('./assets/fonts/Rubik-Medium.ttf')
  })



export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  if(fontsLoaded){
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor='#fff' barStyle='dark-content' />
        <Routes />
      </View>
    )
  }else{
    return(
      <AppLoading 
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    )
  }
  
}
