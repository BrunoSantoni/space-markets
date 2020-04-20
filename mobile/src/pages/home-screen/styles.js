import { StyleSheet } from 'react-native'
import Color from '../../constants/colors'
import Font from '../../constants/font'

export default StyleSheet.create({
    img: {
        width: 100,
        maxWidth: '95%',
        height: 100,
        borderRadius: 150,
        marginBottom: 40,
        position: 'absolute',
        top: 40,
        right: 30
    },

    stewardContainer:{
        width: '100%',
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 120
    },

    optionContainer:{
        width: '100%',
    },

    firstOption: {
        backgroundColor: Color.secundary,
        height: 50,
        width: '100%',
        borderRadius: 0,
        paddingVertical: 30
    },

    secondOption:{
        backgroundColor: Color.primary,
        height: 50,
        width: '100%',
        borderRadius: 0,
        marginTop: 10,
        marginBottom: 10,
        paddingVertical: 30
    },

    inputContainer: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: Color.secundary
    },

    inputContainer2: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: Color.primary
    },

    optionText: {
        fontSize: 18,
        fontFamily: Font.regular
    }
})