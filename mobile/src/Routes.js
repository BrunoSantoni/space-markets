import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './pages/login-screen'
import RegisterScreen from './pages/register-screen'
import HomeScreen from './pages/home-screen'
import ProductListScreen from './pages/product-list-screen'

const AppStack = createStackNavigator()

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode='none'>
                <AppStack.Screen name="Login" component={LoginScreen} />
                <AppStack.Screen name="Register" component={RegisterScreen} />
                <AppStack.Screen name="Home" component={HomeScreen} />
                <AppStack.Screen name="ProductList" component={ProductListScreen} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}