import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
// Essa função sempre será executado primeiro
import { useLayoutEffect } from 'react'


export default function Detail() {
  const route = useRoute()
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.data ? route.params?.data.name : 'Detalhes da receita', 
      headerRight: () => (
        // Button parecido com TouchableOpacity
        <Pressable onPress={ () => console.log('Testando')}>
          <Entypo 
            name="heart"
            size={28}
            color="#FF4141"
          />
        </Pressable>
      ) 
    })
  }, [navigation, route.params?.data])

  return(
   <View>
     <Text style={styles.container}>Página Detalhes!</Text>
     <Text>{route.params?.data.name}</Text>
     <StatusBar />
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
  }
})