import { Text, View, Button , StyleSheet, TextInput} from "react-native";
import { router } from "expo-router";
import { global_styles } from "@/models/global-css";
import React, { useState } from 'react';
import { BackEndService } from '@/services/backend';

export default function Index() {
        const [searchTxt, setSearchTxt] = useState('');
    const [loading, setLoading] = useState(true);
  const search = () => {
      router.push({
            pathname: '/search',
             params: { url: searchTxt }
        })
  }
    const autoSearch =  async() => {
          try {
      setLoading(true);
      //get the products from backend
      const result = await BackEndService.autoSearch(searchTxt);
      setLoading(false);

      router.push({
        pathname: '/read'
      })

    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
      router.push({
            pathname: '/search',
             params: { url: searchTxt }
        })
  }
  
  const read = () => {
      router.push({
            pathname: '/read'
        })
  }

  return (
    <View
      style={global_styles.container}
    >
      <View style={{width:"100%", padding: 20}}>
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
      <View style={{marginTop: 10}}>
      <Button title="Automatic Search LBC" onPress={autoSearch}></Button>
      </View>
      </View>
      <View style={{width:"100%", padding: 20}}>
        <Text style={styles.main}>Get COLD Data</Text>
      <Button title="Get COLD DATA" onPress={read}></Button>
      </View>
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
    main :{
      color: 'white',
      fontSize: 25,
      padding: 10
    }
  })