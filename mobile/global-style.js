import { StyleSheet } from 'react-native'
import { useFonts } from '@use-expo/font'


export default globalStyle = { 
    getFonts: () => {
        let [fontsLoaded] = useFonts({ 
            'Rubik-Bold': require('../../../assets/fonts/Rubik-Bold.ttf'),
            'Rubik-Regular': require('../../../assets/fonts/Rubik-Regular.ttf'),
            'Rubik-Italic': require('../../../assets/fonts/Rubik-Italic.ttf'), 
          })

        if(!fontsLoaded) {

        }
    },

    styles: StyleSheet.create({
        fontStyle: {
            fontFamily: 'Rubik-Italic',
            color: '#fff'
        }
    })
}