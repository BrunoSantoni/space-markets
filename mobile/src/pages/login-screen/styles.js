import { StyleSheet, Dimensions } from 'react-native'
import Color from '../../constants/colors'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  background: {
    flex: 1,
    position: 'absolute',
    resizeMode: 'center',
  },

  logo: {
    height: 100,
    width: 300,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginContainer: {
    width: width - 50,
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 5,
    //borderRadius: 12,
    //borderColor: Color.darkSecondaryAction,
    //backgroundColor: Color.darkSecondaryAction,
  },

  inputSection: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#FFF',
    marginVertical: 10,
    backgroundColor: Color.darkBg,
  },

  inputIcon: {
    padding: 10,
  },

  input: {
    width: '90%',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    color: 'white',
  },

  button: {
    width: '95%',
    height: 45,
    borderRadius: 8,
    backgroundColor: Color.specialColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },

  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFF',
  },

  registerSection: {
    flexDirection: 'row',
    marginVertical: 10,
  },

  registerLink: {
    color: '#FFF',
    marginHorizontal: '5%',
    textDecorationLine: 'underline',
  },
})
