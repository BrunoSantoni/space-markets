import { StyleSheet } from 'react-native'

import Color from '../../constants/colors'


export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        
        flex: 1
    },

    lineStyle: {
        borderStyle: 'solid',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 8,
        marginHorizontal: 20
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
        height: null,
        paddingVertical: 8
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

    titleText: {
        marginVertical: 10,
        marginHorizontal: 5,
        padding: 5,
        fontSize: 23,
        textAlign: 'center',
        borderStyle: 'solid',
        borderBottomWidth: 3,
        borderRadius: 8,
        borderColor: '#63b1b9'
    },
});