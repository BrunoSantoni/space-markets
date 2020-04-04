import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './pages/login-screen'
import RegisterScreen from './pages/register-screen'

const AppStack = createStackNavigator()

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode='none'>
                <AppStack.Screen name="Login" component={LoginScreen} />
                <AppStack.Screen name="Register" component={RegisterScreen} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}