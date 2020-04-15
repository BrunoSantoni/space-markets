import { StyleSheet } from 'react-native'
import Color from '../../constants/colors'

export default StyleSheet.create({
    img: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginTop: 10
    },

    selectImg: {
        backgroundColor: Color.secundary,
        width: 175,
        height: 50,
    },

    registerContainer: {
        width: '100%',
    },

    registerInput: {
        width: '100%',
        fontSize: 13,
        borderBottomColor: '#cecece',
        borderBottomWidth: 2,
        paddingVertical: 5,
        color: '#000',
        fontWeight: 'bold'
    },

    registerInputButton: {
        backgroundColor: Color.secundary,
        width: 100,
        height: 50,
    },

    textStyle: {
        color: 'white',
        fontSize: 15,
    },

    titleScreen: {
        color: '#000',
        fontSize: 60,
        marginVertical: 30
    },  

    label: {
        color: '#A9A9A9',
        top: 13,
    }
})