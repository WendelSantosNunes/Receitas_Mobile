import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../pages/Home'
import Detail from '../pages/Detail'
import Search from '../pages/Search'

// Criando a navegação do header
const Stack = createNativeStackNavigator()

export default function StackRoutes() {
  return (
    // Isso é igual o routes
    <Stack.Navigator>
      {/* Isso é igual a route */}
      <Stack.Screen 
        name="HomeStack" 
        component={Home}
        options={{
          headerShown: false,
        }}
      /> 
      <Stack.Screen 
        name="Detail" 
        component={Detail}
        options={{
          title: 'Detalhes da receita',
        }}
      /> 
      <Stack.Screen 
        name="Search" 
        component={Search}
        options={{
          title: 'Veja o que encontramos',
        }}
      /> 
    </Stack.Navigator>
  )
}