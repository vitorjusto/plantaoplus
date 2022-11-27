import React, { useState} from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity, Text} from 'react-native';
import 'bootstrap/dist/css/bootstrap.min.css';
import GetStyles from '../../model/styles/getStyles'
import Swal from 'sweetalert2'
import { CadastrarAdm } from '../../controller/Adm';
import {Input} from '../../controls/TextInput';

export function AdmBase() {

  const [Nome, setNome] = useState('')
  const [Email, setEmail] = useState('')
  const [Senha, setSenha] = useState('')

  async function Cadastrar()
  {
    let Adm = {
    Nome,
        Email,
        Senha
      }

    let result= await CadastrarAdm(Adm)

    if (result.sucesso)
    {
    Swal.fire({
      icon: 'success',
      text: 'Administrador cadastrado com sucesso'
    })
    limparTela()
    }else
    {
      Swal.fire({
        icon: 'error',
        text: result.mensagem
      });
    }
  }

  function limparTela()
  {
    setEmail('')
    setNome('')
    setSenha('')
  }

  return (
  <View style={styles.containerMax}>
    <View style={styles.styledContainer}> 
    <Input type="text" placeholder="Nome" value={Nome} onInput={(e) => setNome(e.target.value)} LabelText={"Nome"}/>
    <Input type="email" placeholder="email" value={Email} onInput={(e) => setEmail(e.target.value)} LabelText={"Email do usuario"}/>
 
    <Input type="password" placeholder="senha" value={Senha} onInput={(e) => setSenha(e.target.value)} LabelText={"Senha"}/>
 
    </View>
    <TouchableOpacity style={styles.botaoVerde} onPress={Cadastrar} variant="primary" type="submit">
    <Text style={styles.textoBotaoVerde}>  Cadastrar </Text>
    </TouchableOpacity>
  </View>
  );
}

export default  function App()
{
  return(
    <SafeAreaView style={styles.container}>
      <AdmBase></AdmBase>
    </SafeAreaView>
  )
}

const styles = GetStyles()