import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
// Biblioteca de navegação entre screen
import { useNavigation } from '@react-navigation/native'

interface Ingredient {
  id: string,
  name: string,
  amount: string
}

interface Instruction {
  id: string,
  text: string,
}

interface Food {
  id: string,
  name: string,
  total_ingredients: string,
  time: number,
  cover: string,
  video: string,
  ingredients: Ingredient[],
  instructions: Instruction[],
}

export default function FoodList( data: Food ){
  const navigation = useNavigation();

  function handleNavigate(){
    // Navegado para outra página
    // nome deve ser igual colocando na rota
    navigation.navigate("Detail", {data: data})
  }

  return(
    <TouchableOpacity 
      activeOpacity={0.7} 
      style={styles.container}
      onPress={handleNavigate}
    >
      <Image 
        source={{uri: data.cover}}
        style={styles.cover}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.description}>{data.total_ingredients} ingredientes | {data.time} min</Text>
      </View> 
      <LinearGradient 
        style={styles.gradient}
        colors={['transparent', 'rgba(0,0,0,0.70)', 'rgba(0,0,0,0.95)']}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  cover: {
    width: '100%',
    height: 200,
    borderRadius: 14,
  },
  info: {
    position: 'absolute',
    zIndex: 99,
    bottom: 14,
    left: 14
  },
  name: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold'
  },
  description: {
    fontSize: 17,
    color: '#FFF',
  },
  gradient: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0, 
    bottom: 0,
    height: '55%',
    borderRadius: 14
  }
})
