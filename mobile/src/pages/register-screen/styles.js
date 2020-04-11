import { StyleSheet } from 'react-native'
import Color from '../../constants/colors'

export default StyleSheet.create({
    registerContainer: {
        width: 310,
        maxWidth: '90%',
        height: 580,
        backgroundColor: Color.primary,
        borderRadius: 20,
        justifyContent: 'space-evenly',
        alignItems:'center'
    },

    registerInput: {
        width: 260,
        maxWidth: '85%',
        height: 50,
    },

    registerInputButton: {
        backgroundColor: Color.secundary,
        width: 175,
        height: 80,
        marginVertical: 40,
    },
})