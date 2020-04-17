import React from 'react'
import { Image, StyleSheet } from 'react-native'
import LogoIcon from '../../assets/icon.png'

export default function Logo() {
    return (
        <Image source={LogoIcon} style={styles.logo} resizeMode='contain'/>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 200,
        position: 'absolute',
        top: 0,
        left: 10,
        zIndex: 100
    }
})