import React, { useState, useEffect, useRef } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native'
import { Camera } from 'expo-camera'
import { useNavigation } from '@react-navigation/native'

import Icon from '@expo/vector-icons/FontAwesome'

import styles from './styles'

export default function CameraScreen() {
  const navigator = useNavigation()
  const cameraRef = useRef(null)

  const [type, setType] = useState(Camera.Constants.Type.back) /* Câmera frontal ou traseira */
  const [hasPermission, setHasPermission] = useState(null)
  const [imageUri, setImageUri] = useState(null)
  const [imageBase64, setImageBase64] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
      (async () => {
          const { status } = await Camera.requestPermissionsAsync()
          setHasPermission(status === 'granted')
      })()
  })

  if(hasPermission === null) {
    return <View />
  }

  if(hasPermission === false) {
    return <Text> Acesso Negado :/ </Text>
  }

  const changeCamera = () => {
    setType(type === Camera.Constants.Type.back ?
      Camera.Constants.Type.front : Camera.Constants.Type.back) 
  }

  const takePicture = async () => {
    if(cameraRef) {
      const data = await cameraRef.current.takePictureAsync({
        base64: true,
        aspect: [4, 3],
        quality: 1,
      })
      setImageBase64(data.base64)
      setImageUri(data.uri)
      setOpen(true)
    }
  }

  const navigateToSuggest = () => {
    setOpen(false)
    navigator.navigate('Suggest', {
      imageUri: imageUri,
      imageBase64: imageBase64
    })
  }

  return(
    <SafeAreaView style={styles.container}>
      <Camera
        style={{flex: 1}} /* Para ocupar a tela toda */
        type={type}
        ref={cameraRef}
      >
          <View style={styles.mainView}>
            <Icon name="exchange" size={25} color="white" style={styles.changeIcon} onPress={changeCamera} />
          </View>
      </Camera>
      <TouchableOpacity style={styles.cameraIcon} onPress={takePicture}>
        <Icon name="camera" size={25} color="white" />
        </TouchableOpacity>

      { imageUri &&
        <Modal
          animationType="slide"
          transparent={false}
          visible={open}
        >
          <View style={styles.modalView}>
            <Image
              style={styles.displayImg}
              source={{uri: imageUri}}
            />
            <View style={styles.iconView}>
              <TouchableOpacity style={styles.icon} onPress={() => setOpen(false)}>
                <Icon name="times-circle" size={50} color="#ff0000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon} onPress={navigateToSuggest}>
                <Icon name="check-circle" size={50} color="green" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      }
    </SafeAreaView>
  )
}