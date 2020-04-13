// pedrov4z

import React, { Component } from 'react';
import {
    Text,
    Image,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const { width } = Dimensions.get('window');

export default class MapScreen extends Component {
    state = {
        places: [
            {
                id: 1,
                title: 'Pão de Mel',
                description: '',
                latitude: -23.581466,
                longitude: -48.033675,
            },

            {
                id: 2,
                title: 'Politel',
                description: '',
                latitude: -23.581331,
                longitude: -48.034835,
            },

            {
                id: 3,
                title: 'Dia',
                description: '',
                latitude: -23.580181,
                longitude: -48.031355,
            },

            {
                id: 4,
                title: 'Extra',
                description: '',
                latitude: -23.577314,
                longitude: -48.037598,
            },

            {
                id: 5,
                title: 'Cofesa',
                description: '',
                latitude: -23.584357,
                longitude: -48.048443,
            },
        ],
    };

    _mapReady = () => {
        this.state.places[0].mark.showCallout();
    };

    render() {
        const { latitude, longitude } = this.state.places[0];

        return (
            <View style={styles.container}>
                <MapView
                    ref={(map) => (this.mapView = map)}
                    initialRegion={{
                        latitude,
                        longitude,
                        latitudeDelta: 0.0142,
                        longitudeDelta: 0.0131,
                    }}
                    style={styles.mapView}
                    rotateEnabled={false}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    showsPointsOfInterest={false}
                    showsBuildings={false}
                    onMapReady={this._mapReady}
                >
                    {this.state.places.map((place) => (
                        <MapView.Marker
                            ref={(mark) => (place.mark = mark)}
                            title={place.title}
                            //description={place.description}
                            key={place.id}
                            coordinate={{
                                latitude: place.latitude,
                                longitude: place.longitude,
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

                        const place =
                            scrolled > 0
                                ? scrolled / width
                                : 0;

                        const { latitude, longitude, mark } = this.state.places[
                            place
                        ];

                        this.mapView.animateCamera(
                            {
                                center: {
                                    latitude,
                                    longitude,
                                },
                            },
                            1000
                        );

                        setTimeout(() => {
                            mark.showCallout();
                        }, 1000);
                    }}
                >
                    {this.state.places.map((place) => (
                        <View style={styles.place} key={place.id}>
                            <Text>{place.title}</Text>
                            <Text>{place.description}</Text>
                        </View>
                    ))}
                </ScrollView>
                <TouchableOpacity 
                style={styles.btnSugerir}
                onPress={() => this.props.navigation.navigate('Suggest')}
                >
                    <Image
                        source={require('../../../assets/img/btnAddMarket.png')}
                        style={styles.btnSugerirImg}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}
