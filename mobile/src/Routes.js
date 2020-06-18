import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useColorScheme } from 'react-native-appearance'

import Color from './constants/colors'
import LoginScreen from './pages/login-screen'
import RegisterScreen from './pages/register-screen'
import HomeScreen from './pages/home-screen'
import MapScreen from './pages/map-screen'
import SuggestScreen from './pages/suggest-screen'
import ProductListScreen from './pages/product-list-screen'
import MarketProducts from './pages/market-products'
import CameraScreen from './pages/camera-screen'

const AppStack = createStackNavigator()

export default function Routes() {
  let colorScheme = useColorScheme()

  const { darkBg, lightBg, specialColor } = Color

  const headerStyle = [
    { height: 80 },
    colorScheme === 'dark'
      ? { backgroundColor: darkBg }
      : { backgroundColor: lightBg },
  ]

  return (
    <>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={'#00000000'}
        hidden={false}
        translucent={true}
      />
      <NavigationContainer>
        <AppStack.Navigator>
          <AppStack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
              title: 'Autenticação',
              headerStyle: headerStyle,
              headerTintColor: specialColor,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24,
              },
            }}
          />

          <AppStack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerShown: true,
              title: 'Cadastro',
              headerStyle: headerStyle,
              headerTintColor: specialColor,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24,
              },
            }}
          />

          <AppStack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
              title: 'Bem-vindo',
              headerStyle: headerStyle,
              headerTintColor: specialColor,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24,
              },
            }}
          />

          <AppStack.Screen
            name="Map"
            component={MapScreen}
            options={{
              headerShown: true,
              title: 'Mapa',
              headerStyle: headerStyle,
              headerTintColor: specialColor,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24,
              },
            }}
          />

          <AppStack.Screen
            name="Suggest"
            component={SuggestScreen}
            options={{
              headerShown: true,
              title: ' ',
              headerStyle: headerStyle,
              headerTintColor: specialColor,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24,
              },
            }}
          />

          <AppStack.Screen
            name="ProductList"
            component={ProductListScreen}
            options={{
              headerShown: false,
              title: 'Pesquisar produtos',
              headerStyle: headerStyle,
              headerTintColor: specialColor,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24,
              },
            }}
          />

          <AppStack.Screen
            name="MarketProducts"
            component={MarketProducts}
            options={{
              headerShown: false,
              title: 'Produtos do mercado',
              headerStyle: headerStyle,
              headerTintColor: specialColor,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24,
              },
            }}
          />

          <AppStack.Screen
            name="CameraScreen"
            component={CameraScreen}
            options={{
              headerShown: false,
              title: 'Câmera',
              headerStyle: headerStyle,
              headerTintColor: specialColor,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24,
              },
            }}
          />
        </AppStack.Navigator>
      </NavigationContainer>
    </>
  )
}
