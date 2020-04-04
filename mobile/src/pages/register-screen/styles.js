import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    registerContainer: {
        width: '100%',
        maxWidth: 300,
        height: 580,
        backgroundColor: '#0076C0',
        borderRadius: 20,
        justifyContent: 'space-evenly',
        alignItems:'center'
    },

    registerInput: {
        backgroundColor: '#fff',
        width: '85%',
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 8,
        height: 50,
        fontSize: 18,
    },

    registerInputButton: {
        backgroundColor: '#6CB85D',
        width: 150,
        height: 80,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 40,
    },

    registerInputButtonText: {
        fontFamily: 'rubik-medium',
        fontSize: 24,
        color: '#fff'
    }
})