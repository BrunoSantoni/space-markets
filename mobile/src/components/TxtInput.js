import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import Color from '../constants/colors'

export default function TxtInput(props) {
    return(
        <TextInput 
            {...props}
            placeholderTextColor={props.placeholderTextColor}
            style={{...styles.input, ...props.style}} >
            {props.children}
        </TextInput>
    )
}

const styles = StyleSheet.create({
     input: {
         fontSize: 18,
         backgroundColor: Color.thirdy,
         marginVertical: 10,
         width: '100%'
     }
})