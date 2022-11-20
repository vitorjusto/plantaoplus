import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import img from '../../assets/TituloBemVindo.png'
import GetStyles, {BackgroundColor, SecundaryColor} from '../../model/styles/getStyles';
import HorasTrabalhadasCadastro from './TelaInicialHorasTrabalhadas'
import Icone from '../../model/icon/getIcons'
import Swal from 'sweetalert2';
import firebase from '../../services/connectionFirebase';

function PegarIcone({imagem})
{
  return Icone(imagem, false)
}

export default function App({navigation, setLogin}) {

  function irParaTelaDePlantao()
  {
    navigation.navigate("Plantão")
  }

  function irParaTelaDeConfig()
  {
    navigation.navigate("Configurações")
  }

  function fazerLogout()
  {
  Swal.fire({
    icon:'question',
      title: 'você deseja fazer o logout?',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
    }).then((result) => {
      
      if (result.isConfirmed) {
        firebase.auth().signOut
        setLogin(false)
      }
    })
  }

  return (
    <ImageBackground 
      source={require('../../assets/logonovo.png')}
      style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'flex-start'}}  
    >
      <View style={{padding: '20px'}}>
        <View style={styles.styledContainer}>
          <View style={{height: '100%'}}>
            <Text style={styles.title}><b>Bem Vindo!</b></Text>
            <HorasTrabalhadasCadastro emailVisivel={false}/>

          </View>
        </View>
      </View>
      <View style={{position: 'fixed', bottom: 0, width: '100%'}}>
      <View style={{backgroundColor: SecundaryColor, height: '50px'}}>
        <View style={styles.containerLinhaSemPadding}>
          <View style={{backgroundColor: BackgroundColor, width: '33%', height: '50px'}}>
              <TouchableOpacity style={{display: 'flex', alignItems: 'center'}} onPress={irParaTelaDePlantao}>
                <PegarIcone imagem={"enfermeiro"}/>
                Plantão
              </TouchableOpacity>
          </View>
          <View style={{backgroundColor: BackgroundColor, width: '33%', height: '50px'}}>
            <TouchableOpacity style={{display: 'flex', alignItems: 'center'}} onPress={irParaTelaDeConfig}>
              <PegarIcone imagem={"config"}/>
              Configurações
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: BackgroundColor, width: '33%', height: '50px'}}>
          <TouchableOpacity style={{display: 'flex', alignItems: 'center'}} onPress={fazerLogout}>
              <PegarIcone imagem={"exit"}/>
                Logout
          </TouchableOpacity>
          </View>
        </View>
      </View>
      </View>
    </ImageBackground>
  );
}

const styles = GetStyles();