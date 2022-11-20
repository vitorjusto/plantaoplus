import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign, Ionicons } from '@expo/vector-icons'; 

import MedicamentoCadastro from './MedicamentoCadastro';
import MedicamentoListagem from './MedicamentoListagem';
import MedicamentoAtualizar from './MedicamentoAtualizar';
import {DarkerColor}  from '../../model/styles/getStyles'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Update()
{
  return(
  <Stack.Navigator>
  <Stack.Screen 
        name="Listagem" 
        component={MedicamentoListagem} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
       name="Atualizar" 
       component={MedicamentoAtualizar} 
       options={{ headerShown: false}}
      />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Listagem") {
            iconName = focused ? 'ios-list-circle' : 'ios-list-circle-outline';
          }else if(route.name === "Cadastro")
          {
              iconName = focused ? 'people' : 'people-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: DarkerColor
      })  
      }
         style={styles.container}>
        <Tab.Screen name="Cadastro" component={MedicamentoCadastro} />
        <Tab.Screen name="Listagem" component={Update} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});