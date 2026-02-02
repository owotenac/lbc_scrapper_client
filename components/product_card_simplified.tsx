import { StyleSheet, Text, View, Image, Linking, Pressable } from 'react-native'
import { ProductProps } from '@/models/products';
import React, { useState } from 'react'
import { router } from "expo-router";
import FinancialComponentSimplified from '@/components/financial_component simplified';
import { useStore } from '@/models/store'
import AntDesign from '@expo/vector-icons/AntDesign';
import { BackEndService } from '@/services/backend';
import { useResponsive } from '@/hooks/responsive';


export default function ProductCardSimplified(item: ProductProps) {
    const { setProduct } = useStore();
    const [disabled, setDisabled] = useState(false)
    const { isMobile, isDesktop } = useResponsive();


    const openDetails = () => {

        setProduct(item)
        router.push({
            pathname: '/product-details',
            params: { needAnalysis: 0 }
        })
    }

    const removeFromList = async () => {
        if (disabled)
            return
        try {
            //remove the products from backend
            const result = await BackEndService.removeColdProduct(item.url);
            setDisabled(true)

        } catch (error) {
            console.error("Error removing products:", error);

        }

    }

    return (
        <Pressable
            onPress={openDetails}>
            <View style={styles.card}>
                <Text style={styles.main_text}>{item.subject}</Text>
                <Text style={styles.main_text}>{item.price_euros} €</Text>
                <Text style={styles.link} onPress={() => Linking.openURL(item.url)}>{item.url}</Text>
                <Text style={styles.location_text}>{item.location.zipcode} - {item.location.city}</Text>

                {!disabled &&
                    <View style={{ flexDirection: isMobile ? 'column' : 'row' }}>
                        {item.images_url.length > 0 &&
                            <Image source={{ uri: item.images_url[0] }} style={styles.image} resizeMode="cover" />}
                        <View style={styles.divider} />
                        {item.financials &&
                            <View style={{ marginHorizontal: 50, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <FinancialComponentSimplified data={item.financials[0]} />
                                <FinancialComponentSimplified data={item.financials[1]} />
                            </View>
                        }
                    </View>
                }
                <Pressable onPress={removeFromList} style={{ marginTop: 10, alignSelf: 'flex-start' }}>
                    <View style={!disabled ? styles.buttonRemove : styles.buttonRemoveDisabled}>
                        <AntDesign name="close-circle" size={24} color="white" />
                        {!disabled &&
                            <Text style={styles.textRemove}>Remove from cold data</Text>
                        }
                        {disabled &&
                            <Text style={styles.textRemove}>Removed</Text>
                        }
                    </View>
                </Pressable>
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
        width: 500,
        height: 300,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10, 
        alignContent: 'center',
        justifyContent: 'space-around',
        alignItems: 'center'

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
    },
    divider: {
        height: 1,
        borderColor: '#777',
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 5,
    },
    textRemove: {
        color: "#fff",
        fontSize: 15,
        marginLeft: 15
    },
    buttonRemove: {
        backgroundColor: "#c71322",
        borderRadius: 5,
        padding: 10,
        color: "white",
        fontSize: 14,
        flexDirection: 'row',
        maxWidth: 230,
        alignItems: 'center',
        alignSelf: 'flex-start'
    },
    buttonRemoveDisabled: {
        backgroundColor: "#7a7a7a",
        borderRadius: 5,
        padding: 10,
        color: "white",
        fontSize: 14,
        flexDirection: 'row',
        maxWidth: 230,
        alignItems: 'center',
        alignSelf: 'flex-start'
    }
})