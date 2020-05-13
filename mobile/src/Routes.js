import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from './pages/login-screen'
import RegisterScreen from './pages/register-screen'
import HomeScreen from './pages/home-screen'
import MapScreen from './pages/map-screen'
import SuggestScreen from './pages/suggest-screen'
import ProductListScreen from './pages/product-list-screen'
import MarketProducts from './pages/market-products'
import DirectionsScreen from './pages/directions-screen'
import CameraScreen from './pages/camera-screen'

const AppStack = createStackNavigator()

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator>
                <AppStack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={{headerShown: false}}
                />

                <AppStack.Screen 
                    name="Register" 
                    component={RegisterScreen} 
                    options={{headerShown: false}}
                />
                
                <AppStack.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{headerShown: false}}
                />
                
                <AppStack.Screen 
                    name="Map"
                    component={MapScreen} 
                    options={{
                        headerShown: true,
                        title: 'Mapa',
                        headerStyle: {
                            backgroundColor: '#fff',
                            height: 80,
                        },
                        headerTintColor: '#63b1b9',
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
                        headerShown: false,
                        title: "Sugerir",                        
                    }} 
                />
      
                <AppStack.Screen 
                    name="ProductList" 
                    component={ProductListScreen}
                    options={{
                        headerShown: false,
                        title: "Lista de Produtos"                        
                    }}
                />

                <AppStack.Screen 
                    name="MarketProducts" 
                    component={MarketProducts}
                    options={{
                        headerShown: false,
                        title: "Produtos do mercado"                        
                    }} />

                <AppStack.Screen 
                    name="Directions" 
                    component={DirectionsScreen}
                    options={{
                        headerShown: true,
                        title: 'Rota',
                        headerStyle: {
                            backgroundColor: '#fff',
                            height: 80,
                        },
                        headerTintColor: '#63b1b9',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 24,
                        },
                    }} />
                    }}
                />
                
                <AppStack.Screen 
                    name="CameraScreen"
                    component={CameraScreen} 
                    options={{
                        headerShown: false,
                        title: 'Câmera',
                    }}
                />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}