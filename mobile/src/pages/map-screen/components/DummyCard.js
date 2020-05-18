import React from 'react'
import { Text, Image, View, TouchableOpacity } from 'react-native'

export default function DummyCard(props) {

  const styles = props.styles
  const productsVisible = props.productsVisible
  
  const dummyText = '▬▬▬'

  return (
    <View>
      <View style={styles.place}>
        <View style={styles.marketContainer}>
          <View>
            <Image style={styles.placeImg} />
            <Text style={styles.distanceText}>{dummyText}</Text>
          </View>

          <View>
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
                <Text style={styles.expandBtnText}>
                  {productsVisible ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View
        style={[productsVisible ? styles.productsContainer : styles.hidden]}
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
