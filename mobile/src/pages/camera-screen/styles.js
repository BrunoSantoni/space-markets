import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
  },

  mainView: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },

  changeIcon: {
    position: 'absolute',
    bottom: 20,
    left: 20
  },

  cameraIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    margin: 20,
    borderRadius: 10,
    height: 50
  },

  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },

  iconView: {
    flexDirection: 'row'
  },

  icon: {
    margin: 10
  },

  displayImg: {
    width: '100%',
    height: 300,
    borderRadius: 20
  }
})