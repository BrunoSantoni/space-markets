import { StyleSheet } from 'react-native'
import Color from '../../constants/colors'

export default StyleSheet.create({
    Container: {
        backgroundColor: Color.primary,
        width: '100%',
        maxWidth: 300,
        justifyContent: 'center',
        alignItems: 'center',
        height: 350,
        borderRadius: 20    
    },

    loginInput: {
        width: '100%',
        maxWidth: 240,
        height: 48,
    },

    buttonIniciar: {
        width: '100%', 
        maxWidth: 150,
        height: 50,
        marginTop: 20,
        marginBottom: 30,
        backgroundColor: Color.secundary
    },

    registerLink: {
        color: Color.thirdy,
        textDecorationLine: 'underline'
    },

    registerLinkContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    }
})