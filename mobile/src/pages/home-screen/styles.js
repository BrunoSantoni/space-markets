import { StyleSheet, Dimensions } from 'react-native'
import Color from '../../constants/colors'
import Font from '../../constants/font'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  titleContainer: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  logo: {
    width: 200,
    height: 100,
  },

  pic: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  button: {
    width: width / 1.5,
    height: 50,
    borderRadius: 3,
    backgroundColor: 'grey',
    justifyContent: 'center',
  },
  
})
