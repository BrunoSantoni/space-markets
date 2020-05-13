import { StyleSheet } from 'react-native'

import Color from '../../constants/colors'


export default StyleSheet.create({
    container: {
        marginTop: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    formInput: {
        height: 45,
        width: 250,
        fontSize: 15,
        borderColor: Color.secundary,
        borderWidth: 2,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: '#63b1b9',
    },

    descriptionInput: {
        height: 60,
        width: 250,
        fontSize: 15,
        borderColor: Color.secundary,
        borderWidth: 2,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: '#63b1b9',
    },

    selectImg: {
        backgroundColor: Color.secundary,
        width: 175,
        height: 50,
    },

    btnEnviar: {
        width: '100%', 
        maxWidth: 250,
        height: 50,
        marginTop: 20,
        marginBottom: 30,
        backgroundColor:'#63b1b9',
        justifyContent: 'center',
    },

    btnEnviarText: {
        color: 'white',
        fontSize: 24,
        alignSelf: 'center',
    },

    img: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginTop: 10
    },
});