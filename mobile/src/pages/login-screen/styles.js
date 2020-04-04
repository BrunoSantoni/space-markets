import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    loginContainer: {
        backgroundColor: '#0076C0',
        width: '100%',
        maxWidth: 300,
        justifyContent: 'center',
        alignItems: 'center',
        height: 350,
        borderRadius: 20    
    },

    loginInput: {
        backgroundColor: '#fff',
        color: '#000',
        width: '100%',
        maxWidth: 240,
        marginVertical: 10,
        height: 48,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        fontFamily: 'rubik-regular'
    },

    buttonIniciar: {
        backgroundColor: '#6CB85D',
        width: '100%',
        maxWidth: 150,
        height: 50,
        marginTop: 20,
        marginBottom: 30,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonInputText: {
        color: '#fff',
        fontSize: 24,
        fontFamily: 'rubik-medium'
    },

    registerLink: {
        fontFamily: 'rubik-regular',
        color: '#fff',
        fontSize: 18,
        textDecorationLine: 'underline'
    },

    registerLinkContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    }

    
})