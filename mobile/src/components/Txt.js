import React from 'react'
import { Text, StyleSheet } from 'react-native'
import Font from '../constants/font'

export default function Txt(props) {
    return (
        <Text {...props} style={{...styles.text, ...props.style}}>
            {props.children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: Font.regular,
        fontSize: Font.size,
        color: Font.color
    }
})