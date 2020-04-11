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
        marginVertical: 10,
    },

    registerContainer: {
        width: 310,
        maxWidth: '90%',
        height: 650,
        backgroundColor: Color.primary,
        borderRadius: 20,
        justifyContent: 'space-evenly',
        alignItems:'center'
    },

    registerInput: {
        width: 260,
        maxWidth: '85%',
        height: 50,
    },

    registerInputNome: {
        width: 260,
        maxWidth: '85%',
        height: 50,
        marginTop: 20,
    },

    registerInputButton: {
        backgroundColor: Color.secundary,
        width: 175,
        height: 80,
        marginTop: 30,
        marginBottom: 20
    },

    textStyle: {
        color: 'white',
        fontSize: 15,
    }
})