import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet } from 'react-native'

export default function Search() {
  return(
   <View>
     <Text style={styles.container}>Páginas Detalhes da receitas!</Text>
     <StatusBar />
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
  }
})