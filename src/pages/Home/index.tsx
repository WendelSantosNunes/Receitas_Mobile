import { View,TextInput, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList} from 'react-native'
import { useState, useEffect } from 'react'

// icons 
import { Ionicons } from '@expo/vector-icons'

// components
import Logo from '../../components/Logo'
import api from '../../services/api'
import FoodList from '../../components/FoodList'

// interface
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

export default function Home() {
  const [inputValue, setInputValue] = useState('')
  const [foods, setFoods] = useState<Food[]>([])

  useEffect(() => {
    async function fetchApi() {
      const response = await api.get("/foods")

      setFoods(response.data)
    }

    fetchApi() 
  }, [])

  function handleSearch() {
    console.log('Você clicou nesse botão')
  }

  return(
   <SafeAreaView style={styles.container}>
     <Logo />
     <Text style={styles.title}>Encontre a receita</Text>
     <Text style={styles.title}>que combina com você</Text>
     
     <View style={styles.form}>
      {/* input do web*/}
      <TextInput 
        placeholder='Digite o nome comida'
        style={styles.input}
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />
      {/* Botão clicável | button do web */}
      {/* onPress = clicar no button vai acionar essa função */}
      <TouchableOpacity onPress={handleSearch}>
        <Ionicons name="search" color="#4CBE6C" size={28}/>
      </TouchableOpacity>
     </View>

     <FlatList 
      data={foods} // A lista que será rederizada
      keyExtractor={(item) => String(item.id)} // A chave para cada receita
      renderItem={({item}) => <FoodList {...item} />}
      // Tirar a barra de rolagem
      showsVerticalScrollIndicator={false}
    />

   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // O container vai pegar o tamanho total da tela
    backgroundColor: "#F3F9FF", // background da aplicação
    paddingTop: 36, // Isso para evitar ficar junto com status bar.
    // Evitar que conteúdo fique perto das bordas do celular
    paddingStart: 14,
    paddingEnd: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0E0E0E'
  },
  form: {
    backgroundColor: "#FFF",
    width: '100%',
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1, // Adicionar a borda
    borderColor: "#ECECEC",
    paddingLeft: 8, // Dando um respiro para texto interno
    paddingRight: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '90%',
    maxWidth: '90%',
    height: 54,
  }
})