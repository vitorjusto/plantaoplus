import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 

import HorasTrabalhadasCadastro from './HorasTrabalhadasCadastro'
import HorasTrabalhadasListagem from './HorasTrabalhadasListagem';
import HorasTrabalhadasAtualizar from './HorasTrabalhadasAtualizar';
import {DarkerColor}  from '../../model/styles/getStyles'
import HorasTrabalhadasPonto from './HorasTrabalhadasPonto';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Update()
{
  return(
  <Stack.Navigator>
  <Stack.Screen 
        name="Listagem" 
        component={handleListar}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
       name="Atualizar" 
       component={HorasTrabalhadasAtualizar} 
       options={{ headerShown: false}}
      />
    </Stack.Navigator>
  )
}

function handleListar(e)
{
  return(<HorasTrabalhadasListagem navigation={e.navigation} email={Email} adm={Adm}/>)
}

function handlePonto()
{
  return(<HorasTrabalhadasPonto email={Email}/>)
}

let Email
let Adm

export default function App({email, adm}) {
  
  Email = email
  Adm = adm
  function handleCadastro()
  {
    return(
      <HorasTrabalhadasCadastro email={email}></HorasTrabalhadasCadastro>
    )
  }

  return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Listagem") {
            iconName = focused ? 'ios-list-circle' : 'ios-list-circle-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          }else if(route.name === "Cadastro")
          {
              iconName = focused ? 'clock-plus' : 'clock-plus-outline';
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          }else if(route.name === "Ponto")
          {
              iconName = focused ? 'ios-checkmark-circle' : 'ios-checkmark-circle-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: DarkerColor
      })  
      }
         style={styles.container}>
        <Tab.Screen name="Cadastro" component={handleCadastro} />
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