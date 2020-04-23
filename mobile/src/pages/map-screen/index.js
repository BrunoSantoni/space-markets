// pedrov4z

import React, { useRef, useState, useEffect } from 'react'
import {
    Text,
    Image,
    View,
    FlatList,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import MapView from 'react-native-maps'

import Logo from '../../components/Logo'

import styles from './styles'
import api from '../../services/api'

const { width } = Dimensions.get('window')

let prevPlace = 0

export default function MapScreen() {
    const mapRef = useRef(null)
    const placesRef = useRef(null)
    const navigation = useNavigation()
    const [mercados, setMercados] = useState([])
    const [loading, setLoading] = useState(true)
    const [placesVisible, setPlacesVisible] = useState(true)
    const [productsVisible, setProductsVisible] = useState(true)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            () => {}, //sucesso
            () => {}, //error
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000
            }
        )

        api.get('mercados').then((res) => {
            setMercados(res.data)
            setLoading(false)
        })
    }, [])

    function navigateToSuggest() {
        navigation.navigate('Suggest')
    }

    function showFirstCallout() {
        mercados[0].markRef.showCallout()
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

    return loading ? (
        <Logo />
    ) : (
        <View style={styles.container}>
            <Logo />

            <MapView
                ref={mapRef}
                initialRegion={{
                    latitude: mercados[0].market_latitude,
                    longitude: mercados[0].market_longitude,
                    latitudeDelta: 0.0142,
                    longitudeDelta: 0.0131,
                }}
                style={styles.mapView}
                rotateEnabled={false}
                scrollEnabled={true}
                zoomEnabled={true}
                showsPointsOfInterest={false}
                showsBuildings={false}
                showsUserLocation={true}
                showsMyLocationButton={true}
                onMapReady={showFirstCallout}
                onPress={() => {
                    if (placesVisible) setPlacesVisible(false)
                }}
            >
                {mercados.map((mercado, index) => (
                    <MapView.Marker
                        ref={(markRef) => (mercado.markRef = markRef)}
                        title={mercado.market_name}
                        description={
                            mercado.market_street + ', ' + mercado.market_number
                        }
                        key={mercado.market_id}
                        coordinate={{
                            latitude: mercado.market_latitude,
                            longitude: mercado.market_longitude,
                        }}
                        onPress={() => {
                            if (!placesVisible) setPlacesVisible(true)
                            placesRef.current.scrollToIndex({
                                animated: true,
                                index: index,
                            })
                            prevPlace = index
                            console.log('prevPlace: ' + prevPlace)
                        }}
                    >
                        <Image
                            //source={require('../../../assets/img/marker.png')}
                            source={{ uri: mercado.market_picture_url }}
                            style={styles.marker}
                        />
                    </MapView.Marker>
                ))}
            </MapView>

            <View style={[placesVisible ? styles.placesContainer : styles.hidden]}>
                <FlatList
                    ref={placesRef}
                    data={mercados}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    initialNumToRender={1}
                    keyExtractor={(item, index) => {
                        return item.id
                    }}
                    getItemLayout={(data, index) => ({
                        length: width,
                        offset: width * index,
                        index,
                    })}
                    onMomentumScrollEnd={(e) => {
                        const scrolled = e.nativeEvent.contentOffset.x

                        let place = Math.round(scrolled / width)

                        if (place == mercados.length) {
                            place = 0
                            placesRef.current.scrollToOffset({
                                x: 0,
                                animated: false,
                            })
                        }

                        if (place != prevPlace) {
                            const {
                                market_latitude,
                                market_longitude,
                                markRef,
                            } = mercados[place]

                            mapRef.current.animateCamera(
                                {
                                    center: {
                                        latitude: market_latitude,
                                        longitude: market_longitude,
                                    },
                                },
                                10000
                            )

                            markRef.showCallout()

                            prevPlace = place
                        }
                    }}
                    renderItem={() =>
                        mercados.map((mercado) => (
                            <View key={mercado.market_id}>
                                <View style={styles.place}>
                                    <View style={styles.marketContainer}>
                                        <View>
                                            <Image
                                                source={{
                                                    uri:
                                                        mercado.market_picture_url,
                                                }}
                                                style={styles.placeImg}
                                            />
                                            <Text>2,5 km</Text>
                                        </View>

                                        <View style={styles.actContainer}>
                                            <Text style={styles.nome}>
                                                {mercado.market_name}
                                            </Text>
                                            <Text style={styles.endereco}>
                                                {mercado.market_street +
                                                    ', ' +
                                                    mercado.market_number}
                                            </Text>
                                            <View style={styles.btnContainer}>
                                                <TouchableOpacity
                                                    style={styles.placeBtn}
                                                    onPress={() =>
                                                        navigateToMarketProducts(
                                                            mercado._id,
                                                            mercado.market_name,
                                                            mercado.market_picture_url
                                                        )
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.placeBtnText
                                                        }
                                                    >
                                                        Ver produtos
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.placeBtn}
                                                >
                                                    <Text
                                                        style={
                                                            styles.placeBtnText
                                                        }
                                                    >
                                                        Rota até aqui
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.placeBtn}
                                                    onPress={
                                                        toggleProductsVisibility
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.expandBtnText
                                                        }
                                                    >
                                                        {productsVisible
                                                            ? '▲'
                                                            : '▼'}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={[productsVisible ? styles.productsContainer : styles.hidden]}>
                                    <Text style={styles.productsTitle}>
                                        Principais promoções{' '}
                                        {mercado.market_name}
                                    </Text>
                                    <View style={styles.listProducts}>
                                        <View style={styles.productItem}>
                                            <Image
                                                source={{
                                                    uri:
                                                        mercado.market_picture_url,
                                                }}
                                                style={styles.productImg}
                                            />
                                            <Text style={styles.productPrice}>
                                                R$ 2,50
                                            </Text>
                                        </View>
                                        <View style={styles.productItem}>
                                            <Image
                                                source={{
                                                    uri:
                                                        mercado.market_picture_url,
                                                }}
                                                style={styles.productImg}
                                            />
                                            <Text style={styles.productPrice}>
                                                R$ 2,50
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))
                    }
                />
            </View>

            <TouchableOpacity
                style={styles.btnSugerir}
                onPress={navigateToSuggest}
            >
                <Image
                    source={require('../../../assets/img/btnAddMarket.png')}
                    style={styles.btnSugerirImg}
                />
            </TouchableOpacity>
        </View>
    )
}
