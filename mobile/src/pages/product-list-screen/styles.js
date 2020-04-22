import { StyleSheet } from 'react-native'
import Color from '../../constants/colors'
import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 400,
    paddingTop: Constants.statusBarHeight + 5
  },

  header: {
    backgroundColor: Color.secundary,
    marginTop: 10,
    height: 60,
    flexDirection: 'row', //Um embaixo do outro
    alignContent: 'space-between',
    alignItems: 'center'
  },

  searchInput: {
    width: '80%',
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    height: 35
  },

  icon: {
    marginLeft: 10
  },

  productList: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 10
  },

  productImage: {
    width: 85,
    height: 85,
    right: 10,
    borderColor: '#000',
    borderWidth: 1,
    resizeMode: 'cover'
  },

  even: {
    backgroundColor: '#D3D3D3',
  },

  productInfo: {
    bottom: 5,
    textAlign: 'center'
  },

  textProduct: {
    textTransform: 'capitalize',
    fontSize: 25
  },

  txtProduct: {
    fontStyle: 'italic',
    fontSize: 20
  }
})