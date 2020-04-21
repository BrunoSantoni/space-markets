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
                        headerShown: false,
                        title: 'Mapa',
                    }}
                />

                <AppStack.Screen 
                    name="Suggest" 
                    component={SuggestScreen}
                    options={{
                        title: "Sugerir",
                        headerStyle: {
                            backgroundColor: '#63b1b9',
                            height: 150,
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 30,
                        },
                    }} 
                />
      
                <AppStack.Screen 
                    name="ProductList" 
                    component={ProductListScreen}
                    options={{
                        headerShown: false,
                        title: "Lista de Produtos"                        
                    }} />

                <AppStack.Screen 
                    name="MarketProducts" 
                    component={MarketProducts}
                    options={{
                        headerShown: false,
                        title: "Produtos do mercado"                        
                    }} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}