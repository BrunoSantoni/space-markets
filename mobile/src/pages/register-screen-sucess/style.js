import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    msgContainer: {
        width: '100%',
        maxWidth: 300,
        height: 580,
        backgroundColor: '#6CB85D',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    message: {
        fontFamily: 'rubik-medium',
        fontSize: 24,
        color: '#fff'
    }
})