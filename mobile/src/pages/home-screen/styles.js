import { StyleSheet } from 'react-native'
import Color from '../../constants/colors'
import Font from '../../constants/font'

export default StyleSheet.create({
    img: {
        width: 250,
        maxWidth: '95%',
        height: 250,
    },

    stewardContainer:{
        width: '100%',
        height: '70%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },

    optionContainer:{
        width: '100%',
        height: '30%',
        justifyContent: 'space-evenly'
    },

    firstOption: {
        backgroundColor: Color.secundary,
        height: 50,
        width: '100%',
        borderRadius: 0
    },

    secondOption:{
        backgroundColor: Color.primary,
        height: 50,
        width: '100%',
        borderRadius: 0,
        marginTop: 30,
    },

    optionText: {
        fontSize: 18,
        fontFamily: Font.regular
    }
})