import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, FlatList} from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'

// Api
import api from '../../services/api'

// Componente
import FoodList from '../../components/FoodList'

import { Food } from '../Home'

type RouteParams = {
  key: string;
  name: string;
  path?: string;
  data: Food;
};

type ParamList = {
  Detail: RouteParams;
};

export default function Search() {
  const [receipes, setReceipes] = useState<Food[]>([])
  const route = useRoute< RouteProp<ParamList, 'Detail'>>()

  useEffect(() => {
    async function fetchReceipes(){
      const response = await api.get(`/foods?name_like=${route.params?.name}`)

      setReceipes(response.data)
    }

    fetchReceipes()
  }, [route.params?.name])

  return(
   <View style={styles.container}>
    <FlatList 
      data={receipes} // A lista que será rederizada
      keyExtractor={(item) => String(item.id)} // A chave para cada receita
      renderItem={({item}) => <FoodList {...item} />}
      // Tirar a barra de rolagem
      showsVerticalScrollIndicator={false}
      // Se o array for vazio
      ListEmptyComponent={() => <Text style={styles.text}>Não encontramos o que está buscando...</Text>}
    />
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F9FF",
    paddingStart: 14,
    paddingEnd: 14,
    paddingTop: 14,
  },
  text: {
    fontSize: 16
  }
})