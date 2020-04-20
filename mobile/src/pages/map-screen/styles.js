// pedrov4z

import { 
    StyleSheet, 
    Dimensions 
} from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    btnSugerir: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: '#59cf59',
        justifyContent: 'center',
        alignItems: 'center',
        top: 50,
        right: 15,
        borderWidth: 2,
    },

    btnSugerirImg: {
        height: 32,
        width: 32,
    },

    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },

    mapView: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },

    marker: {
        resizeMode: 'contain',
        width: 40,
        height: 57,
    },

    placesContainer: {
        width: '100%',
        maxHeight: 150,
        marginBottom: 30,
    },

    place: {
        width: width - 40,
        maxHeight: 150,
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 20,
    },
    
    nome: {
        fontWeight: 'bold',
        fontSize: 18,
        backgroundColor: 'transparent',
    },
    
    endereco: {
        color: '#999',
        fontSize: 12,
        marginTop: 5,
    },

    placeImg: {
        position: 'absolute',
        resizeMode: 'contain',
        width: 50,
        height: 50,
        right: 10,
    },

    placeBtn: {
        height: 25,
        marginTop: 10,
        backgroundColor:'#59cf59',
        justifyContent: 'center',
    },

    placeBtnText: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center',
    },
});