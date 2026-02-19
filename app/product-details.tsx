import CarouselImage from '@/components/carousel';
import FinancialComponent from '@/components/financial_component';
import { FinancialsProps } from '@/models/financials';
import { global_styles } from '@/models/global-css';
import { ProductProps } from '@/models/products';
import { BackEndService } from '@/services/backend';

import { useResponsive } from '@/hooks/responsive';
import { featureFlags } from '@/models/config';
import { useStore } from '@/models/store';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState, } from 'react';
import { ActivityIndicator, Button, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Markdown } from "react-native-remark";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function ProductDetails() {

    const { products } = useStore()
    const local = useLocalSearchParams();
    const needAnalysis = local.needAnalysis;
    const [loading, setLoading] = useState(true);
    const [AItext, setAItext] = useState<string>("");
    const [financials, setFinancials] = useState<FinancialsProps[] | null>(null)
    const [item, setItem] = useState<ProductProps | null>(null);
    const navigation = useNavigation();
    const { isMobile, isDesktop } = useResponsive();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                //get the products from backend
                const result = await BackEndService.getDetailledProduct(products.url);

                setItem(result)
                setLoading(false);

            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false); // Don't forget to stop loading on error!
            }
        };

        if (needAnalysis == "1") {
            fetchProducts(); // this is the case when product was not analysed
        }
        else {
            setItem(products) // this is the case when product was already analysed
            setLoading(false)
        }
    }, []);

    const aiAnalysis = async (item: ProductProps) => {
        try {
            setLoading(true);
            const analysis = await BackEndService.getAIAnalysis(item.body, item.attributes_cleaned);
            setAItext(analysis['data']);
            setFinancials(analysis['financials'])
            //update the item too
            // Update with new object
            setItem(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    analysis: analysis['data'],
                    financials: analysis['financials']
                };
            });
            setLoading(false);
        } catch (error) {
            console.error("Error fetching AI results:", error);
            setLoading(false);
        }
    }

    const save = async (item: ProductProps) => {
        try {
            await BackEndService.saveProduct(item);
        } catch (error) {
            console.error("Error saving:", error);
        }        
    }

    const RenderAIText = () => {
        if (AItext) {
            return (
                <View style={styles.ai_section}>
                    <Markdown
                        markdown={AItext}
                        customStyles={{
                            // Override default styles
                            inlineCode: {
                                color: "red",
                            },
                            text: {
                                color: "black",
                            },
                        }} />
                </View>
            )
        }
        if (item?.analysis) {
            return (
                <View style={[styles.ai_section, { maxWidth: isMobile ? '100%' : '50%' , justifyContent: 'space-around' }] }>
                    <Markdown
                        markdown={item.analysis} 
                        customStyles={{
                            // Override default styles
                            inlineCode: {
                                color: "red",
                            },
                            text: {
                                color: "black",
                                fontSize: 14
                            },
                        }} />
                </View>
            )
        }
    }

    const RenderFinancials = () => {
        if (financials) {
            return (
                <View style={{ flex:1, flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                    <FinancialComponent data={financials[0]} isSimplified={false} />
                    <FinancialComponent data={financials[1]} isSimplified={false} />
                </View>
            )
        }
        if (item?.financials) {
            return (
                <View style={{ flex:1, flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                    <FinancialComponent data={item.financials[0]} isSimplified={false}/>
                    <FinancialComponent data={item.financials[1]} isSimplified={false}/>
                </View>
            )
        }
    }

    return (
        <SafeAreaProvider style={global_styles.container}>
            <SafeAreaView style={{flex:1, width:"100%"}}>
                {!item ? (
                    <ActivityIndicator size="large" />
                ) :
                    (
                        <View style={{
                            flex: 1, alignContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View style={{ flexDirection: isMobile ? 'column' : 'row' , justifyContent: 'space-around' }}>
                                <View style={{ marginTop: 5 , marginBottom: 10, marginLeft: 10}}>
                                    <Text style={styles.main_text}>{item.subject}</Text>
                                    <Text style={styles.main_text}>{item.price_euros} €</Text>
                                    <Text style={styles.description}>{item.location.zipcode} - {item.location.city}</Text>
                                    <Text style={styles.link} onPress={() => Linking.openURL(item.url)}>{item.url}</Text>
                                </View>
                            </View>
                            <ScrollView style={styles.card}>
                                <View style={{alignItems: 'center'}}>
                                <CarouselImage
                                    images={item.images_url}
                                />    
                                </View>                            
                                <View style={styles.divider} />
                                <Text style={styles.chapter}>Description</Text>
                                <Text style={styles.description}>{item.body}</Text>

                                <View style={styles.divider} />
                                <Text style={styles.chapter}>AI information</Text>
                                { !featureFlags.isReadOnly && 
                                <Button title="AI analysis" onPress={() => aiAnalysis(item)}></Button>
                                }
                                {loading && <ActivityIndicator size="small" />}
                                <View style={{ flexDirection: isMobile ? 'column' : 'row' , justifyContent: 'space-around' }}>
                                    {RenderAIText()}
                                    {RenderFinancials()}
                                </View>
                                <View style={styles.divider} />
                                { !featureFlags.isReadOnly && 
                                <Button title="Save" onPress={() => save(item)}></Button>
                                }
                                {/* {item.attributes_cleaned &&
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.chapter}>Features</Text>

                                        {item.attributes_cleaned.map((feature, index) => (
                                            feature.key_label ? (
                                                <Text key={feature.key} style={styles.contact_text}>
                                                    {feature.key_label}: {feature.value_label}
                                                </Text>
                                            ) : (
                                                <Text key={feature.key} style={styles.contact_text}>
                                                    {feature.key}: {feature.value_label}
                                                </Text>
                                            )
                                        ))}
                                    </View>
                                } */}


                            </ScrollView>
                        </View>

                    )}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        flex: 1
    },
    location_text: {
        color: "#cccce6",
        fontSize: 20,
        fontFamily: "f-light-italic",
    },
    main_text: {
        color: "#fff",
        fontSize: 25,
        textAlign: 'left',
        fontFamily: 'f-bold'
    },
    description: {
        color: "#ccc",
        fontSize: 18,
    },
    divider: {
        height: 1,
        borderColor: '#777',
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 5,
    },
    chapter: {
        color: "#fff",
        fontSize: 20,
        fontWeight: 500,
        textAlign: 'left',
        marginBottom: 10
    },
    contact_text: {
        color: "#cccce6",
        fontSize: 14,
        marginLeft: 20,
        margin: 5,
    },
    link: {
        color: "#4ea1f3",
        fontSize: 14,
        marginTop: 5,
    },
    ai_section: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginTop: 10,
        marginBottom: 10,
        //flex:1
        //maxWidth: "50%"
    },
    ai_description: {
        color: 'black',
        fontSize: 14
    }

})