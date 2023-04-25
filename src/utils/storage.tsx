import AsyncStorage from "@react-native-async-storage/async-storage";

import { Food } from "../pages/Home";

// Buscar os favoritos

// chave do objeto que contém o array
export async function getFavorites(key: string) {
  const favorites = await AsyncStorage.getItem(key)

  return favorites ? JSON.parse(favorites) : []
}

// Salvar um novo favorito

// chave do objeto que contém o array
// novo item que será adicionado
export async function postFavorites(key : string, newItem: Food) {
  let myFavorites = await getFavorites(key)
  
  // verificar se já existe dentro do array
  let hasItem = myFavorites.some((item: Food) => item.id === newItem.id)

  if(hasItem){
    console.log('Esse item já existe no array!')
    return;
  }

  myFavorites.push(newItem)

  // AsyncStorage sempre salvar uma string
  await AsyncStorage.setItem('@appreceitas', JSON.stringify(myFavorites))
  console.log('Salvo com sucesso!')
}

// Remover um favorito da lista

// chave do objeto que contém o array
export async function removeFavorites(id: string) {
  let receipes = await getFavorites('@appreceitas')

  let myFavorites = receipes.filter((item: Food) => {
    return (item.id !== id)
  })

  await AsyncStorage.setItem('@appreceitas', JSON.stringify(myFavorites))
  console.log('Item deletado com sucesso!')

  return myFavorites;
}

// Verificar se item já é favorito

export async function isFavorites(receipe: Food) {
  let myReceipes = await getFavorites('@appreceitas')

  const favorite = myReceipes.find((item: Food) => item.id === receipe.id)

  if(favorite){
    return true;
  }

  return false;
}