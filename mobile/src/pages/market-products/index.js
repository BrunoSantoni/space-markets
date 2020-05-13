import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './styles'

import { useNavigation } from '@react-navigation/native'

import api from '../../services/api'

export default function MarketProducts({ route }) {
    const navigation = useNavigation()
    const { marketId, marketName, marketPicture } = route.params
    const [products, setProducts] = useState([])

    useEffect(() => {
        api.get('produtos', {
            headers: {
                auth: marketId
            }
        }).then(res => {
            setProducts(res.data)
        })
    }, [marketId])

    function navigateToMap() {
        navigation.goBack()
    }

    const productsList = products.map((product, index) => (
        index % 2 === 0 ?
        (
        <View style={[styles.product, styles.even]} key={product._id}>
            <Image source={{uri: product.product_picture_url}} style={styles.productImg} />
            <View>
                <Text style={styles.productName}>{product.product_name}</Text>
                <View style={styles.priceAndName}>
                    <Text style={styles.textPriceAndName}>R$ {product.product_price}</Text>
                </View>
                <Text style={styles.location}>Descrição: {product.product_description}</Text>
            </View>
        </View>
        ) : 
        (
        <View style={styles.product} key={product._id}>
            <Image source={{uri: product.product_picture_url}} style={styles.productImg} />
            <View>
                <Text style={styles.productName}>{product.product_name}</Text>
                <View style={styles.priceAndName}>
                    <Text style={styles.textPriceAndName}>R$ {product.product_price}</Text>
                </View>
                <Text style={styles.location}>Descrição: {product.product_description}</Text>
            </View>
        </View>
        )
    ))

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{uri: marketPicture}} style={styles.headerImg} />
                <View>
                    <Text style={styles.headerName}>{marketName}</Text>
                    <TouchableOpacity style={styles.backBtn}>
                        <Text style={styles.backBtnText} onPress={navigateToMap}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.sessionTitle}>
                <Text style={styles.titleText}>Ofertas!</Text>
            </View>
            <View style={styles.productContainer}>
                {productsList}
            </View>
        </View>
    )
}