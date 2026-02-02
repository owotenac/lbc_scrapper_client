import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { global_styles } from '@/models/global-css';
import { ProductProps } from '@/models/products';
import ProductCard  from '@/components/product_card';
import { BackEndService } from '@/services/backend';
import {  useLocalSearchParams } from 'expo-router';

export default function Search() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<ProductProps[]>([]);

    const local = useLocalSearchParams();
    const url = local.url as string;

    const fetchItems = async () => {
        try {
            setLoading(true);
            //get the products from backend
            const result = await BackEndService.searchItems(url);
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
                        <ProductCard {...item} />
                    )
                }
                //onEndReached={loadMore}
                onEndReachedThreshold={2}
                windowSize={4}
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