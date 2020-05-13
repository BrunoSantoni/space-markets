import React from 'react'
import { Image, StyleSheet } from 'react-native'

import LoadingGif from '../../assets/img/loading2.gif'

export default function Logo() {
  return (
    <Image
      source={LoadingGif}
      style={{
        width: '10%',
        height: '10%',
        alignSelf: 'center',
      }}
      resizeMode="contain"
    />
  )
}
