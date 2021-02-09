import { Dimensions, StyleSheet } from 'react-native';
import Color from '../../constants/colors';

const { height } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  
  background: {
    position: 'absolute',
    minHeight: height,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  pic: {
    borderRadius: 8,
    width: 100,
    height: 100,
  },

  selectPic: {
    backgroundColor: '#A9A9A9',
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputSection: {
    width: '90%',
    position: 'relative',

    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#FFF',
    
    backgroundColor: Color.darkBg,
    
    marginTop: 16,
  },

  inputIcon: {
    padding: 10,
  },
  
  inputRightIcon: {
    position: 'absolute',
    right: 10,
  },

  input: {
    width: '90%',
    color: 'white',
  },

  confirmButton: {
    backgroundColor: Color.darkBg,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 16,
  },

})
