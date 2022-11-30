import {Input} from '../../controls/TextInput';
import { View, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import GetStyles from '../../model/styles/getStyles'
import firebase from '../../services/connectionFirebase';
import Swal from 'sweetalert2';
import {allLogo as Logo} from '../../controls/LogoIcon' 
import {AdmBase} from '../Adm/AdmCadastrar'
import Voltar from '../../controls/buttons'

export default function Login({setLogin, setAdm, email, setEmail})
{
    const [password, setPassword] = useState('');
    const [createAdm, setCreateAdm] = useState(false);

    function handleLogin(){
        const user = firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (user) => {
          await getUser()
          setLogin(true)
        })
        .catch((err)=>{
          console.log(err);
          
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Não foi possível encontrar esse usuário, certifique se o email e a senha está escrito corretamente',
            color: 'black',
            confirmButtonColor: 'rgb(106, 174, 235)'
          })
          return;
        })
    }

    async function getUser()
    {
      const docRef = firebase.firestore().collection('usuario').where('Login', '==', email.trim())
      await docRef.get().then((res) => {
          res.forEach((doc) => {
                let user = doc.data();
                setAdm(user.ehAdm)
                
            })
        });
    }

    if(createAdm)
      return(
        <View style={styles.containerMiddle}>
          <View style={styles.containerCenter}>
            <View style={{width: '100%', maxWidth: '400px'}}>

              <Voltar Voltar={() => setCreateAdm(false)}/>
            </View>
          <Text style={styles.titleMenor}><b>Cadastrar Adiministrador</b></Text>
          <AdmBase></AdmBase>
          </View>
        </View>
      )

    return(
    <View style={styles.containerMiddle}>
    
      <Logo></Logo>

    <View style={styles.containerCenter}>
      <Text style={styles.title}><b>Login!</b></Text>

    <View style={styles.styledContainer}>

    
    <Input type="text" placeholder="Digite o email do usuário" value={email} onInput={(e) => setEmail(e.target.value)} LabelText={"Usuário"}/>

    <Input type="password" placeholder="Digite a sua senha" value={password} onInput={(e) => setPassword(e.target.value)} LabelText={"Senha"}/>
    </View>
    <View style={styles.containerCenter}>

    <TouchableOpacity  onPress={() => setCreateAdm(true)}>
      <Text style={styles.linkText}>Clique aqui para cadastrar um usuário</Text>
    </TouchableOpacity>
    </View>
    </View>
    <View style={styles.containerCenter}>

    <TouchableOpacity style={styles.botaoVerde} onPress={handleLogin}>
      <Text style={styles.textoBotaoVerde}>Entrar</Text>
    </TouchableOpacity>
    </View>
      
   </View>
    );
}

const styles = GetStyles()