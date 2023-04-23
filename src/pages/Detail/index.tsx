import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet } from 'react-native'

export default function Detail() {
  return(
   <View>
     <Text style={styles.container}>Página Detalhes!</Text>
     <StatusBar />
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
  }
})