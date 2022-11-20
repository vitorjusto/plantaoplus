import React, { useState, useEffect} from 'react';
import { SafeAreaView, View, ScrollView, ActivityIndicator, TouchableOpacity, Text} from 'react-native';
import {Input, TextArea} from '../../controls/TextInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import GetStyles from '../../model/styles/getStyles'
import Swal from 'sweetalert2'
import {ObterUsuario, DeletarUsuario, AtualizarUsuario } from '../../controller/Adm';
import BotaoVoltar from '../../controls/buttons'

export default function App(props) {
  const Login = props.route.params.userkey
  const [Nome, setNome] = useState('')
  const [Email, setEmail] = useState('')

  const [isLoading, setLoad] = useState(true);

  let usuario
  async function obterCadastro()
  {
    let result = await ObterUsuario(Login)
    if(!result.sucesso)
    {
      Swal.fire({
        icon: 'error',
        text: result.mensagem
      })
      Voltar()
    }
    usuario = result.data
    setNome(usuario.Nome);
    setEmail(usuario.Login);

    setLoad(false);

  }
  
  useEffect(() => {
    obterCadastro()
  }, []);

  function Voltar()
  {
    props.navigation.goBack()
  }

  async function Deletar()
  {
      await Swal.fire({
          text: 'Deseja deletar este cadastro?',
          icon: 'warning',
          showDenyButton: true,
          confirmButtonText: 'Sim',
          denyButtonText: 'Não'
      }).then((result) => {
          
          if (result.isConfirmed) {
            DeletarCadastro()
          } else if (result.isDenied) {
            Swal.fire('', 'Não será deletado', 'info')
          }
      })
    
  }
  
  async function DeletarCadastro() {
    setLoad(true)
      let result = await DeletarUsuario(Login)
      if(result.sucesso)
      {
      Swal.fire({
        icon: 'success',
        text: 'usuario deletado com sucesso!'
      })
      Voltar()
      }else
      {
        Swal.fire({
          icon: 'error',
          text: 'Não foi possivel deletar o usuario'
        })
        setLoad(false)
      }
  }

  async function AtualizarCadastro() {
    setLoad(true)
    let usuario = {
      Nome,
      Login,
      ehAdm: true
    }

    let result = await AtualizarUsuario(usuario);

    if(result.sucesso)
    {
      setLoad(false)
      Swal.fire({
        icon: 'success',
        text: 'usuario atualizado com sucesso'
      })
      Voltar()
    }else
    {
    setLoad(false)
    Swal.fire({
      icon: 'error',
      text: result.mensagem
    })
    }
  }

  if(isLoading){
    return(
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="red"/>
      </View>
    )
  }   
  return (
  <SafeAreaView style={styles.container}>
      
    <BotaoVoltar Voltar={Voltar}/>
    <View style={styles.styledContainer}>

    <Input type="text" placeholder="Nome" value={Nome} onInput={(e) => setNome(e.target.value)} LabelText={"Nome"}/>
    <Input type="email" disabled={true} placeholder="email" value={Email} onInput={(e) => setEmail(e.target.value)} LabelText={"Email do usuario"}/>
 
    </View>
    <TouchableOpacity style={styles.botaoVermelho} onPress={Deletar} type="submit">
      <Text style={styles.textoBotaoVerde}> Deletar </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.botaoVerde} onPress={AtualizarCadastro} type="submit">
      <Text style={styles.textoBotaoVerde}>  Atualizar </Text>
    </TouchableOpacity>
  </SafeAreaView>
  );
}

const styles = GetStyles()