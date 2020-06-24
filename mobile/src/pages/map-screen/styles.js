import { StyleSheet, Dimensions } from 'react-native'

import Color from '../../constants/colors'

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
  },

  btnContainer: {
    flexDirection: 'row',
    width: width - 155,
  },

  productsContainer: {
    alignItems: 'center',
    width: width,
    paddingVertical: 10,
  },

  marker: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },

  placesContainer: {
    position: 'absolute',
    bottom: 0,
  },

  place: {
    width: width,
    padding: 15,
  },

  cardProfile: {
    flex: 1,
  },

  cardDetails: {
    flex: 4,
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
    resizeMode: 'cover',
  },

  placeBtn: {
    height: 35,
    marginTop: 10,
    marginRight: 5,
    backgroundColor: 'grey',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: '8%',
  },

  placeBtnText: {
    fontSize: 12,
    alignSelf: 'center',
    color: 'white',
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
    marginHorizontal: 8,
  },

  productImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },

  productPrice: {
    textAlign: 'center',
  },

  tutorialView: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  swipeTutorialGif: {
    position: 'absolute',
    bottom: 0,
    height: '40%',
    width: width,
    resizeMode: 'contain',
  },

  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },

  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  distanceText: {
    fontSize: 12,
    marginTop: 5,
  },

  nome: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  tipText: {
    fontSize: 12,
    width: width,
    textAlign: 'center',
  },
})
