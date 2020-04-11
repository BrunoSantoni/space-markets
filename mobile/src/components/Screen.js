import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import Constants from 'expo-constants'

export default function Screen(props) {
    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
            <View {...props} style={{...styles.container, ...props.style}}>
                {props.children}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + 5,
        paddingBottom: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
})