import { StyleSheet } from 'react-native'
import Color from '../../constants/colors'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default StyleSheet.create({
    Container: {
        width: '100%',
        maxWidth: 400,
        justifyContent: 'center',
        alignItems: 'center',
        height: 350,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Color.secundary,
        backgroundColor: Color.secundary,
        marginTop: 36
    },

    loginInput: {
        height: 48,
        fontSize: 15,
        borderColor: '#FFF',
        borderWidth: 2,
        backgroundColor: Colors.secundary,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: '#FFF',
    },

    buttonIniciar: {
        width: '100%', 
        maxWidth: 300,
        height: 50,
        backgroundColor: '#63b1b9',
        marginTop: 25
    },

    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginRight: 10
    },  

    registerLink: {
        color: '#FFF',
        marginRight: 15,
        textDecorationLine: 'underline'
    },

    registerLinkContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },

    inputGroup: {
        width: '85%',
    }
})