import { StyleSheet, Dimensions } from 'react-native'
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
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
    width: 300
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
  
  location: {
    flexDirection: 'row',
    position: 'absolute',
    marginTop: 96,
    marginLeft: 12
  },

  productInfo: {
    bottom: 5,
    textAlign: 'center'
  },

  textProduct: {
    textTransform: 'capitalize',
    fontSize: 25,
  },

  textProductPrice: {
    fontSize: 30,
    fontStyle: 'italic',
    textAlign: 'right',
    color: 'green'
  }
})