import ProductCardSimplified from '@/components/product_card_simplified';
import { global_styles } from '@/models/global-css';
import { ProductProps } from '@/models/products';
import { BackEndService } from '@/services/backend';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Read() {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<ProductProps[]>([]);
    const local = useLocalSearchParams();
    const tempAds = local.tempAds;

    const fetchItems = async () => {
        try {
            setLoading(true);
            //get the products from backend
            console.log('fetch')
            const result = await BackEndService.readItems(tempAds as string);
            setItems(result['data']);
            setLoading(false);

        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
        }
    };

    useEffect( () => {
            fetchItems();
        }, [])

  return (
        <SafeAreaProvider>
            <SafeAreaView style={global_styles.container}>

        <View style={styles.content}>
            <FlatList style={styles.list}
                data={items}
                numColumns={1}
                renderItem={
                    ({ item }) => (
                        <ProductCardSimplified {...item} />
                    )
                }
                //onEndReached={loadMore}
                onEndReachedThreshold={2}
                //windowSize={4}
                ListFooterComponent={() => (
                    <View>
                        {loading && <ActivityIndicator size="large" />}
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>

                </SafeAreaView>
                </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
        content: {
        flex: 1,
        margin: 10,
        width: '100%',
    },
    list: {
        flex: 1,
    }
})