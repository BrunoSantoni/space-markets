import React, { useState, useEffect } from 'react'
import {
  Image,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native'

import * as Location from 'expo-location'

import { useNavigation } from '@react-navigation/native'

import Icons from '@expo/vector-icons/FontAwesome'

import styles from './styles'

import api from '../../services/api'

export default function ProductListScreen() {
  const navigation = useNavigation()
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])
  const [loadingDistances, setLoadingDistances] = useState(true)
  const [distances, setDistances] = useState([])
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  })

  useEffect(() => {
    Location.requestPermissionsAsync()
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = parseFloat(position.coords.latitude)
        const long = parseFloat(position.coords.longitude)
        setUserLocation({ latitude: lat, longitude: long })
      },
      (error) => console.log('getCurrentPosition failed'),
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      }
    )
  }, [])

  useEffect(() => {
    api
      .get('buscaproduto', {
        headers: {
          search: search,
        },
      })
      .then((res) => {
        setProducts(res.data)
      })
  }, [search])

  useEffect(() => {
    setLoadingDistances(true)
    calcDistancesBetween_MATH(products)
  }, [products])

  navigation.setOptions({
    headerShown: true,
    headerTitle: () => (
      <View style={styles.header}>
        <TextInput
          placeholder="Pesquisar produtos"
          style={styles.searchInput}
          value={search}
          onChangeText={(event) => setSearch(event)}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={setSearch(search)}
        >
          <Icons name="search" size={20} color="black" />
        </TouchableOpacity>
      </View>
    ),
  })

  function calcDistancesBetween_MATH(data) {
    let loadedDistances = []
    for (let i = 0; i < data.length; i++) {
      let lat1 = userLocation.latitude
      let lat2 = data[i].market_id.market_latitude
      let lon1 = userLocation.longitude
      let lon2 = data[i].market_id.market_longitude
      let radlat1 = (Math.PI * lat1) / 180
      let radlat2 = (Math.PI * lat2) / 180
      let theta = lon1 - lon2
      let radtheta = (Math.PI * theta) / 180
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
      dist = Math.acos(dist)
      dist = (dist * 180) / Math.PI
      dist = dist * 60 * 1.1515
      dist = dist * 1.609344
      if (dist < 10) loadedDistances.push(dist.toFixed(2))
      else if (dist < 100) loadedDistances.push(dist.toFixed(1))
      else if (dist < 1000) loadedDistances.push(dist.toFixed(0))
      else loadedDistances.push(0)
    }
    setDistances(loadedDistances)
    setLoadingDistances(false)
  }

  function navigateToMarketProducts(
    marketId,
    marketName,
    marketPicture,
    marketLatitude,
    marketLongitude
  ) {
    navigation.navigate('MarketProducts', {
      marketId: marketId,
      marketName: marketName,
      marketPicture: marketPicture,
      marketLatitude: marketLatitude,
      marketLongitude: marketLongitude
    })
  }

  return (
    <View style={styles.container}>
      {products.length > 0 ? (
        <FlatList
          data={products}
          keyExtractor={(product) => product._id}
          renderItem={({ item: product, index }) => (
            <TouchableOpacity
              onPress={() =>
                navigateToMarketProducts(
                  product.market_id._id,
                  product.market_id.market_name,
                  product.market_id.market_picture_url,
                  product.market_id.market_latitude,
                  product.market_id.market_longitude
                )
              }
            >
              <View style={styles.productsContainer}>
                <View style={styles.productProfile}>
                  <Image
                    source={{ uri: product.product_picture_url }}
                    style={styles.productImage}
                  />
                  <View style={styles.distance}>
                    <Icons
                      name="map-marker"
                      size={25}
                      color="red"
                      style={[{ marginRight: 5 }]}
                    />
                    {loadingDistances ? (
                      <Text> km</Text>
                    ) : (
                      <Text>{distances[index]} km</Text>
                    )}
                  </View>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productMarketName}>
                    {product.product_name}
                  </Text>
                  <Text>{product.product_description}</Text>
                  <Text>R$ {product.product_price}</Text>
                </View>
                <View style={styles.marketProfile}>
                  <Image
                    source={{ uri: product.market_id.market_picture_url }}
                    style={styles.marketImg}
                  />
                  <Icons
                    name="angle-right"
                    size={25}
                    color="darkgray"
                    style={[{ marginLeft: 5, marginTop: 7 }]}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <></>
      )}
    </View>
  )
}
