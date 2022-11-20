import { StyleSheet, Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; 

import EnfermeiraCadastro from './EnfermeiraCadastro';
import EnfermeiraListagem from './EnfermeiraListagem';
import EnfermeiraAtualizar from './EnfermeiraAtualizar';

import { SecundaryColor, DarkerColor } from '../../model/styles/getStyles';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Update()
{
  return(
  <Stack.Navigator>
  <Stack.Screen 
        name="Listagem" 
        component={EnfermeiraListagem} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
       name="Atualizar" 
       component={EnfermeiraAtualizar} 
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
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: DarkerColor,
      })  
      }
         style={styles.container}>
        <Tab.Screen name="Cadastro" component={EnfermeiraCadastro} />
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