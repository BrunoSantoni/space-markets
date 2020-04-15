// pedrov4z

import React, { useRef, useState, useEffect } from 'react';
import {
    Text,
    Image,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import api from '../../services/api';

const { width } = Dimensions.get('window');

export default function MapScreen() {
    const mapRef = useRef(null);
    const markRef = useRef(null);
    const [mercados, setMercados] = useState([]);
    let prevPlace = 0;

    useEffect(() => {
        api.get('mercados').then(res => setMercados(res.data))
    }, []);
    
    const navigation = useNavigation();

    function navigateToSuggest() {
        navigation.navigate('Suggest')
    }

    // function onMapReady() {
    //     mercados[0].markRef.showCallout()
    // }

    return(
        <View style={styles.container}>
            <MapView
            ref={mapRef}
            initialRegion={{
                latitude: -23.57881,
                longitude: -48.03744,
                latitudeDelta: 0.0142,
                longitudeDelta: 0.0131,
            }}
            style={styles.mapView}
            rotateEnabled={false}
            scrollEnabled={true}
            zoomEnabled={false}
            showsPointsOfInterest={false}
            showsBuildings={false}
            showsUserLocation={true}
            showsMyLocationButton={true}
            >
                {mercados.map((mercado) => (
                    <MapView.Marker
                    ref={(markRef) => (mercado.markRef = markRef)}
                    title={mercado.market_name}
                    description={mercado.market_street + ', ' + mercado.market_number}
                    key={mercado.market_id}
                    coordinate={{
                        latitude: mercado.market_latitude,
                        longitude: mercado.market_longitude,
                    }}
                    >
                        <Image
                        source={require('../../../assets/img/marker.png')}
                        style={styles.marker}
                        />
                    </MapView.Marker>
                ))} 
            </MapView>
            
            <ScrollView
            style={styles.placesContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onMomentumScrollEnd={(e) => {
                const scrolled = e.nativeEvent.contentOffset.x;

                const place = scrolled > 0 ? scrolled / width : 0;
            
                console.log('prevPlace: ' + prevPlace);
                console.log('place: ' + place);

                if (place != prevPlace) {
                    const { market_latitude, market_longitude, markRef } = mercados[place];

                    mapRef.current.setCamera(
                        {
                            center: {
                                latitude: market_latitude,
                                longitude: market_longitude,
                            },
                        },
                        1000
                    );

                    setTimeout(() => {
                        markRef.showCallout();
                    }, 1000);

                    prevPlace = place;
                }
            }}>
                { mercados.map((mercado) => (
                    <View key={mercado.market_id} style={styles.place}>
                        <Text>{ mercado.market_name }</Text>
                        <Text>{ mercado.market_street + ', ' + mercado.market_number }</Text>
                    </View>
                )) }
            </ScrollView>
                    
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
    );
}
