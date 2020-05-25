import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')
import Color from '../../constants/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  headerImg: {
    width: 40,
    height: 40,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 25,
  },

  headerName: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  suggestBtn: {
    backgroundColor: '#63b1b9',
    width: width / 2,
    height: 40,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },

  suggestBtnText: {
    fontSize: 18,
    color: '#fff'
  },

  productContainer: {
    width: width - 15,
  },

  product: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 90,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#D3D3D3'
  },

  productImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
    borderWidth: 1,
    borderColor: '#000',
  },

  productName: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  priceAndName: {
    flexDirection: 'row',
  },

  textPriceAndName: {
    fontSize: 16,
    color: '#3A3A3A',
  },

  productDescription: {
    color: '#3A3A3A',
  },
})
