import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet } from 'react-native'

export default function Favorites() {
  return(
   <View>
     <Text style={styles.container}>Página de Favoritos!</Text>
     <StatusBar />
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
  }
})