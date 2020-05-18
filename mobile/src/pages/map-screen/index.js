import React, { useRef, useState, useEffect } from 'react'
import {
  Text,
  Image,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  Linking,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import MapView from 'react-native-maps'
import * as Location from 'expo-location'

import styles from './styles'
import api from '../../services/api'

import DummyCard from './components/DummyCard'
import LoadingGif from '../../components/LoadingGif'
import SwipeTutorialGif from '../../../assets/img/swipe-tutorial.gif'
import NoOffersIcon from '../../../assets/img/no-offers-icon.png'

export default function MapScreen() {
  const mapRef = useRef(null)
  const scrollRef = useRef(null)
  const navigation = useNavigation()
  const [mercados, setMercados] = useState([])
  const [distance, setDistance] = useState(0)
  const [specialOffers, setSpecialOffers] = useState([])
  const [loadingMarkets, setLoadingMarkets] = useState(true)
  const [loadingDistance, setLoadingDistance] = useState(true)
  const [loadingOffers, setLoadingOffers] = useState(true)
  const [placesVisible, setPlacesVisible] = useState(true)
  const [productsVisible, setProductsVisible] = useState(true)
  const [selectedPlace, selectPlace] = useState(0)
  const [tutorialVisible, setTutorialVisible] = useState(true)
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null
  })

  const defaultLatDelta = 0.0142
  const defaultLongDelta = 0.0131
  const { width } = Dimensions.get('window')

  useEffect(() => {
    Location.requestPermissionsAsync()
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = parseFloat(position.coords.latitude)
        const long = parseFloat(position.coords.longitude)
        setUserLocation({ latitude: lat, longitude: long })
      },
      error => console.log('getCurrentPosition failed'),
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      }
    )
    api.get('mercados').then((res) => {
      setMercados(res.data)
      setLoadingMarkets(false)
    })
  }, [])

  useEffect(() => {
    if (!loadingMarkets) refreshPlace()
  }, [selectedPlace])

  async function loadOffers() {
    try {
      await api
        .get('promocoes', {
          headers: {
            auth: mercados[selectedPlace]._id,
          },
        })
        .then((res) => {
          setSpecialOffers(res.data)
          if (res.data.length > 0) setLoadingOffers(false)
        })
    } catch (err) {
      Alert.alert(err)
    }
  }

  function calcDistanceBetween_MATH() {
    let lat1 = userLocation.latitude
    let lat2 = mercados[selectedPlace].market_latitude
    let lon1 = userLocation.longitude
    let lon2 = mercados[selectedPlace].market_longitude
    let radlat1 = Math.PI * lat1/180
    let radlat2 = Math.PI * lat2/180
    let theta = lon1-lon2
    let radtheta = Math.PI * theta/180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344
    setDistance(dist)
    setLoadingDistance(false)
  }

  async function calcDistanceBetween_GOOGLE() {
    try {
      const response = await fetch(
        'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric' + 
          '&key=' +
          GOOGLE_MAPS_APIKEY +
          '&origins=' +
          userLocation.latitude +
          ',' +
          userLocation.longitude +
          '&destinations=' +
          mercados[selectedPlace].market_latitude +
          ',' +
          mercados[selectedPlace].market_longitude,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      const json = await response.json();
      setDistance(json.rows[0].elements[0].distance.value / 1000)
      setLoadingDistance(false)
    } catch (error) {
    console.error(error)
    }
  }

  function refreshPlace() {
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
    setLoadingDistance(true)
    //calcDistanceBetween_GOOGLE() // recebe a DISTÂNCIA DA ROTA da API Google Distance Matrix
    calcDistanceBetween_MATH() // calcula a DISTÂNCIA EM LINHA RETA
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

  function openExternalDirections() {
    let url =
      'https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=' +
      mercados[selectedPlace].market_latitude +
      ', ' +
      mercados[selectedPlace].market_longitude
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log('Não sei o que fazer com a URL: ' + url)
        } else {
          return Linking.openURL(url)
        }
      })
      .catch((err) => console.error('Um erro ocorreu', err))
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

  return loadingMarkets ? (
    <LoadingGif />
  ) : (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.mapView}
        rotateEnabled={false}
        showsPointsOfInterest={false}
        showsBuildings={false}
        showsMyLocationButton={false}
        onMapReady={refreshPlace}
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
        <Text style={styles.tipText}>
          {'<--------------- Deslize para trocar de mercado --------------->'}
        </Text>
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
                  {!loadingDistance ?
                    <Text style={styles.distanceText}>{distance.toFixed(2) + ' km'}</Text>
                  : <Text style={styles.distanceText}>▬▬▬</Text>
                  }     
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
                      onPress={openExternalDirections}
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
                {!loadingOffers ? (
                  specialOffers.map((offer, index) => (
                    <View style={styles.productItem} key={index}>
                      <Image
                        source={{
                          uri: offer.product_picture_url,
                        }}
                        style={styles.productImg}
                      />
                      <Text style={styles.productPrice}>
                        R$ {offer.product_price}
                      </Text>
                    </View>
                  ))
                ) : (
                  <View style={styles.productItem}>
                    <Image source={NoOffersIcon} style={styles.productImg} />
                    <Text style={styles.productPrice}>Sem ofertas</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          <DummyCard styles={styles} productsVisible={productsVisible} />
        </ScrollView>
      </View>

      <Modal animationType="fade" transparent={true} visible={tutorialVisible}>
        <View style={styles.tutorialView}>
          <Image source={SwipeTutorialGif} style={styles.swipeTutorialGif} />

          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Dica: Você pode fazer o gesto de deslizar para trocar de mercado!
            </Text>

            <TouchableOpacity
              style={styles.tutorialButton}
              onPress={() => {
                setTutorialVisible(!tutorialVisible)
              }}
            >
              <Text style={styles.textStyle}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}
