import { View,TextInput, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native'
import { useState } from 'react'

// SafeAreaView é uma área segura para iOS. Isso vai garantir que noss app vai está embaixo do status bar
// icons 
import { Ionicons } from '@expo/vector-icons'

// components
import Logo from '../../components/Logo'

export default function Home() {
  const [inputValue, setInputValue] = useState('')

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