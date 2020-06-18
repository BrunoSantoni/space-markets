import React, { useState } from 'react'
import { View } from 'react-native'
import * as Font from 'expo-font' 
import { AppLoading } from 'expo'
import { AppearanceProvider } from 'react-native-appearance'
import Routes from './src/Routes'

const getFonts = () => Font.loadAsync({
    'rubik-regular': require('./assets/fonts/Rubik-Regular.ttf'),
    'rubik-medium': require('./assets/fonts/Rubik-Medium.ttf'),
    'rubik-italic': require('./assets/fonts/Rubik-Italic.ttf')
  })



export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  if(fontsLoaded){
    return (
      <AppearanceProvider>
        <View style={{flex: 1}}>
          <Routes />
        </View>
      </AppearanceProvider>
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
