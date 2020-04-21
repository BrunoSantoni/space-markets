import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
const { width } = Dimensions.get('window');
import Color from '../../constants/colors'

export default StyleSheet.create({  
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight
    },

    header: {
        width: width,
        backgroundColor: '#63b1b9',
        height: 110,
        flexDirection: 'row',
        paddingHorizontal: 30,
        alignItems: 'center'
    },

    headerImg: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 30
    },

    headerName: {
        fontSize: 25,
        fontWeight: 'bold'
    },

    backBtn: {
        backgroundColor: Color.secundary,
        width: 80,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000',
        marginTop: 5
    },

    backBtnText: {
        fontSize: 18
    },

    sessionTitle: {
        width: width,
        height: 37,
        backgroundColor: Color.secundary,
        alignItems: 'center',
        justifyContent: 'center'
    },

    titleText: {
        fontSize: 24,
        textTransform: 'uppercase',
        color: '#3A3A3A'
    },

    productContainer: {
        width: width,
    },

    product: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 90,
        paddingHorizontal: 20,
    },

    even: {
        backgroundColor: '#D3D3D3'
    },
    
    productImg: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 20,
        borderWidth: 1,
        borderColor: '#000'
    },

    productName: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    priceAndName: {
        flexDirection: 'row'
    },

    textPriceAndName: {
        fontSize: 16,
        color: '#3A3A3A'
    },

    location: {
        color: '#3A3A3A'
    }
})