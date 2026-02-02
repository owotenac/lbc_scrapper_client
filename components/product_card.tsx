import { StyleSheet, Text, View, Image, Linking, Pressable } from 'react-native'
import { ProductProps } from '@/models/products';
import React from 'react'
import { router } from "expo-router";
import { useStore } from '@/models/store'


export default function ProductCard(item: ProductProps) {

    const { setProduct } = useStore();

    const openDetails = () => {
        setProduct( item )
        router.push({
            pathname: '/product-details',
            params: { needAnalysis: 1 }
        })
    }

    return (
        <Pressable
            onPress={openDetails}>
            <View style={styles.card}>
                <Text style={styles.main_text}>{item.subject}</Text>
                <Text style={styles.main_text}>{item.price_euros} €</Text>
                <Text style={styles.link} onPress={() => Linking.openURL(item.url)}>{item.url}</Text>
                <Text style={styles.location_text}>{item.location.zipcode} - {item.location.city}</Text>

                {item.images_url.length > 0 &&
                    <Image source={{ uri: item.images_url[0] }} style={styles.image} resizeMode="cover" />}
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        borderColor: "#33334d",
        borderWidth: 1,
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#222232",
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 300,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    link: {
        color: "#4ea1f3",
        fontSize: 14,
        marginTop: 5,
    },
    location_text: {
        color: "#cccce6",
        fontSize: 14,
        marginTop: 5,
        marginBottom: 10
    },
    main_text: {
        color: "#fff",
        fontSize: 20,
        textAlign: 'left',
        fontFamily: 'f-bold'
    }
})