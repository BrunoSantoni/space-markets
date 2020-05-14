import React, { useRef, useState, useEffect } from 'react'
import {
  Text,
  Image,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import MapView from 'react-native-maps'

import styles from './styles'
import api from '../../services/api'

import DummyCard from './components/DummyCard'
import LoadingGif from '../../components/LoadingGif'
import NoOffersIcon from '../../../assets/img/no-offers-icon.png'

export default function MapScreen() {
  const mapRef = useRef(null)
  const scrollRef = useRef(null)
  const navigation = useNavigation()
  const [mercados, setMercados] = useState([])
  const [specialOffers, setSpecialOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingOffers, setLoadingOffers] = useState(true)
  const [placesVisible, setPlacesVisible] = useState(true)
  const [productsVisible, setProductsVisible] = useState(true)
  const [selectedPlace, selectPlace] = useState(0)

  const defaultLatDelta = 0.0142
  const defaultLongDelta = 0.0131
  const { width } = Dimensions.get('window')

  useEffect(() => {
    api.get('mercados').then((res) => {
      setMercados(res.data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!loading) {
      centerMapCamera()
    }
  }, [selectedPlace])

  async function loadOffers() {
    try {
      await api.get('promocoes', {
        headers: {
            auth: mercados[selectedPlace]._id
        }
      }).then(res => {
        setSpecialOffers(res.data)
        if (res.data.length > 0) setLoadingOffers(false)
      })
    } catch(err) {
      Alert.alert(err)
    }
  }

  function centerMapCamera() {
    const { market_latitude, market_longitude, markRef } = mercados[selectedPlace]

    mapRef.current.animateToRegion(
      {
        latitude: market_latitude,
        longitude: market_longitude,
        latitudeDelta: defaultLatDelta,
        longitudeDelta: defaultLongDelta,
      },
      750
    )

    markRef.showCallout()
    scrollRef.current.scrollTo({ x: width, y: 0, animated: false })
    setLoadingOffers(true)
    loadOffers()
  }

  function toggleProductsVisibility() {
    productsVisible ? setProductsVisible(false) : setProductsVisible(true)
  }

  function navigateToMarketProducts(marketId, marketName, marketPicture) {
    navigation.navigate('MarketProducts', {
      marketId: marketId,
      marketName: marketName,
      marketPicture: marketPicture,
    })
  }

  function navigateToDirections(
    marketName,
    marketPicture,
    marketStreet,
    marketNumber,
    marketLatitude,
    marketLongitude
  ) {
    navigation.navigate('Directions', {
      marketName: marketName,
      marketPicture: marketPicture,
      marketStreet: marketStreet,
      marketNumber: marketNumber,
      marketLatitude: marketLatitude,
      marketLongitude: marketLongitude,
    })
  }

  function handleScroll(action) {
    const mLen = mercados.length - 1

    let previous, next

    if (selectedPlace == 0) {
      previous = mLen
      next = selectedPlace + 1
    } else if (selectedPlace == mLen) {
      previous = selectedPlace - 1
      next = 0
    } else {
      previous = selectedPlace - 1
      next = selectedPlace + 1
    }

    action == 0 ? selectPlace(previous) : selectPlace(next)
  }

  return loading ? (
    <LoadingGif/>
  ) : (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.mapView}
        rotateEnabled={false}
        showsPointsOfInterest={false}
        showsBuildings={false}
        showsMyLocationButton={false}
        onMapReady={centerMapCamera}
        onPress={() => {
          if (placesVisible) setPlacesVisible(false)
        }}
      >
        {mercados.map((mercado, index) => (
          <MapView.Marker
            ref={(markRef) => (mercado.markRef = markRef)}
            key={index}
            title={mercado.market_name}
            description={mercado.market_street + ', ' + mercado.market_number}
            coordinate={{
              latitude: mercado.market_latitude,
              longitude: mercado.market_longitude,
            }}
            onPress={() => {
              if (!placesVisible) setPlacesVisible(true)
              selectPlace(index)
            }}
          >
            <Image
              source={{ uri: mercado.market_picture_url }}
              style={styles.marker}
            />
          </MapView.Marker>
        ))}
      </MapView>

      <View style={[placesVisible ? styles.placesContainer : styles.hidden]}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const action = Math.round(e.nativeEvent.contentOffset.x / width)
            if (action != 1) handleScroll(action)
          }}
        >
          <DummyCard styles={styles} productsVisible={productsVisible} />

          <View>
            <View style={styles.place}>
              <View style={styles.marketContainer}>
                <View>
                  <Image
                    source={{
                      uri: mercados[selectedPlace].market_picture_url,
                    }}
                    style={styles.placeImg}
                  />
                  <Text>2,5 km</Text>
                </View>

                <View>
                  <Text style={styles.nome}>
                    {mercados[selectedPlace].market_name}
                  </Text>
                  <Text style={styles.endereco}>
                    {mercados[selectedPlace].market_street +
                      ', ' +
                      mercados[selectedPlace].market_number}
                  </Text>
                  <View style={styles.btnContainer}>
                    <TouchableOpacity
                      style={styles.placeBtn}
                      onPress={() =>
                        navigateToMarketProducts(
                          mercados[selectedPlace]._id,
                          mercados[selectedPlace].market_name,
                          mercados[selectedPlace].market_picture_url
                        )
                      }
                    >
                      <Text style={styles.placeBtnText}>Ver produtos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.placeBtn}
                      onPress={() =>
                        navigateToDirections(
                          mercados[selectedPlace].market_name,
                          mercados[selectedPlace].market_picture_url,
                          mercados[selectedPlace].market_street,
                          mercados[selectedPlace].market_number,
                          mercados[selectedPlace].market_latitude,
                          mercados[selectedPlace].market_longitude
                        )
                      }
                    >
                      <Text style={styles.placeBtnText}>Rota até aqui</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.placeBtn}
                      onPress={toggleProductsVisibility}
                    >
                      <Text style={styles.expandBtnText}>
                        {productsVisible ? '▲' : '▼'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={[
                productsVisible ? styles.productsContainer : styles.hidden,
              ]}
            >
              <Text style={styles.productsTitle}>
                Principais promoções {mercados[selectedPlace].market_name}
              </Text>
              <View style={styles.listProducts}>
                {!loadingOffers ? specialOffers.map((offer, index) => (
                  <View 
                    style={styles.productItem}
                    key={index}
                  >
                    <Image
                      source={{
                        uri: offer.product_picture_url
                      }}
                      style={styles.productImg}
                    />
                    <Text style={styles.productPrice}>R$ {offer.product_price}</Text>
                  </View>
                )) : (
                  <View style={styles.productItem}>
                    <Image
                      source={NoOffersIcon}
                      style={styles.productImg}
                    />
                    <Text style={styles.productPrice}>Sem ofertas</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          <DummyCard styles={styles} productsVisible={productsVisible} />
        </ScrollView>
      </View>
    </View>
  )
}
