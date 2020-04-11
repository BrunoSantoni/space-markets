import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import Color from '../constants/colors'
import Font from '../constants/font'

export default function TouchButton(props) {
    return (
        <TouchableOpacity
            {...props}
            style={{...styles.button, ...props.style}}
        >
            <Text style={{...styles.buttonText, ...props.textStyle}}>{props.children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: 'grey',
        paddingHorizontal: 15
    },

    buttonText: {
        color: Color.thirdy,
        fontSize: 24,
        fontFamily: Font.medium,
        textAlign: 'center'
    },
})