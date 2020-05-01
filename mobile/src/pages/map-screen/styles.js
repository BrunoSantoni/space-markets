// pedrov4z

import { 
    StyleSheet, 
    Dimensions 
} from 'react-native'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1,
    },

    hidden: {
        width: 0,
        height: 0,
        bottom: -100,
        position: 'absolute',
    },

    btnSugerir: {
        position: 'absolute',
        width: '20%',
        height: '8%',
        borderRadius: 100,
        backgroundColor: '#63b1b9',
        justifyContent: 'center',
        alignItems: 'center',
        top: '10%',
        right: '5%',
        borderWidth: 2,
    },

    btnSugerirImg: {
        resizeMode: 'contain',
        height: '75%',
        width: '75%',
    },

    mapView: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },

    marketContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        width: '100%',
    },

    btnContainer: {
        flexDirection: 'row',
        width: width - 155,
    },

    expandBtn: {
        width: 40,
        alignItems: 'center',
        height: 22,
        backgroundColor:'#63b1b9',
        borderRadius: 8,
        marginTop: 5,
    },

    expandBtnText: {
        color: 'white',
        fontSize: 14,
    },

    productsContainer: {
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        width: width,
        paddingVertical: 10
    },

    marker: {
        width: 30,
        height: 30,
        borderRadius: 20
    },

    placesContainer: {
        position: 'absolute',
        bottom: 0,
    },

    place: {
        width: width,
        backgroundColor: '#FFF',
        padding: 15,
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
        paddingHorizontal: '8%',
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
        justifyContent: 'center',
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
})
