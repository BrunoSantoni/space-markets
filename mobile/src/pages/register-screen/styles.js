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
        height: 48,
        fontSize: 15,
        borderColor: Color.secundary,
        borderWidth: 2,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: '#000',
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
        fontSize: 30,
        marginBottom: 10
    },  

    label: {
        color: '#A9A9A9',
        top: 5,
    }
})