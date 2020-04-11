import React from 'react'
import { View, Text } from 'react-native'
import styles from './style'

export default function RegisterScreenSucess(){
    return(
        <View style={styles.container}>
            <View style={styles.msgContainer}>
                <Text style={styles.message}>Sucesso!</Text>
                <Text style={styles.message}>Cadastro concluído</Text>
            </View>
        </View>
    )
}