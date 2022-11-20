import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; 
import PacienteListagem from '../paciente/PacienteListagem';
import exameListagem from './exameListagem'
import exameCadastro from './exameCadastro'
import exameAtualizar from './exameAtualizar'
import {DarkerColor}  from  '../../model/styles/getStyles'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function CadastrarExame()
{
  return(
  <Stack.Navigator>
  <Stack.Screen 
        name="Listagem" 
        component={PacienteListagem} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
       name="Atualizar" 
       component={exameCadastro} 
       options={{ headerShown: false}}
      />
    </Stack.Navigator>
  )
}

function AtualizarExame()
{
  return(
  <Stack.Navigator>
  <Stack.Screen 
        name="Listagem" 
        component={exameListagem} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
       name="AtualizarExame" 
       component={exameAtualizar} 
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
           if(route.name === "Criar Exame")
          {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
          }else if(route.name === "Listar")
              iconName = focused ? 'ios-list-circle' : 'ios-list-circle-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: DarkerColor
      })  
      }
         style={styles.container}>
        <Tab.Screen name="Criar Exame" component={CadastrarExame} />
        <Tab.Screen name="Listar" component={AtualizarExame} />
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