import React from 'react'
import { Text, Image, View, TouchableOpacity } from 'react-native'

import Color from '../../../constants/colors'

export default function DummyCard(props) {
  const styles = props.styles
  const productsVisible = props.productsVisible
  const colorScheme = props.colorScheme

  const dummyText = '▬▬▬'

  return (
    <View>
      <View
        style={[
          styles.place,
          colorScheme === 'dark'
            ? { backgroundColor: Color.darkBg }
            : { backgroundColor: Color.lightBg },
        ]}
      >
        <View style={styles.marketContainer}>
          <View style={styles.cardProfile}>
            <Image style={styles.placeImg} />
            <Text style={styles.distanceText}>{dummyText}</Text>
          </View>

          <View style={styles.cardDetails}>
            <Text style={styles.nome}>{dummyText}</Text>
            <Text style={styles.endereco}>{dummyText}</Text>
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.placeBtn}>
                <Text style={styles.placeBtnText}>{dummyText}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.placeBtn}>
                <Text style={styles.placeBtnText}>{dummyText}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.placeBtn}>
                <Text style={styles.placeBtnText}>
                  {productsVisible ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View
        style={[
          productsVisible
            ? [
                styles.productsContainer,
                colorScheme === 'dark'
                  ? { backgroundColor: Color.darkBg }
                  : { backgroundColor: Color.lightBg },
              ]
            : styles.hidden,
        ]}
      >
        <Text style={styles.productsTitle}>{dummyText}</Text>
        <View style={styles.listProducts}>
          <View style={styles.productItem}>
            <Image style={styles.productImg} />
            <Text style={styles.productPrice}>{dummyText}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
