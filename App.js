import { StyleSheet } from 'react-native';
import {useState} from 'react';
import TelaInicial from './view/telaInicial/telaInicial';
import EnfermeiraBase from './view/enfermeira/EnfermeiraBase';
import PacienteBase from './view/paciente/PacienteBase';
import MedicamentoBase from './view/medicamento/MediamentoBase';
import HorasTrabalhadasBase from './view/HorasTrabalhadas/HorasTrabalhadasBase'
import exameBase from './view/exame/exameBase'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons'; 
import Login from './view/login/login';
import {RedefinirSenha} from './view/login/redefinirSenha'
import LogoIcon from './controls/LogoIcon'
import AdmBase from './view/Adm/AdmBase'
import { BackgroundColor, SecundaryColor, DarkerColor } from './model/styles/getStyles';
import icon_enfermeiro from './assets/icons/icon_enfermeiro_paciente.png';
import icon_enfermeiro_blue from './assets/icons/icon_enfermeiro_paciente_blue.png';

import getIcons from './model/icon/getIcons'

const Drawer = createDrawerNavigator();

function icone()
{
  return(<img style={{width: 424, height: 176}}  src={icon_enfermeiro} alt=""/>)
}


export default function App() {
  
  const [isLogged, setLogin] = useState(false);
  const [isAdm, setAdm] = useState(true);
  const [email, setEmail] = useState('');

  function handleRedefinirSenha()
  {
    return(
      <RedefinirSenha email={email} setLogin={setLogin}></RedefinirSenha>
    )
  }

  function handleHorasTrabalhadas()
  {
    return(
      <HorasTrabalhadasBase email={email} adm={isAdm}></HorasTrabalhadasBase>
    )
  }

  function handleTelaInicial({navigation})
  {
    return(<TelaInicial email={email} navigation={navigation} setLogin={setLogin}/>)
  }

  if(isLogged)
  {
    return (
      <NavigationContainer style={styles.container}>
      <Drawer.Navigator

      screenOptions={{
        drawerStyle:{
        backgroundColor:BackgroundColor,
        width:240,
    },
      drawerActiveBackgroundColor: DarkerColor,
      headerStyle:{backgroundColor: "white"},
      headerTitleStyle:{color: "black"},
      headerRight: config => <LogoIcon/>
    }}
      useLegacyImplementation initialRouteName="Tela Inicial">
        <Drawer.Screen options={{drawerIcon: (e) => getIcons("home", e.focused)}} name="Tela Inicial" component={handleTelaInicial} />
        <Drawer.Screen options={{drawerItemStyle: { display: isAdm? 'flex' :'none' }, drawerIcon: (e) => getIcons("enfermeiro", e.focused)}} name="Enfermeiras" component={EnfermeiraBase} />
        <Drawer.Screen options={{drawerItemStyle: { display: isAdm? 'flex' :'none' }, drawerIcon: (e) => getIcons("enfermeiro", e.focused)}} name="Administrador" component={AdmBase} />
        <Drawer.Screen options={{ drawerIcon: (e) => getIcons("enfermeiro", e.focused)}} name="Plantão" component={PacienteBase} />
        <Drawer.Screen options={{drawerItemStyle: { display: isAdm? 'flex' :'none' }, drawerIcon: (e) => getIcons("medicamento", e.focused)}} name="Medicamentos" component={MedicamentoBase} />
        <Drawer.Screen options={{ drawerIcon: (e) => getIcons("exame", e.focused)}} name="Exames" component={exameBase} />
        <Drawer.Screen options={{drawerIcon: (e) => getIcons("horasTrabalhadas", e.focused)}} name="Horas Trabalhadas" component={handleHorasTrabalhadas} />
        <Drawer.Screen options={{ drawerIcon: (e) => getIcons("config", e.focused)}} name="Configurações" component={handleRedefinirSenha} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
  }
 return (
  <Login setLogin={setLogin} email={email} setEmail={setEmail} setAdm={setAdm}></Login>
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
