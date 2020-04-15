import { StyleSheet } from 'react-native'
import Color from '../../constants/colors'

export default StyleSheet.create({
    Container: {
        width: '100%',
        maxWidth: 400,
        justifyContent: 'center',
        alignItems: 'center',
        height: 350,
        borderRadius: 20,
        backgroundColor: Color.primary
    },

    loginInput: {
        width: '100%',
        maxWidth: 400,
        height: 48,
        fontSize: 15
    },

    buttonIniciar: {
        width: '100%', 
        maxWidth: 300,
        height: 50,
        marginTop: 20,
        marginBottom: 30,
        backgroundColor: Color.secundary
    },

    registerLink: {
        color: '#000',
        marginLeft: 15
    },

    registerLinkContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    }
})