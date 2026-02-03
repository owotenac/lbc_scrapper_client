import { featureFlags } from '@/models/config';
import { global_styles } from "@/models/global-css";
import { BackEndService } from '@/services/backend';
import { router } from "expo-router";
import React, { useState } from 'react';
import { ActivityIndicator, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [searchTxt, setSearchTxt] = useState('');
  const [loading, setLoading] = useState(false);
  const search = () => {
    router.push({
      pathname: '/search',
      params: { url: searchTxt }
    })
  }
  const autoSearch = async () => {
    try {
      setLoading(true);
      //get the products from backend
      const result = await BackEndService.autoSearch();
      setLoading(false);

    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  }

  const read = () => {
    router.push({
      pathname: '/read' ,
      params: { tempAds: "0"}
    })
  }
  const readTempAds = () => {
    router.push({
      pathname: '/read',
      params: { tempAds: "1"}      
    })
  }
  return (
    <View
      style={global_styles.container}
    >
      <Image source={require('../assets/images/logo.png')} style={styles.image } resizeMode="contain" />
      <TouchableOpacity onPress={read} style={styles.button}><Text style={styles.button_text}>Voir les annonces</Text></TouchableOpacity>

    { !featureFlags.isReadOnly && 
      <View style={{ width: "100%", padding: 20 }}>
        <Text style={styles.main}>Search LBC</Text>
        <TextInput
          style={styles.search_bar}
          onChangeText={setSearchTxt}
          value={searchTxt}
          placeholder='Rechercher'
          placeholderTextColor={'#555'}
          clearButtonMode='always'
          autoCorrect={false}
          onSubmitEditing={search}
        />
        <Button title="Search LBC" onPress={search}></Button>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.main}>Automatic Search LBC</Text>
          <Button title="Automatic Search LBC" onPress={autoSearch}></Button>
          {loading && <ActivityIndicator size="large" />}
        </View>
        <View style={{ marginTop: 10 }}>
        <Text style={styles.main}>Get COLD Data</Text>
        <Button title="Get SAVED ads" onPress={read}></Button>
        <Button title="Get non analyzed ads" onPress={readTempAds}></Button>
      </View>
      </View>
    }
    </View>
  );
}
const styles = StyleSheet.create({

  search_bar: {
    color: 'black',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#33334d",
    backgroundColor: "#ffffff",
    padding: 10,
    marginBottom: 10,
    fontFamily: "f-regular",

  },
  main: {
    color: 'white',
    fontSize: 25,
    padding: 10
  },
    button: {
    marginBottom: 10,
    height: 100,
    width: 150,
    backgroundColor: '#313168',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  button_text: {
    color: 'white',
    fontSize: 25,
    fontFamily: "f-regular",
    textAlign:'center'
  } ,
    image: {
    width: 400, 
    height: 300, 
    marginBottom: 30,
  },
})