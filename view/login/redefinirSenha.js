import {Input} from '../../controls/TextInput';
import { View, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import GetStyles from '../../model/styles/getStyles'
import firebase from '../../services/connectionFirebase';
import Swal from 'sweetalert2';

export function RedefinirSenha({email, setLogin})
{
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirm] = useState('');
    function handleAlterarSenha(){

      if(password !== confirmPassword)
      {
        Swal.fire('', 'As senhas não são iguais!', 'error')
        return;
      }

        Swal.fire({
          icon:'question',
            title: 'Você realmente deseja trocar a senha?',
            showDenyButton: true,
            confirmButtonText: 'Sim',
            denyButtonText: `Não`,
          }).then((result) => {
            
            if (result.isConfirmed) {
              AlterarSenha()
            }
          })
    }

    function AlterarSenha()
    {

      let user = firebase.auth().currentUser
      user.updatePassword(password).then((task) => {
        Swal.fire('', "senha alterado com sucesso", "success")
        
      });
    }

    function logout()
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

    return(
    <View style={styles.container}>
      <View style={styles.styledContainerMargin}> 
    <Input type="password" placeholder="Sua senha" value={password} onInput={(e) => setPassword(e.target.value)} LabelText={`Redefinir senha do email: ${email}`}/>
    <Input type="password" placeholder="Sua senha" value={confirmPassword} onInput={(e) => setConfirm(e.target.value)} LabelText={`Confirmar senha`}/>
      </View>
    <TouchableOpacity style={styles.botao} variant="primary" onPress={handleAlterarSenha} type="submit">
      <Text style={styles.textoBotaoVerde}>  Alterar </Text>
    </TouchableOpacity>
      
    <TouchableOpacity style={styles.botao} variant="primary" onPress={logout} type="submit">
      <Text style={styles.textoBotaoVerde}>  Logout </Text>
    </TouchableOpacity>

   </View>
    );
}

const styles = GetStyles()