import React, { useState, useEffect, useRef } from 'react'
import { Image, View, Dimensions } from 'react-native'

import MapView from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

import styles from '../map-screen/styles'
import LoadingGif from '../../../assets/img/loading2.gif'

export default function DirectionsScreen({ route }) {
  const {
    marketName,
    marketPicture,
    marketStreet,
    marketNumber,
    marketLatitude,
    marketLongitude,
  } = route.params

  const destination = {
    latitude: marketLatitude,
    longitude: marketLongitude,
  }

  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0
  })

  const GOOGLE_MAPS_APIKEY = ''

  const defaultLatDelta = 0.0142
  const defaultLongDelta = 0.0131

  const [loading, setLoading] = useState(true)
  const mapRef = useRef(null)

  const { width, height } = Dimensions.get('window')

  useEffect(() => {
    navigator.geolocation.watchPosition(
      position => {
        const lat = parseFloat(position.coords.latitude)
        const long = parseFloat(position.coords.longitude)
        setUserLocation({ latitude: lat, longitude: long })
      },
      error => console.log('ouch'),
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      }
    )
    setLoading(false)
  }, [])

  /* useEffect(() => {
    if (!loading) centerMapCamera()
  }, [userLocation])

  function centerMapCamera() {
    mapRef.current.animateToRegion(
      {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: defaultLatDelta,
        longitudeDelta: defaultLongDelta,
      },
      750
    )
  } */

  const onReady = (result) => {
    mapRef.current.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: (width / 10),
        bottom: (height / 10),
        left: (width / 10),
        top: (height / 10),
      },
    });
  }

  return loading ? (
    <Image
      source={LoadingGif}
      style={{
        width: '10%',
        height: '10%',
        alignSelf: 'center',
      }}
      resizeMode="contain"
    />
  ) : (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        showsUserLocation
        style={styles.mapView}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: defaultLatDelta,
          longitudeDelta: defaultLongDelta,
        }}
      >
        <MapView.Marker
          title={marketName}
          description={marketStreet + ', ' + marketNumber}
          coordinate={{
            latitude: marketLatitude,
            longitude: marketLongitude,
          }}
        >
          <Image source={{ uri: marketPicture }} style={styles.marker} />
        </MapView.Marker>

        {/* <MapViewDirections
          origin={userLocation}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="#63b1b9"
          onReady={onReady}
        /> */}
      </MapView>
    </View>
  )
}
