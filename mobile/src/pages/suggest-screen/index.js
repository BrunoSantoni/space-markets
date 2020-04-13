// pedrov4z

import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import styles from './styles';

export default class SuggestScreen extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>Sugestão</Text>
                <TextInput></TextInput>
                <Text>Email</Text>
                <TextInput></TextInput>
                <Text>Descrição</Text>
                <TextInput></TextInput>
                <Text>Preço</Text>
                <TextInput></TextInput>
                <Text>Localização</Text>
                <TextInput></TextInput>
                <Text>Foto</Text>
                <TextInput></TextInput>
                <TouchableOpacity
                style={styles.btnEnviar}
                >
                    <Text style={styles.btnEnviarText}>Enviar sugestão</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
