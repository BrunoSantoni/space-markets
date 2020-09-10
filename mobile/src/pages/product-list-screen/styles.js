import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  inputSection: {
    width: width / 1.5,
    flexDirection: 'row',
    alignItems: 'center'
  },

  inputIcon: {
    padding: 15,
  },

  input: {
    width: '90%',
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },

  productsContainer: {
    width: width - 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 10,
  },

  productProfile: {
    flexDirection: 'column',
    marginRight: 20,
  },

  productInfo: {
    flex: 3,
  },

  distance: {
    flexDirection: 'row',
  },

  productImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#000',
  },

  marketProfile: {
    flexDirection: 'row',
  },

  marketImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
})
