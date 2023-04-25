import { useLayoutEffect, useState } from 'react'
import { 
  View, Text, StyleSheet, Pressable, 
  ScrollView, Image, Modal,Share 
} from 'react-native'
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'
import { Entypo, AntDesign, Feather } from '@expo/vector-icons'

// Componentes
import Ingredients from '../../components/ingredients'
import Instructions from '../../components/instructions'
import { VideoView } from '../../components/Video'

// utils
import { postFavorites, removeFavorites, isFavorites } from '../../utils/storage'

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

export default function Detail() {
  const route = useRoute< RouteProp<ParamList, 'Detail'>>()
  const navigation = useNavigation()
  const [showVideo, setShowVideo] = useState(false)
  const [favorite, setFavorite] = useState(false)

  async function handleFavoriteReceipe(receipe: Food){
    if(favorite){
      await removeFavorites(receipe.id)
      setFavorite(false)
    }else{
      await postFavorites('@appreceitas', receipe)
      setFavorite(true)
    }
  }

  useLayoutEffect(() => {    
    async function getStatusFavorites() {
      const receipeFavorite = await isFavorites(route.params?.data)
      setFavorite(receipeFavorite)
    }

    getStatusFavorites()

    navigation.setOptions({
      title: route.params?.data ? route.params?.data.name : 'Detalhes da receita', 
      headerRight: () => (
        // Button parecido com TouchableOpacity
        <Pressable onPress={ () => handleFavoriteReceipe(route.params?.data)}>
          {
            favorite ? (<Entypo 
              name="heart"
              size={28}
              color="#FF4141"
            />) : (<Entypo 
              name="heart-outlined"
              size={28}
              color="#FF4141"
            />)
          }
        </Pressable>
      ) 
    })
  }, [navigation, route.params?.data, favorite])

  async function handleShareReceipe(){
    try{
      await Share.share({
        url: route.params?.data.video ,
        message: `Receita: ${route.params?.data.name}\nIngredientes: ${route.params?.data.total_ingredients}` 
      })
    }catch(error){
      console.log(error)
    }
  }

  return(
    // ScrollView é utilizado quando a tela tem muitos conteúdos e é necessário fazer scroll
    // showsVerticalScrollIndicator = barra de rolagem
    // Conteúdo pode ficar em baixo do menu bottom, então utilizamos o contentContainerStyles para da padding para baixo
    <ScrollView 
      style={styles.container}  showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 14}}
    >
      <Pressable onPress={() => setShowVideo(true)}>
        <View style={styles.playIcon}>
          <AntDesign name='playcircleo' size={67} color="#FAFAFA"/>
        </View>
        <Image 
          source={{uri: route.params?.data.cover}}
          style={styles.cover}
        />
      </Pressable>

      <View style={styles.headerDetails}>
        <View>
          <Text style={styles.title}>{route.params?.data.name}</Text>
          <Text style={styles.ingredientsText}>ingredientes ({route.params?.data.total_ingredients})</Text>
        </View>

        <Pressable onPress={handleShareReceipe}>
          <Feather name='share-2' size={24} color="#121212"/>
        </Pressable>
      </View>

      {
        route.params?.data.ingredients.map((item) => {
          return <Ingredients data={item} key={item.id}/>
        })
      }

      <View style={styles.instructionsArea}>
        <Text style={styles.instructionsText}>Modo de preparo</Text>
        <Feather 
          name='arrow-down'
          size={24}
          color= '#FFF' 
        />
      </View>
      
      {
        route.params?.data.instructions.map((item, index) => {
          return <Instructions data={item} index={index} key={item.id}/>
        })
      }

      <Modal visible={showVideo} animationType='slide'>
        <VideoView 
          handleClose={() => setShowVideo(false)}
          videoUrl = {route.params?.data.video} 
        />
      </Modal>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F9FF',
    paddingTop:14, // Cima
    paddingEnd:14, // Direita
    paddingStart: 14 // Esquerda
  },
  cover: {
    width: '100%',
    height: 200,
    borderRadius: 14,
  },
  playIcon: {
    position: 'absolute',
    zIndex: 9,
    // Primeiramente, zeramos tudo
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Depois centralizamos o conteúdo
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14
  },
  title: {
    fontSize: 18,
    marginTop: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4
  },
  ingredientsText: {
    marginBottom: 14,
  },
  instructionsArea: {
    backgroundColor: '#4CBE6C',
    flexDirection: 'row',
    padding: 8,
    borderRadius: 4,
    marginBottom: 14,
  },
  instructionsText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
    marginRight: 8,
  }
})