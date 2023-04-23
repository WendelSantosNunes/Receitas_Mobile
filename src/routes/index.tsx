import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

// Icons
import { Ionicons } from '@expo/vector-icons'

// pages
import Home from '../pages/Home';
import Favorites from '../pages/Favorites';

export default function Routes(){
  return(
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Estamos apagando o header padrão
        tabBarHideOnKeyboard: true, // Desaparecer a tab bottom quando aparece o teclado
        tabBarShowLabel: false, // Tirar o nome das páginas do tab bottom
        tabBarActiveTintColor: '#121212', // A cor quando tiver ativo o icone da página
        // Cores do tab bottom
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0
        }
      }}  
    >
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{
          tabBarIcon: ({color, size, focused}) => {
            if(focused) {
              return <Ionicons name="home" color="#000" size={size}/>
            }

            return <Ionicons name="home-outline" color={color} size={size}/>
          }
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={Favorites}
        options={{
          tabBarIcon: ({color, size, focused}) => {
            if(focused) {
              return <Ionicons name="heart" color="#FF4141" size={size}/>
            }

            return <Ionicons name="heart-outline" color={color} size={size}/>
          }
        }} 
      />
    </Tab.Navigator>
  )
}