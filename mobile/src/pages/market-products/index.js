import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../market-products/styles';
import steward from '../../../assets/img/steward.png'

export default function MarketProducts() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={steward} style={styles.headerImg} />
                <View>
                    <Text style={styles.headerName}>Nome do mercado</Text>
                    <TouchableOpacity style={styles.backBtn}>
                        <Text style={styles.backBtnText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.sessionTitle}>
                <Text style={styles.titleText}>Ofertas!</Text>
            </View>
            <View style={styles.productContainer}>
                <View style={[styles.product, styles.even]}>
                    <Image source={steward} style={styles.productImg} />
                    <View>
                        <Text style={styles.productName}>Nome do produto</Text>
                        <View style={styles.priceAndName}>
                            <Text style={styles.textPriceAndName}>R$ 0,00</Text>
                            <Text style={styles.textPriceAndName}> - </Text>
                            <Text style={[styles.textPriceAndName, {fontStyle: 'italic'}]}>Nome do comércio</Text>
                        </View>
                        <Text style={styles.location}>Localização: (prox, longe, longepradedeu)</Text>
                    </View>
                </View>
                <View style={styles.product}>
                    <Image source={steward} style={styles.productImg} />
                    <View>
                        <Text style={styles.productName}>Nome do produto</Text>
                        <View style={styles.priceAndName}>
                            <Text style={styles.textPriceAndName}>R$ 0,00</Text>
                            <Text style={styles.textPriceAndName}> - </Text>
                            <Text style={[styles.textPriceAndName, {fontStyle: 'italic'}]}>Nome do comércio</Text>
                        </View>
                        <Text style={styles.location}>Localização: (prox, longe, longepradedeu)</Text>
                    </View>
                </View>
                <View style={[styles.product, styles.even]}>
                    <Image source={steward} style={styles.productImg} />
                    <View>
                        <Text style={styles.productName}>Nome do produto</Text>
                        <View style={styles.priceAndName}>
                            <Text style={styles.textPriceAndName}>R$ 0,00</Text>
                            <Text style={styles.textPriceAndName}> - </Text>
                            <Text style={[styles.textPriceAndName, {fontStyle: 'italic'}]}>Nome do comércio</Text>
                        </View>
                        <Text style={styles.location}>Localização: (prox, longe, longepradedeu)</Text>
                    </View>
                </View>
                <View style={styles.product}>
                    <Image source={steward} style={styles.productImg} />
                    <View>
                        <Text style={styles.productName}>Nome do produto</Text>
                        <View style={styles.priceAndName}>
                            <Text style={styles.textPriceAndName}>R$ 0,00</Text>
                            <Text style={styles.textPriceAndName}> - </Text>
                            <Text style={[styles.textPriceAndName, {fontStyle: 'italic'}]}>Nome do comércio</Text>
                        </View>
                        <Text style={styles.location}>Localização: (prox, longe, longepradedeu)</Text>
                    </View>
                </View>
                <View style={[styles.product, styles.even]}>
                    <Image source={steward} style={styles.productImg} />
                    <View>
                        <Text style={styles.productName}>Nome do produto</Text>
                        <View style={styles.priceAndName}>
                            <Text style={styles.textPriceAndName}>R$ 0,00</Text>
                            <Text style={styles.textPriceAndName}> - </Text>
                            <Text style={[styles.textPriceAndName, {fontStyle: 'italic'}]}>Nome do comércio</Text>
                        </View>
                        <Text style={styles.location}>Localização: (prox, longe, longepradedeu)</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}