// pedrov4z

import { 
    StyleSheet, 
    Dimensions 
} from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    marketContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        width: '100%',
    },

    btnContainer: {
        flexDirection: 'row',
        width: width - 155
    },

    productsContainer: {
        height: 170,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        padding: 20,
        width: width
    },

    btnSugerir: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: '#63b1b9',
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
        width: 30,
        height: 30,
        borderRadius: 20
    },

    placesContainer: {
        width: '100%',
        maxHeight: 300,
    },

    place: {
        width: width,
        maxHeight: 130,
        backgroundColor: '#FFF',
        padding: 20,
    },
    
    nome: {
        fontWeight: 'bold',
        fontSize: 18,
        backgroundColor: '#fff',
    },
    
    endereco: {
        color: '#999',
        fontSize: 12,
        marginTop: 5,
    },

    placeImg: {
        width: 60,
        height: 60,
        right: 10,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 30,
        padding: 4,
        resizeMode: 'cover'
    },

    placeBtn: {
        height: 35,
        marginTop: 10,
        marginRight: 5,
        backgroundColor:'#63b1b9',
        justifyContent: 'center',
        borderRadius: 8,
        paddingHorizontal: 12,
    },

    placeBtnText: {
        color: 'white',
        fontSize: 13,
        alignSelf: 'center',
    },

    productsTitle: {
        width: '100%',
        textAlign: 'center',
        textTransform: 'uppercase',
    },

    listProducts: {
        flexDirection: 'row',
        marginTop: 15,
        width: '100%',
        justifyContent: 'center'
    },

    productItem: {
        marginHorizontal: 8
    },

    productImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 5
    },

    productPrice: {
        textAlign: 'center'
    }
});