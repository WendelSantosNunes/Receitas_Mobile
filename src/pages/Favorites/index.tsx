import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { useState, useEffect } from 'react'

import { getFavorites } from '../../utils/storage'

// Componentes
import FoodList from '../../components/FoodList'

export default function Favorites() {
  const [receipes, setReceipes] = useState([])
  // Se ele estiver nessa tela, essa variável será true
  const isFocused = useIsFocused()

  useEffect(() => {
    let isActive = true

    async function getReceipes() {
      const result = await getFavorites('@appreceitas')

      if(isActive){
        setReceipes(result)
      }
    }

    if(isActive){
      getReceipes()
    }

    return () => {
      isActive = false
    }

  },[isFocused])
 
  return(
   <SafeAreaView style={styles.container}>
     <Text style={styles.title}>Receitas Favoritas</Text>

     {receipes.length === 0 && (
      <Text>Você ainda não tem nenhuma receita salva</Text>
     )}

    <FlatList 
      data={receipes} // A lista que será rederizada
      keyExtractor={(item) => String(item.id)} // A chave para cada receita
      renderItem={({item}) => <FoodList {...item} />}
      // Tirar a barra de rolagem
      showsVerticalScrollIndicator={false}
      style={{marginTop: 14}}
    />

   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F9FF',
    paddingStart: 14,
    paddingEnd: 14,
    paddingTop: 36, 
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 24,
  }
})