import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchInput: {
    width: width / 1.5,
    fontSize: 14,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 10,
    paddingHorizontal: 10,
  },

  productsContainer: {
    width: width - 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#D3D3D3',
  },

  productMarketName: {
    fontSize: 20,
    fontWeight: 'bold',
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
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#000',
  },
})
