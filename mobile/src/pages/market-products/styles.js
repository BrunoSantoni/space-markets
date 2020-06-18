import { StyleSheet, Dimensions } from 'react-native'

import Color from '../../constants/colors'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  headerImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 25,
  },

  headerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.specialColor,
  },

  buttonsContainer: {
    flexDirection: 'row',
  },

  buttons: {
    backgroundColor: 'grey',
    width: width / 2.25,
    height: 40,
    marginVertical: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
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
  },

  productImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
})
